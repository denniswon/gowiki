package presenter

import (
	"github.com/denniswon/gowiki/entity"
)

//User data
type User struct {
	ID        entity.ID `json:"id"`
	Email     string    `json:"email"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
}
