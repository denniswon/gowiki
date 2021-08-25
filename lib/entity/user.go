package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

//User data
type User struct {
	ID        ID
	Email     string
	Password  string
	FirstName string
	LastName  string
	CreatedAt time.Time
	UpdatedAt time.Time
	Posts     []*ID
}

//NewUser create a new user
func NewUser(email, password, firstName, lastName string) (*User, error) {
	u := &User{
		ID:        NewID(),
		Email:     email,
		FirstName: firstName,
		LastName:  lastName,
		CreatedAt: time.Now(),
	}
	pwd, err := generatePassword(password)
	if err != nil {
		return nil, err
	}
	u.Password = pwd
	err = u.Validate()
	if err != nil {
		return nil, ErrInvalidEntity
	}
	return u, nil
}

//AddPost add a post
func (u *User) AddPost(id ID) error {
	_, err := u.GetPost(id)
	if err == nil {
		return ErrDuplicatePostID
	}
	u.Posts = append(u.Posts, &id)
	return nil
}

//RemovePost remove a post
func (u *User) RemovePost(id ID) error {
	for i, j := range u.Posts {
		if *j == id {
			u.Posts = append(u.Posts[:i], u.Posts[i+1:]...)
			return nil
		}
	}
	return ErrNotFound
}

//GetPost get a post
func (u *User) GetPost(id ID) (ID, error) {
	for _, v := range u.Posts {
		if *v == id {
			return id, nil
		}
	}
	return id, ErrNotFound
}

//Validate validate data
func (u *User) Validate() error {
	if u.Email == "" || u.FirstName == "" || u.LastName == "" || u.Password == "" {
		return ErrInvalidEntity
	}

	return nil
}

//ValidatePassword validate user password
func (u *User) ValidatePassword(p string) error {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(p))
	if err != nil {
		return err
	}
	return nil
}

func generatePassword(raw string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(raw), 10)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}
