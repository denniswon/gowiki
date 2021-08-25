package handler

import (
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
)

//MakeAuthTokenHandler make url handlers
func MakeAuthTokenHandler(r *mux.Router, n negroni.Negroni) {
	r.Handle("/v1/auth/token", n.With(
		negroni.Wrap(createToken()),
	)).Methods("GET", "OPTIONS").Name("createToken")
}
