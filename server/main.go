package main

import (
	"go-backend/routes"
	"os"
	middleware "go-backend/middleware"
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
	// Enable CORS with default options
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"}, // Allow requests from any origin
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "token"}, // Allow 'token' header
	}))

	//router.Use(cors.Default()) 			// Enable CORS for all origins
	routes.UserRoutes(router)
	router.Use(middleware.Authentication()) // Use the Authentication middleware


	router.GET("/protected", func(c *gin.Context) {
        email, _ := c.Get("email")
        username, _ := c.Get("username")
        uid, _ := c.Get("uid")

        c.JSON(200, gin.H{
            "email":    email,
            "username": username,
            "uid":      uid,
        })
    })
	routes.EventRoutes(router)
	routes.BookingRoutes(router)
	

	router.Run(":" + port)
}

