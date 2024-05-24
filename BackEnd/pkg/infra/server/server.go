package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/template/html"
	"github.com/ragrag/envoy/pkg/infra"
	"github.com/sirupsen/logrus"
)

func ProvideServer(cfg *infra.Config, logger *logrus.Logger, controller *Controller) *fiber.App {
	viewsEngine := html.New("./views", ".html")

	server := fiber.New(fiber.Config{
		Views:        viewsEngine,
		ErrorHandler: ErrorMiddleware,
	})

	server.Use(cors.New())

	server.Use(func(c *fiber.Ctx) error {
		if c.Path() != "/healthz" {
			logger.WithFields(logrus.Fields{
				"method": c.Method(),
				"path":   c.Path(),
			}).Info("Incoming request")
		}
		return c.Next()
	})

	if cfg.Server.AuthToken != "" {
		server.Use(AuthMiddleware(cfg.Server.AuthToken))
	}

	// Добавляем обработку маршрута /index
	// server.Get("/index", func(c *fiber.Ctx) error {
	// 	// Здесь можно добавить логику обработки запроса к /index
	// 	return c.SendString("Hello, this is the index page!")
	// })

	// Создаем новый экземпляр Fiber веб-приложения,
	// указывая наш шаблонизатор

	// Настраиваем обработчик для веб-страницы аккаунта пользователя
	server.Get("/", func(c *fiber.Ctx) error {
		return c.Render("hak3", fiber.Map{
			"name": "John",
		})
	})
	RegisterRoutes(server, controller)
	server.Static("/", "./public")

	return server
}
