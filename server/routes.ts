import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStockSchema, insertNewsArticleSchema, insertTestimonialSchema, insertPageContentSchema, insertMediaSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Stock routes
  app.get("/api/stocks", async (req, res) => {
    try {
      const stocks = await storage.getActiveStocks();
      res.json(stocks);
    } catch (error) {
      console.error("Error fetching stocks:", error);
      res.status(500).json({ message: "Failed to fetch stocks" });
    }
  });

  app.get("/api/admin/stocks", async (req, res) => {
    try {
      const stocks = await storage.getAllStocks();
      res.json(stocks);
    } catch (error) {
      console.error("Error fetching all stocks:", error);
      res.status(500).json({ message: "Failed to fetch stocks" });
    }
  });

  app.post("/api/admin/stocks", async (req, res) => {
    try {
      const stockData = insertStockSchema.parse(req.body);
      const stock = await storage.createStock(stockData);
      res.status(201).json(stock);
    } catch (error) {
      console.error("Error creating stock:", error);
      res.status(400).json({ message: "Failed to create stock" });
    }
  });

  app.put("/api/admin/stocks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const stockData = insertStockSchema.partial().parse(req.body);
      const stock = await storage.updateStock(id, stockData);
      res.json(stock);
    } catch (error) {
      console.error("Error updating stock:", error);
      res.status(400).json({ message: "Failed to update stock" });
    }
  });

  app.delete("/api/admin/stocks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteStock(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting stock:", error);
      res.status(400).json({ message: "Failed to delete stock" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getPublishedNews();
      res.json(news);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get("/api/admin/news", async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      console.error("Error fetching all news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.post("/api/admin/news", async (req, res) => {
    try {
      const articleData = insertNewsArticleSchema.parse(req.body);
      const article = await storage.createNewsArticle(articleData);
      res.status(201).json(article);
    } catch (error) {
      console.error("Error creating news article:", error);
      res.status(400).json({ message: "Failed to create news article" });
    }
  });

  app.put("/api/admin/news/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const articleData = insertNewsArticleSchema.partial().parse(req.body);
      const article = await storage.updateNewsArticle(id, articleData);
      res.json(article);
    } catch (error) {
      console.error("Error updating news article:", error);
      res.status(400).json({ message: "Failed to update news article" });
    }
  });

  app.delete("/api/admin/news/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteNewsArticle(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting news article:", error);
      res.status(400).json({ message: "Failed to delete news article" });
    }
  });

  // Testimonial routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/admin/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching all testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/admin/testimonials", async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(testimonial);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      res.status(400).json({ message: "Failed to create testimonial" });
    }
  });

  app.put("/api/admin/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const testimonialData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(id, testimonialData);
      res.json(testimonial);
    } catch (error) {
      console.error("Error updating testimonial:", error);
      res.status(400).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete("/api/admin/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTestimonial(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(400).json({ message: "Failed to delete testimonial" });
    }
  });

  // Page content routes
  app.get("/api/content", async (req, res) => {
    try {
      const content = await storage.getAllPageContent();
      res.json(content);
    } catch (error) {
      console.error("Error fetching page content:", error);
      res.status(500).json({ message: "Failed to fetch page content" });
    }
  });

  app.get("/api/content/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const content = await storage.getPageContent(section);
      res.json(content);
    } catch (error) {
      console.error("Error fetching section content:", error);
      res.status(500).json({ message: "Failed to fetch section content" });
    }
  });

  app.post("/api/admin/content", async (req, res) => {
    try {
      const contentData = insertPageContentSchema.parse(req.body);
      const content = await storage.upsertPageContent(contentData);
      res.status(201).json(content);
    } catch (error) {
      console.error("Error creating/updating page content:", error);
      res.status(400).json({ message: "Failed to save page content" });
    }
  });

  app.put("/api/admin/content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const contentData = insertPageContentSchema.parse(req.body);
      const content = await storage.updatePageContent(id, contentData);
      res.json(content);
    } catch (error) {
      console.error("Error updating page content:", error);
      res.status(400).json({ message: "Failed to update page content" });
    }
  });

  app.delete("/api/admin/content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePageContent(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting page content:", error);
      res.status(400).json({ message: "Failed to delete page content" });
    }
  });

  // Media routes
  app.get("/api/media", async (req, res) => {
    try {
      const media = await storage.getAllMedia();
      res.json(media);
    } catch (error) {
      console.error("Error fetching media:", error);
      res.status(500).json({ message: "Failed to fetch media" });
    }
  });

  app.post("/api/admin/media", async (req, res) => {
    try {
      const mediaData = insertMediaSchema.parse(req.body);
      const media = await storage.createMedia(mediaData);
      res.status(201).json(media);
    } catch (error) {
      console.error("Error creating media:", error);
      res.status(400).json({ message: "Failed to create media" });
    }
  });

  app.put("/api/admin/media/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const mediaData = insertMediaSchema.partial().parse(req.body);
      const media = await storage.updateMedia(id, mediaData);
      res.json(media);
    } catch (error) {
      console.error("Error updating media:", error);
      res.status(400).json({ message: "Failed to update media" });
    }
  });

  app.delete("/api/admin/media/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteMedia(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting media:", error);
      res.status(400).json({ message: "Failed to delete media" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
