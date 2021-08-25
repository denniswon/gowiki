package repository

import (
	"database/sql"
	"time"

	"github.com/denniswon/gowiki/entity"
)

//PostMySQL mysql repo
type PostMySQL struct {
	db *sql.DB
}

//NewPostMySQL create new repository
func NewPostMySQL(db *sql.DB) *PostMySQL {
	return &PostMySQL{
		db: db,
	}
}

//Create a post
func (r *PostMySQL) Create(e *entity.Post) (entity.ID, error) {
	stmt, err := r.db.Prepare(`
		insert into post (id, creator, text, attachment, created_at) 
		values(?,?,?,?,?)`)
	if err != nil {
		return e.ID, err
	}
	_, err = stmt.Exec(
		e.ID,
		e.Creator,
		e.Text,
		e.Attachment,
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

//Get a post
func (r *PostMySQL) Get(id entity.ID) (*entity.Post, error) {
	stmt, err := r.db.Prepare(
		`select id, creator, text, attachment, num_likes, created_at, updated_at, deleted_at from post where id = ?`)
	if err != nil {
		return nil, err
	}
	var p entity.Post
	rows, err := stmt.Query(id)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		err = rows.Scan(&p.ID, &p.Creator, &p.Text, &p.Attachment, &p.NumLikes, &p.CreatedAt, &p.UpdatedAt, &p.DeletedAt)
	}
	return &p, nil
}

//Update a post
func (r *PostMySQL) Update(e *entity.Post) error {
	e.UpdatedAt = time.Now()
	_, err := r.db.Exec("update post set creator = ?, text = ?, attachment = ?, num_likes = ?, updated_at = ? where id = ?",
		e.Creator, e.Text, e.Attachment, e.NumLikes, e.UpdatedAt.Format("2006-01-02"), e.ID)
	if err != nil {
		return err
	}
	return nil
}

//Search posts
func (r *PostMySQL) Search(query string) ([]*entity.Post, error) {
	stmt, err := r.db.Prepare(
		`select id, creator, text, attachment, num_likes, created_at, updated_at, deleted_at from post where text like ?`)
	if err != nil {
		return nil, err
	}
	var posts []*entity.Post
	rows, err := stmt.Query("%" + query + "%")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var p entity.Post
		err = rows.Scan(&p.ID, &p.Creator, &p.Text, &p.Attachment, &p.NumLikes, &p.CreatedAt, &p.UpdatedAt, &p.DeletedAt)
		if err != nil {
			return nil, err
		}
		posts = append(posts, &p)
	}

	return posts, nil
}

//List posts
func (r *PostMySQL) List() ([]*entity.Post, error) {
	stmt, err := r.db.Prepare(
		`select id, creator, text, attachment, num_likes, created_at, updated_at, deleted_at from post`)
	if err != nil {
		return nil, err
	}
	var posts []*entity.Post
	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var p entity.Post
		err = rows.Scan(&p.ID, &p.Creator, &p.Text, &p.Attachment, &p.NumLikes, &p.CreatedAt, &p.UpdatedAt, &p.DeletedAt)
		if err != nil {
			return nil, err
		}
		posts = append(posts, &p)
	}
	return posts, nil
}

//Delete a post
func (r *PostMySQL) Delete(id entity.ID) error {
	_, err := r.db.Exec("delete from post where id = ?", id)
	if err != nil {
		return err
	}
	return nil
}
