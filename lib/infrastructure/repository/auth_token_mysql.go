package repository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/denniswon/gowiki/entity"
)

//AuthTokenMySQL mysql repo
type AuthTokenMySQL struct {
	db *sql.DB
}

//NewAuthTokenMySQL create new repository
func NewAuthTokenMySQL(db *sql.DB) *AuthTokenMySQL {
	return &AuthTokenMySQL{
		db: db,
	}
}

//Create an auth token
func (r *AuthTokenMySQL) Create(e *entity.AuthToken) (entity.ID, error) {
	stmt, err := r.db.Prepare(`
		insert into auth_token (id, user, token, created_at) values(?,?,?,?)`)
	if err != nil {
		return e.ID, err
	}
	_, err = stmt.Exec(
		e.ID,
		*e.User,
		e.Token,
		time.Now().Format("2006-01-02"),
	)
	if err != nil {
		return e.ID, err
	}
	err = stmt.Close()
	if err != nil {
		return e.ID, err
	}
	return e.ID, nil
}

//Get an user
func (r *AuthTokenMySQL) Get(id entity.ID) (*entity.AuthToken, error) {
	return getAuthToken(id, r.db)
}

func getAuthToken(id entity.ID, db *sql.DB) (*entity.AuthToken, error) {
	stmt, err := db.Prepare(`select id, user, token, created_at from user where id = ?`)
	if err != nil {
		return nil, err
	}
	var t entity.AuthToken
	rows, err := stmt.Query(id)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		err = rows.Scan(&t.ID, &t.User, &t.Token, &t.CreatedAt)
	}
	if err != nil {
		return nil, err
	}
	return &t, nil
}

//Update an user
func (r *AuthTokenMySQL) Update(e *entity.AuthToken) error {
	e.UpdatedAt = time.Now()
	_, err := r.db.Exec("update auth_token set updated_at = ? where id = ?", e.UpdatedAt.Format("2006-01-02"), e.ID)
	if err != nil {
		return err
	}
	_, err = r.db.Exec("delete from auth_token_user where user_id = ?", e.ID)
	if err != nil {
		return err
	}
	for _, p := range e.t {
		_, err := r.db.Exec("insert into post_user values(?,?,?)", e.ID, p, time.Now().Format("2006-01-02"))
		if err != nil {
			return err
		}
	}
	return nil
}

//Search users
func (r *AuthTokenMySQL) Search(query string) ([]*entity.User, error) {
	stmt, err := r.db.Prepare(`select id from user where name like ?`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	var ids []entity.ID
	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var i entity.ID
		err = rows.Scan(&i)
		if err != nil {
			return nil, err
		}
		ids = append(ids, i)
	}
	if len(ids) == 0 {
		return nil, fmt.Errorf("not found")
	}
	var users []*entity.User
	for _, id := range ids {
		u, err := getUser(id, r.db)
		if err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

//List users
func (r *AuthTokenMySQL) List() ([]*entity.User, error) {
	stmt, err := r.db.Prepare(`select id from user`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	var ids []entity.ID
	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var i entity.ID
		err = rows.Scan(&i)
		if err != nil {
			return nil, err
		}
		ids = append(ids, i)
	}
	if len(ids) == 0 {
		return nil, fmt.Errorf("not found")
	}
	var users []*entity.User
	for _, id := range ids {
		u, err := getUser(id, r.db)
		if err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

//Delete an user
func (r *AuthTokenMySQL) Delete(id entity.ID) error {
	_, err := r.db.Exec("delete from user where id = ?", id)
	if err != nil {
		return err
	}
	return nil
}
