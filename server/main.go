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

	routes.UserRoutes(router)
	routes.EventRoutes(router)
	routes.BookingRoutes(router)
	

	router.Run(":" + port)
}

