package entity

import (
	"time"
)

//Post data
type Post struct {
	ID         ID
	Creator    *ID
	Text       string
	Attachment *string
	NumLikes   int
	CreatedAt  time.Time
	UpdatedAt  time.Time
	DeletedAt  time.Time
}

//NewPost create a new post
func NewPost(creator *ID, text string, attachment *string) (*Post, error) {
	p := &Post{
		ID:         NewID(),
		Creator:    creator,
		Text:       text,
		Attachment: attachment,
		CreatedAt:  time.Now(),
	}
	err := p.Validate()
	if err != nil {
		return nil, ErrInvalidEntity
	}
	return p, nil
}

//Validate validate post
func (p *Post) Validate() error {
	if p.Creator == nil || p.Creator.String() == "" || p.Text == "" || p.NumLikes > 0 {
		return ErrInvalidEntity
	}
	return nil
}
