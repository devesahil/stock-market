import { db } from "./db";
import { stocks, newsArticles, testimonials, pageContent } from "@shared/schema";
import { nanoid } from "nanoid";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Seed stocks
    const stockData = [
      {
        id: nanoid(),
        symbol: "AAPL",
        name: "Apple Inc.",
        currentPrice: 175.43,
        change: 2.15,
        changePercent: 1.24,
        volume: 45678900,
        marketCap: 2750000000000,
        isActive: true,
      },
      {
        id: nanoid(),
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        currentPrice: 142.56,
        change: -1.23,
        changePercent: -0.85,
        volume: 23456700,
        marketCap: 1800000000000,
        isActive: true,
      },
      {
        id: nanoid(),
        symbol: "MSFT",
        name: "Microsoft Corporation",
        currentPrice: 378.85,
        change: 5.67,
        changePercent: 1.52,
        volume: 34567800,
        marketCap: 2800000000000,
        isActive: true,
      },
      {
        id: nanoid(),
        symbol: "TSLA",
        name: "Tesla, Inc.",
        currentPrice: 248.42,
        change: -3.21,
        changePercent: -1.28,
        volume: 56789000,
        marketCap: 790000000000,
        isActive: true,
      },
      {
        id: nanoid(),
        symbol: "AMZN",
        name: "Amazon.com, Inc.",
        currentPrice: 145.24,
        change: 1.89,
        changePercent: 1.32,
        volume: 67890100,
        marketCap: 1500000000000,
        isActive: true,
      },
      {
        id: nanoid(),
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        currentPrice: 485.09,
        change: 12.45,
        changePercent: 2.63,
        volume: 45678900,
        marketCap: 1200000000000,
        isActive: true,
      },
    ];

    await db.insert(stocks).values(stockData);
    console.log("✅ Stocks seeded");

    // Seed news articles
    const newsData = [
      {
        id: nanoid(),
        title: "Tech Stocks Rally as AI Innovation Drives Market Growth",
        content: "Major technology companies are experiencing significant growth as artificial intelligence continues to revolutionize various industries. Analysts predict continued momentum in the tech sector.",
        author: "Financial Times",
        publishedAt: new Date(),
        isPublished: true,
      },
      {
        id: nanoid(),
        title: "Federal Reserve Signals Potential Rate Cuts in 2024",
        content: "The Federal Reserve has indicated possible interest rate reductions in the coming year, which could provide a boost to equity markets and economic growth.",
        author: "Wall Street Journal",
        publishedAt: new Date(),
        isPublished: true,
      },
      {
        id: nanoid(),
        title: "Green Energy Stocks Surge on Climate Policy Updates",
        content: "Renewable energy companies are seeing increased investor interest as governments worldwide implement more aggressive climate policies and incentives.",
        author: "Bloomberg",
        publishedAt: new Date(),
        isPublished: true,
      },
      {
        id: nanoid(),
        title: "Earnings Season Exceeds Expectations for Major Corporations",
        content: "Q4 earnings reports are showing stronger-than-expected results across multiple sectors, with particularly strong performance in consumer goods and healthcare.",
        author: "Reuters",
        publishedAt: new Date(),
        isPublished: true,
      },
    ];

    await db.insert(newsArticles).values(newsData);
    console.log("✅ News articles seeded");

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

    await db.insert(testimonials).values(testimonialData);
    console.log("✅ Testimonials seeded");

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
    ];

    await db.insert(pageContent).values(contentData);
    console.log("✅ Page content seeded");

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("✅ Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }); 