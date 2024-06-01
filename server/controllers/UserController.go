package routes

import (
	"context"
	database "go-backend/database"
	helper "go-backend/helpers"
	"go-backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var validate = validator.New()
var accountCollection *mongo.Collection = database.OpenCollection(database.Client, "User")


func CreateAccount(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var account models.User

	if err := c.BindJSON(&account); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := validate.Struct(account); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	count, err := accountCollection.CountDocuments(ctx, bson.M{"email": account.Email})
	defer cancel()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if count > 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Email is already in use"})
		return
	}

	account.ID = primitive.NewObjectID() 
	account.CreatedAt = time.Now()
	account.UpdatedAt = time.Now()
	account.UserID = account.ID.Hex()
	password :=	hashPassword(*account.Password)
	account.Password = &password
	token, refreshToken, _ := helper.GenerateAllTokens(*account.Email, *account.Username, account.UserID)
	account.Token = &token
	account.RefreshToken = &refreshToken


	result, err := accountCollection.InsertOne(ctx, account)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cancel()
	c.JSON(http.StatusOK, gin.H{"data": result})
}

func hashPassword(password string) string {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes)
}


func GetAccount(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var account models.User

	id, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = accountCollection.FindOne(ctx, bson.M{"_id": id}).Decode(&account)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cancel()
	c.JSON(http.StatusOK, gin.H{"data": account})
}

func GetAccounts (c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var accounts []models.User

	cursor, err := accountCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cancel()
	for cursor.Next(ctx) {
		var account models.User
		cursor.Decode(&account)
		accounts = append(accounts, account)
	}

	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	cursor.Close(ctx)
	c.JSON(http.StatusOK, gin.H{"data": accounts})
}

func Login (c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var account models.User
	var searchAccount models.User

	if err := c.BindJSON(&account); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := accountCollection.FindOne(ctx, bson.M{"email": account.Email}).Decode(&searchAccount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid email"})
		return
	}

	CheckingPassword, msg := CheckPassword(*account.Password, *searchAccount.Password)
	defer cancel()
	if CheckingPassword != true{
		c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
		return
	}

	token, refreshToken, _ := helper.GenerateAllTokens(*searchAccount.Email, *searchAccount.Username, searchAccount.UserID)
	helper.UpdateAllTokens(token, refreshToken, searchAccount.UserID)

	c.JSON(http.StatusOK, gin.H{"LoginInfo": searchAccount})
}

func CheckPassword (AccountPassword string, ProvidedPassword string) (bool, string){
	check:= true
	message:= ""
	err := bcrypt.CompareHashAndPassword([]byte(ProvidedPassword), []byte(AccountPassword))
	if err != nil {
		check = false
		message = "Invalid password"
	}
	return check, message
}

func DeleteAccount(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var account models.User

	id, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = accountCollection.FindOneAndDelete(ctx, bson.M{"_id": id}).Decode(&account)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cancel()
	c.JSON(http.StatusOK, gin.H{"data": account})
}

func UpdateAccount(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var account models.User

	id, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.BindJSON(&account); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := validate.Struct(account); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	account.ID = id

	result, err := accountCollection.ReplaceOne(ctx, bson.M{"_id": id}, account)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cancel()
	c.JSON(http.StatusOK, gin.H{"data": result})
}