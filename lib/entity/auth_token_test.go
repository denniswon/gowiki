package entity_test

import (
	"testing"

	"github.com/denniswon/gowiki/entity"
	"github.com/stretchr/testify/assert"
)

func TestNewAuthToken(t *testing.T) {
	b, err := entity.NewAuthToken("American Gods", "Neil Gaiman", 100, 1)
	assert.Nil(t, err)
	assert.Equal(t, b.Title, "American Gods")
	assert.NotNil(t, b.ID)
}

func TestBookValidate(t *testing.T) {
	type test struct {
		title    string
		author   string
		pages    int
		quantity int
		want     error
	}

	tests := []test{
		{
			title:    "American Gods",
			author:   "Neil Gaiman",
			pages:    100,
			quantity: 1,
			want:     nil,
		},
		{
			title:    "American Gods",
			author:   "Neil Gaiman",
			pages:    100,
			quantity: 0,
			want:     entity.ErrInvalidEntity,
		},
		{
			title:    "",
			author:   "Neil Gaiman",
			pages:    100,
			quantity: 1,
			want:     entity.ErrInvalidEntity,
		},
		{
			title:    "American Gods",
			author:   "",
			pages:    100,
			quantity: 1,
			want:     entity.ErrInvalidEntity,
		},
		{
			title:    "American Gods",
			author:   "Neil Gaiman",
			pages:    0,
			quantity: 1,
			want:     entity.ErrInvalidEntity,
		},
	}
	for _, tc := range tests {

		_, err := entity.NewBook(tc.title, tc.author, tc.pages, tc.quantity)
		assert.Equal(t, err, tc.want)
	}

}
