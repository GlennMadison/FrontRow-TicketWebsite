package routes

import (
	controller "go-backend/controllers"
	"github.com/gin-gonic/gin"
)

func EventRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/event", controller.CreateEvent)
	incomingRoutes.GET("/events", controller.GetEvents)
	incomingRoutes.DELETE("/event/:id", controller.DeleteEvent)
	incomingRoutes.GET("/event/:id", controller.GetEventById)
}