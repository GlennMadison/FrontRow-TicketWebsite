package main

import (
	"go-backend/routes"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router := gin.New()				// Create a gin router with default middleware
	router.Use(gin.Logger())	// Log all requests to the console
	router.Use(cors.Default()) 			// Enable CORS for all origins

	router.POST("/register", routes.CreateAccount)
	router.GET("/account/:id", routes.GetAccount)
	//login
	router.POST("/login", routes.LoginAccount)
	//order
	router.POST("/order", routes.CreateOrder)
	//get all orders
	router.GET("/orders", routes.GetOrders)


	router.Run(":" + port)
}