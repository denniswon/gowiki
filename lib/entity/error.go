package entity

import "errors"

//ErrNotFound not found
var ErrNotFound = errors.New("not found")

//ErrInvalidEntity invalid entity
var ErrInvalidEntity = errors.New("invalid entity")

//ErrCannotBeDeleted cannot be deleted
var ErrCannotBeDeleted = errors.New("cannot be deleted")

//ErrDuplicatePostID cannot be deleted
var ErrDuplicatePostID = errors.New("duplicate post id")
