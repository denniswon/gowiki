package handler

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
)

type StaticHandler struct {
	staticPath string
	indexPath  string
}

func (h StaticHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := filepath.Join(h.staticPath, r.URL.Path)
	log.Println(path)
	indexFile := filepath.Join(h.staticPath, h.indexPath)
	_, err := os.Stat(path)
	if os.IsNotExist(err) {
		// r, _ := reactssr.NewServerSideRenderer(indexFile)
		// output, _ := r.Render()
		// w.Write([]byte(output))
		http.ServeFile(w, r, indexFile)
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func MakeStaticHandlers(r *mux.Router, staticPath string, indexPath string) {
	handler := StaticHandler{staticPath: staticPath, indexPath: indexPath}
	r.PathPrefix("/").Handler(handler)
}
