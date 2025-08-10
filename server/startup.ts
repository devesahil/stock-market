import { db } from "./db";
import { storage } from "./storage";
import { log } from "./vite";

async function createTables() {
  try {
    // Drop existing tables to recreate with correct schema
    await db.execute(`DROP TABLE IF EXISTS stocks CASCADE`);
    await db.execute(`DROP TABLE IF EXISTS news_articles CASCADE`);
    await db.execute(`DROP TABLE IF EXISTS testimonials CASCADE`);
    await db.execute(`DROP TABLE IF EXISTS page_content CASCADE`);
    await db.execute(`DROP TABLE IF EXISTS media CASCADE`);
    
    // Create tables with correct schema
    await db.execute(`
      CREATE TABLE IF NOT EXISTS stocks (
        id VARCHAR(255) PRIMARY KEY,
        symbol VARCHAR(10) NOT NULL UNIQUE,
        name TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        change DECIMAL(10,2) NOT NULL,
        change_percent DECIMAL(5,2) NOT NULL,
        volume INTEGER NOT NULL DEFAULT 0,
        market_cap TEXT,
        sector TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS news_articles (
        id VARCHAR(255) PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        category VARCHAR(50) NOT NULL,
        author TEXT NOT NULL,
        published_at TIMESTAMP NOT NULL,
        is_published BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id VARCHAR(255) PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        company TEXT,
        content TEXT NOT NULL,
        rating INTEGER NOT NULL DEFAULT 5,
        avatar_url TEXT,
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
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        size INTEGER NOT NULL,
        url TEXT NOT NULL,
        alt_text VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    log("✅ Database tables created successfully!");
  } catch (error) {
    log(`❌ Error creating tables: ${error}`);
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    log("🔧 Initializing database...");
    
    // Create tables first
    await createTables();
    
    // Check if we have any data
    const stocks = await storage.getAllStocks();
    
    if (stocks.length === 0) {
      log("📊 Database is empty, seeding with initial data...");
      await seedDatabase();
      log("✅ Database seeded successfully!");
    } else {
      log("✅ Database already has data, skipping seed");
    }
    
  } catch (error) {
    log(`❌ Database initialization failed: ${error}`);
    // Don't throw - let the app continue without database
  }
}

async function seedDatabase() {
  const { nanoid } = await import("nanoid");
  
  // Seed stocks
  const stockData = [
    {
      id: nanoid(),
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 2.15,
      changePercent: 1.24,
      volume: 45678900,
      marketCap: "2750000000000",
      sector: "Technology",
      isActive: true,
    },
    {
      id: nanoid(),
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 142.56,
      change: -1.23,
      changePercent: -0.85,
      volume: 23456700,
      marketCap: "1800000000000",
      sector: "Technology",
      isActive: true,
    },
    {
      id: nanoid(),
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 378.85,
      change: 5.67,
      changePercent: 1.52,
      volume: 34567800,
      marketCap: "2800000000000",
      sector: "Technology",
      isActive: true,
    },
    {
      id: nanoid(),
      symbol: "TSLA",
      name: "Tesla, Inc.",
      price: 248.42,
      change: -3.21,
      changePercent: -1.28,
      volume: 56789000,
      marketCap: "790000000000",
      sector: "Automotive",
      isActive: true,
    },
    {
      id: nanoid(),
      symbol: "AMZN",
      name: "Amazon.com, Inc.",
      price: 145.24,
      change: 1.89,
      changePercent: 1.32,
      volume: 67890100,
      marketCap: "1500000000000",
      sector: "Consumer Discretionary",
      isActive: true,
    },
    {
      id: nanoid(),
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      price: 485.09,
      change: 12.45,
      changePercent: 2.63,
      volume: 45678900,
      marketCap: "1200000000000",
      sector: "Technology",
      isActive: true,
    },
  ];

  for (const stock of stockData) {
    await storage.createStock(stock);
  }

  // Seed news articles
  const newsData = [
    {
      id: nanoid(),
      title: "Tech Stocks Rally as AI Innovation Drives Market Growth",
      excerpt: "Major technology companies are experiencing significant growth as artificial intelligence continues to revolutionize various industries.",
      content: "Major technology companies are experiencing significant growth as artificial intelligence continues to revolutionize various industries. Analysts predict continued momentum in the tech sector.",
      category: "Technology",
      author: "Financial Times",
      publishedAt: new Date(),
      isPublished: true,
    },
    {
      id: nanoid(),
      title: "Federal Reserve Signals Potential Rate Cuts in 2024",
      excerpt: "The Federal Reserve has indicated possible interest rate reductions in the coming year, which could provide a boost to equity markets.",
      content: "The Federal Reserve has indicated possible interest rate reductions in the coming year, which could provide a boost to equity markets and economic growth.",
      category: "Economy",
      author: "Wall Street Journal",
      publishedAt: new Date(),
      isPublished: true,
    },
    {
      id: nanoid(),
      title: "Green Energy Stocks Surge on Climate Policy Updates",
      excerpt: "Renewable energy companies are seeing increased investor interest as governments worldwide implement more aggressive climate policies.",
      content: "Renewable energy companies are seeing increased investor interest as governments worldwide implement more aggressive climate policies and incentives.",
      category: "Energy",
      author: "Bloomberg",
      publishedAt: new Date(),
      isPublished: true,
    },
    {
      id: nanoid(),
      title: "Earnings Season Exceeds Expectations for Major Corporations",
      excerpt: "Q4 earnings reports are showing stronger-than-expected results across multiple sectors, with particularly strong performance in consumer goods and healthcare.",
      content: "Q4 earnings reports are showing stronger-than-expected results across multiple sectors, with particularly strong performance in consumer goods and healthcare.",
      category: "Earnings",
      author: "Reuters",
      publishedAt: new Date(),
      isPublished: true,
    },
  ];

  for (const news of newsData) {
    await storage.createNewsArticle(news);
  }

  // Seed testimonials
  const testimonialData = [
    {
      id: nanoid(),
      name: "Sarah Johnson",
      role: "Portfolio Manager",
      company: "Global Investments Ltd",
      content: "This platform has revolutionized how I track market movements. The real-time data and intuitive interface make it my go-to tool for investment decisions.",
      rating: 5,
      isActive: true,
    },
    {
      id: nanoid(),
      name: "Michael Chen",
      role: "Day Trader",
      company: "Independent Trader",
      content: "The speed and accuracy of the stock data is incredible. I've been able to make more informed trades and improve my success rate significantly.",
      rating: 5,
      isActive: true,
    },
    {
      id: nanoid(),
      name: "Emily Rodriguez",
      role: "Financial Analyst",
      company: "Meridian Capital",
      content: "As a financial analyst, I need reliable data and comprehensive market insights. This platform delivers exactly what I need to provide accurate recommendations.",
      rating: 5,
      isActive: true,
    },
    {
      id: nanoid(),
      name: "David Thompson",
      role: "Retail Investor",
      company: "Individual Investor",
      content: "I'm new to investing and this platform has made it so much easier to understand the market. The educational content and user-friendly design are excellent.",
      rating: 5,
      isActive: true,
    },
  ];

  for (const testimonial of testimonialData) {
    await storage.createTestimonial(testimonial);
  }

  // Seed page content
  const contentData = [
    {
      id: nanoid(),
      section: "hero",
      key: "title",
      value: "Master the Markets with Real-Time Trading Data",
    },
    {
      id: nanoid(),
      section: "hero",
      key: "subtitle",
      value: "Get instant access to live stock prices, market analysis, and trading insights. Make informed decisions with our comprehensive financial platform.",
    },
    {
      id: nanoid(),
      section: "hero",
      key: "cta",
      value: "Start Trading Now",
    },
    {
      id: nanoid(),
      section: "hero",
      key: "background_image",
      value: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: nanoid(),
      section: "features",
      key: "title",
      value: "Why Choose Our Platform",
    },
    {
      id: nanoid(),
      section: "features",
      key: "subtitle",
      value: "Experience the power of real-time market data and advanced trading tools designed for both beginners and experienced investors.",
    },
    {
      id: nanoid(),
      section: "about",
      key: "title",
      value: "About Our Platform",
    },
    {
      id: nanoid(),
      section: "about",
      key: "content",
      value: "We provide cutting-edge financial technology that empowers investors to make data-driven decisions. Our platform combines real-time market data with advanced analytics to give you the edge you need in today's fast-paced markets.",
    },
    {
      id: nanoid(),
      section: "about",
      key: "image",
      value: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  for (const content of contentData) {
    await storage.upsertPageContent(content);
  }

  // Seed media
  const mediaData = [
    {
      id: nanoid(),
      filename: "hero-background.jpg",
      originalName: "hero-background.jpg",
      mimeType: "image/jpeg",
      size: 245760,
      url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      altText: "Trading platform background image",
    },
    {
      id: nanoid(),
      filename: "about-section.jpg",
      originalName: "about-section.jpg",
      mimeType: "image/jpeg",
      size: 198432,
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      altText: "About section image showing financial charts",
    },
    {
      id: nanoid(),
      filename: "stock-chart.jpg",
      originalName: "stock-chart.jpg",
      mimeType: "image/jpeg",
      size: 156789,
      url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      altText: "Stock market chart visualization",
    },
  ];

  for (const media of mediaData) {
    await storage.createMedia(media);
  }
} 