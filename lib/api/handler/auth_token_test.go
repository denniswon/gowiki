package handler

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/codegangsta/negroni"
	"github.com/golang/mock/gomock"
	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

func Test_createToken(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()
	r := mux.NewRouter()
	n := negroni.New()
	MakeAuthTokenHandler(r, *n)
	path, err := r.GetRoute("createToken").GetPathTemplate()
	assert.Nil(t, err)
	assert.Equal(t, "/v1/auth/token", path)
	handler := createToken()
	r.Handle("/v1/auth/token", handler)
	t.Run("success", func(t *testing.T) {
		ts := httptest.NewServer(r)
		defer ts.Close()
		res, err := http.Get(fmt.Sprintf("%s/v1/auth/token", ts.URL))
		assert.Nil(t, err)
		assert.Equal(t, http.StatusOK, res.StatusCode)
	})
}
