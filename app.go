package main

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

// App struct
type App struct {
	ctx             context.Context
	redisClient     *redis.Client
	defaultUserList [2]string
	defaultSettings map[string]string
	defaultFontList map[string]string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// Default application settings
	a.defaultUserList = [2]string{"user_1", "user_2"}
	a.defaultSettings = map[string]string{
		"fontFamily": "helvetica",
		"fontSize":   "16",
		"fontStyle":  "normal",
		"fontColor":  "#000000",
	}
	a.defaultFontList = map[string]string{
		"helvetica":   "Helvetica",
		"new_york":    "New York",
		"source_code": "Source Code Pro",
	}

	err := a.connectToDB()
	if err != nil {
		log.Fatal(err.Error())
	}
	a.createDefaultUsers()
	if err != nil {
		log.Fatal(err.Error())
	}
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}
