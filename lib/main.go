package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

const PORT = 8080

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,

	// check the origin of our connection
	CheckOrigin: func(r *http.Request) bool { return true },
}

// define a reader which will listen for new messages sent to WebSocket endpoint
func reader(conn *websocket.Conn) {
	for {
		// read in a message
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		fmt.Println(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}

	}
}

func serveWs(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)
	// upgrade this connection to a WebSocket connection
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	// listen on the WebSocket connection
	reader(ws)
}

func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Simple Server")
	})
	http.HandleFunc("/ws", serveWs)
}

func main() {
	fmt.Println("Chat App v0.01")
	setupRoutes()
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", PORT), nil))
}
