import { 
  stocks, 
  newsArticles, 
  testimonials,
  pageContent,
  type Stock, 
  type InsertStock,
  type NewsArticle,
  type InsertNewsArticle,
  type Testimonial,
  type InsertTestimonial,
  type PageContent,
  type InsertPageContent
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Stock operations
  getAllStocks(): Promise<Stock[]>;
  getActiveStocks(): Promise<Stock[]>;
  getStock(id: string): Promise<Stock | undefined>;
  createStock(stock: InsertStock): Promise<Stock>;
  updateStock(id: string, stock: Partial<InsertStock>): Promise<Stock>;
  deleteStock(id: string): Promise<void>;

  // News operations
  getAllNews(): Promise<NewsArticle[]>;
  getPublishedNews(): Promise<NewsArticle[]>;
  getNewsArticle(id: string): Promise<NewsArticle | undefined>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
  updateNewsArticle(id: string, article: Partial<InsertNewsArticle>): Promise<NewsArticle>;
  deleteNewsArticle(id: string): Promise<void>;

  // Testimonial operations
  getAllTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: string): Promise<void>;

  // Page content operations
  getAllPageContent(): Promise<PageContent[]>;
  getPageContent(section: string): Promise<PageContent[]>;
  getPageContentByKey(section: string, key: string): Promise<PageContent | undefined>;
  upsertPageContent(content: InsertPageContent): Promise<PageContent>;
  deletePageContent(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Stock operations
  async getAllStocks(): Promise<Stock[]> {
    return await db.select().from(stocks).orderBy(desc(stocks.updatedAt));
  }

  async getActiveStocks(): Promise<Stock[]> {
    return await db.select().from(stocks)
      .where(eq(stocks.isActive, true))
      .orderBy(desc(stocks.updatedAt));
  }

  async getStock(id: string): Promise<Stock | undefined> {
    const [stock] = await db.select().from(stocks).where(eq(stocks.id, id));
    return stock;
  }

  async createStock(stock: InsertStock): Promise<Stock> {
    const [newStock] = await db.insert(stocks).values(stock).returning();
    return newStock;
  }

  async updateStock(id: string, stock: Partial<InsertStock>): Promise<Stock> {
    const [updatedStock] = await db
      .update(stocks)
      .set({ ...stock, updatedAt: new Date() })
      .where(eq(stocks.id, id))
      .returning();
    return updatedStock;
  }

  async deleteStock(id: string): Promise<void> {
    await db.delete(stocks).where(eq(stocks.id, id));
  }

  // News operations
  async getAllNews(): Promise<NewsArticle[]> {
    return await db.select().from(newsArticles).orderBy(desc(newsArticles.publishedAt));
  }

  async getPublishedNews(): Promise<NewsArticle[]> {
    return await db.select().from(newsArticles)
      .where(eq(newsArticles.isPublished, true))
      .orderBy(desc(newsArticles.publishedAt));
  }

  async getNewsArticle(id: string): Promise<NewsArticle | undefined> {
    const [article] = await db.select().from(newsArticles).where(eq(newsArticles.id, id));
    return article;
  }

  async createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle> {
    const [newArticle] = await db.insert(newsArticles).values(article).returning();
    return newArticle;
  }

  async updateNewsArticle(id: string, article: Partial<InsertNewsArticle>): Promise<NewsArticle> {
    const [updatedArticle] = await db
      .update(newsArticles)
      .set({ ...article, updatedAt: new Date() })
      .where(eq(newsArticles.id, id))
      .returning();
    return updatedArticle;
  }

  async deleteNewsArticle(id: string): Promise<void> {
    await db.delete(newsArticles).where(eq(newsArticles.id, id));
  }

  // Testimonial operations
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(desc(testimonials.createdAt));
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set({ ...testimonial, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return updatedTestimonial;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Page content operations
  async getAllPageContent(): Promise<PageContent[]> {
    return await db.select().from(pageContent).orderBy(pageContent.section, pageContent.key);
  }

  async getPageContent(section: string): Promise<PageContent[]> {
    return await db.select().from(pageContent)
      .where(eq(pageContent.section, section))
      .orderBy(pageContent.key);
  }

  async getPageContentByKey(section: string, key: string): Promise<PageContent | undefined> {
    const [content] = await db.select().from(pageContent)
      .where(and(eq(pageContent.section, section), eq(pageContent.key, key)));
    return content;
  }

  async upsertPageContent(content: InsertPageContent): Promise<PageContent> {
    const existing = await this.getPageContentByKey(content.section, content.key);
    
    if (existing) {
      const [updated] = await db
        .update(pageContent)
        .set({ value: content.value, updatedAt: new Date() })
        .where(and(eq(pageContent.section, content.section), eq(pageContent.key, content.key)))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(pageContent).values(content).returning();
      return created;
    }
  }

  async deletePageContent(id: string): Promise<void> {
    await db.delete(pageContent).where(eq(pageContent.id, id));
  }
}

export const storage = new DatabaseStorage();
