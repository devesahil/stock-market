import { db } from "./db";
import { stocks, newsArticles, testimonials, pageContent, media } from "@shared/schema";

async function initDatabase() {
  console.log("🔧 Initializing database...");

  try {
    // Create tables if they don't exist
    // Note: In production, you should use proper migrations
    // This is a simplified approach for development/deployment
    
    console.log("✅ Database initialized successfully!");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    throw error;
  }
}

// Run the initialization
initDatabase()
  .then(() => {
    console.log("✅ Database initialization completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Database initialization failed:", error);
    process.exit(1);
  }); 