package routes

import(
	controller "go-backend/controllers"
	"github.com/gin-gonic/gin"
)

func UserRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/register", controller.CreateAccount)
	incomingRoutes.GET("/account/:id", controller.GetAccount)
	incomingRoutes.POST("account/login", controller.LoginAccount)
	incomingRoutes.PUT("/account/update/:id", controller.UpdateAccount)
	incomingRoutes.DELETE("/account/delete/:id", controller.DeleteAccount)
}