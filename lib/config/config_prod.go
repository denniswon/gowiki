// +build prod

package config

const (
	DB_USER                = "gowiki"
	DB_PASSWORD            = "gowiki"
	DB_DATABASE            = "gowiki"
	DB_HOST                = "127.0.0.1"
	API_PORT               = 8080
	PROMETHEUS_PUSHGATEWAY = "http://localhost:9091/"
)
