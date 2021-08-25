package entity_test

import (
	"testing"

	"github.com/denniswon/gowiki/entity"
	"github.com/denniswon/gowiki/pkg/utils"
	"github.com/stretchr/testify/assert"
)

func TestNewPost(t *testing.T) {
	u, err := entity.NewUser("sjobs@apple.com", "new_password", "Steve", "Jobs")
	p, err := entity.NewPost(&u.ID, "I founded Apple", nil)
	assert.Nil(t, err)
	assert.Equal(t, p.Text, "I founded Apple")
	assert.Equal(t, p.Attachment, nil)
	assert.Equal(t, p.NumLikes, 0)
	assert.NotNil(t, p.ID)
}

func TestPostValidate(t *testing.T) {
	u, _ := entity.NewUser("sjobs@apple.com", "new_password", "Steve", "Jobs")

	type test struct {
		creator    *entity.ID
		text       string
		attachment *string
		want       error
	}

	tests := []test{
		{
			creator:    &u.ID,
			text:       "I founded Apple",
			attachment: nil,
			want:       nil,
		},
		{
			creator:    &u.ID,
			text:       "I founded Apple",
			attachment: utils.Create("https://some_asset_url"),
			want:       nil,
		},
		{
			creator:    &u.ID,
			text:       "I founded Apple",
			attachment: utils.Create("https://some_asset_url"),
			want:       entity.ErrInvalidEntity,
		},
		{
			creator:    &u.ID,
			text:       "",
			attachment: utils.Create("https://some_asset_url"),
			want:       entity.ErrInvalidEntity,
		},
		{
			creator:    nil,
			text:       "I founded Apple",
			attachment: utils.Create("https://some_asset_url"),
			want:       entity.ErrInvalidEntity,
		},
	}

	for _, tc := range tests {
		_, err := entity.NewPost(tc.creator, tc.text, tc.attachment)
		assert.Equal(t, err, tc.want)
	}
}
