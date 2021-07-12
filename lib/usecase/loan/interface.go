package loan

import (
	"github.com/denniswon/gowiki/entity"
)

//UseCase use case interface
type UseCase interface {
	Borrow(u *entity.User, b *entity.Book) error
	Return(b *entity.Book) error
}
