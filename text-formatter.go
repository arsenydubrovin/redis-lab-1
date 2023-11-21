package main

import (
	"log"

	"github.com/redis/go-redis/v9"
)

func (a *App) connectToDB() error {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "student",
		DB:       0,
	})
	defer client.Conn().Close()

	pong, err := client.Ping(a.ctx).Result()

	if err != nil {
		log.Printf("Error connecting to Redis: %s", err.Error())
		return err
	}
	log.Printf("Connected to Redis: %s\n", pong)

	a.redisClient = client
	return nil
}

func (a *App) createDefaultUsers() error {
	for _, userName := range a.defaultUserList {
		err := a.redisClient.HMSet(a.ctx, userName, a.defaultSettings).Err()
		if err != nil {
			log.Printf("Error adding default settings %s in Redis: %s", userName, err.Error())
			return err
		}
	}

	log.Print("Default user's data adeed to database")

	return nil
}

func (a *App) UpdateUserSettings(userName string, userSettings map[string]string) error {
	err := a.redisClient.HMSet(a.ctx, userName, userSettings).Err()
	if err != nil {
		log.Printf("Error updating settings of %s in Redis: %s", userName, err.Error())
		return err
	}
	log.Printf("Updated settings of %s", userName)

	return nil
}

func (a *App) GetUserSettings(userName string) (map[string]string, error) {
	var usersSettings map[string]string
	usersSettings, err := a.redisClient.HGetAll(a.ctx, userName).Result()
	if err != nil {
		log.Printf("Error getting settings of %s: %s", userName, err.Error())
		return usersSettings, err
	}

	return usersSettings, nil
}

func (a *App) ServeUserList() [2]string {
	return a.defaultUserList
}

func (a *App) ServeDefaultFontList() map[string]string {
	return a.defaultFontList
}
