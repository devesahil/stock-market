# Stock Market Trading Platform

A modern stock market and trading landing page featuring interactive animations and real-time data.

## Features

- 📈 Real-time stock data and market analysis
- 📰 Latest financial news and market updates
- 💬 User testimonials and reviews
- 🎨 Modern, responsive UI with animations
- 🔧 Admin dashboard for content management
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Deployment**: Render

## Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stock-market
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_neon_database_url_here
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## Deployment on Render

### Prerequisites

1. **Database Setup**: Create a PostgreSQL database on [Neon](https://neon.tech) or any PostgreSQL provider
2. **GitHub Repository**: Push your code to GitHub

### Render Deployment Steps

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure the service**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: (leave blank)

4. **Add Environment Variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: `production`

5. **Deploy**

### Environment Variables for Render

Make sure to add these environment variables in your Render dashboard:

```env
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
```

## Database Schema

The application uses the following main tables:

- **stocks**: Stock market data (symbol, price, change, etc.)
- **newsArticles**: Financial news and market updates
- **testimonials**: User reviews and testimonials
- **pageContent**: Dynamic content for different sections
- **media**: Media files and assets

## API Endpoints

### Public Endpoints
- `GET /api/stocks` - Get active stocks
- `GET /api/news` - Get published news articles
- `GET /api/testimonials` - Get active testimonials
- `GET /api/content` - Get page content

### Admin Endpoints
- `GET /api/admin/stocks` - Get all stocks
- `POST /api/admin/stocks` - Create new stock
- `PUT /api/admin/stocks/:id` - Update stock
- `DELETE /api/admin/stocks/:id` - Delete stock

(Similar endpoints exist for news, testimonials, and content)

## Troubleshooting

### "Data not available" Error

If you're seeing "Data not available" messages on the deployed site:

1. **Check Database Connection**: Ensure `DATABASE_URL` is correctly set in Render
2. **Verify Database Tables**: Run `npm run db:push` to create tables
3. **Seed the Database**: Run `npm run db:seed` to populate with initial data
4. **Check Render Logs**: Look for database connection errors in Render logs

### Common Issues

1. **Database Connection Failed**
   - Verify your `DATABASE_URL` is correct
   - Check if your database is accessible from Render's servers
   - Ensure your database allows external connections

2. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Verify TypeScript compilation passes locally
   - Check Render build logs for specific errors

3. **Frontend Not Loading**
   - Ensure the build process completes successfully
   - Check that static files are being served correctly
   - Verify the Express server is running on the correct port

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run db:seed` - Seed database with initial data
- `npm run check` - Type check the codebase

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License - see LICENSE file for details 