import { db } from "./db";
import { stocks, newsArticles, testimonials, pageContent, media } from "@shared/schema";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function runMigrations() {
  console.log("🔄 Running database migrations...");
  
  try {
    // Create tables if they don't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS stocks (
        id VARCHAR(255) PRIMARY KEY,
        symbol VARCHAR(10) NOT NULL,
        name VARCHAR(255) NOT NULL,
        current_price DECIMAL(10,2) NOT NULL,
        change DECIMAL(10,2) NOT NULL,
        change_percent DECIMAL(5,2) NOT NULL,
        volume BIGINT NOT NULL,
        market_cap BIGINT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS news_articles (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS page_content (
        id VARCHAR(255) PRIMARY KEY,
        section VARCHAR(100) NOT NULL,
        key VARCHAR(100) NOT NULL,
        value TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(section, key)
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS media (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        url VARCHAR(500) NOT NULL,
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Database tables created successfully!");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
    throw error;
  }
}

// Run migrations
runMigrations()
  .then(() => {
    console.log("✅ Migrations completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Migrations failed:", error);
    process.exit(1);
  }); 