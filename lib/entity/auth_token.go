package entity

import (
	"bytes"
	"time"

	"github.com/dgrijalva/jwt-go"
)

//AuthToken data
type AuthToken struct {
	ID        ID
	User      *ID
	Token     []byte
	CreatedAt time.Time
	UpdatedAt time.Time
}

//NewAuthToken create a new auth token
func NewAuthToken(user ID) (*AuthToken, error) {
	token := createToken()
	t := &AuthToken{
		ID:        NewID(),
		User:      &user,
		Token:     token,
		CreatedAt: time.Now(),
	}

	err := t.Validate()
	if err != nil {
		return nil, ErrInvalidEntity
	}
	return t, nil
}

//Validate validate data
func (t *AuthToken) Validate() error {
	res := bytes.Compare(t.Token, []byte(""))
	if res == 0 {
		return ErrInvalidEntity
	}
	if t.User == nil {
		return ErrInvalidEntity
	}
	return nil
}

func createToken() []byte {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"iss": "auth-app",
		"sub": "medium",
		"aud": "any",
		"exp": time.Now().Add(time.Minute * 5).Unix(),
	})
	jwtToken, _ := token.SignedString([]byte("secret"))
	return []byte(jwtToken)
}
