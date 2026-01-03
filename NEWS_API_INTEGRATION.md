# News Feed API Integration Guide

## Overview
The Cosmic News Feed currently uses mock data for demonstration. This guide explains how to integrate real news APIs for live data.

## Free News APIs

### 1. NewsAPI.org
- **URL**: https://newsapi.org/
- **Free Tier**: 1,000 requests/day
- **Categories**: General, Sports, Technology, Business
- **Usage**: Replace `getMockNews()` calls with actual API calls

```javascript
async loadGeneralNews() {
    const API_KEY = 'YOUR_NEWSAPI_KEY';
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const data = await response.json();
    this.newsData.general = data.articles.map(article => ({
        title: article.title,
        summary: article.description,
        source: article.source.name,
        time: this.formatTime(article.publishedAt),
        url: article.url,
        image: article.urlToImage || 'https://via.placeholder.com/300x200'
    }));
}
```

### 2. Hacker News API (Free)
- **URL**: https://github.com/HackerNews/API
- **Free**: Unlimited
- **Best for**: Tech news

```javascript
async loadTechNews() {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await response.json();
    const stories = await Promise.all(
        storyIds.slice(0, 10).map(async id => {
            const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return storyResponse.json();
        })
    );
    
    this.newsData.tech = stories.map(story => ({
        title: story.title,
        summary: story.title, // HN doesn't provide descriptions
        source: 'Hacker News',
        time: this.formatTime(new Date(story.time * 1000)),
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
        image: 'https://via.placeholder.com/300x200/0f0f28/00f0ff?text=Tech+News'
    }));
}
```

### 3. CoinGecko API (Free)
- **URL**: https://www.coingecko.com/en/api
- **Free**: Unlimited with rate limits
- **Best for**: Crypto news and data

```javascript
async loadCryptoNews() {
    // CoinGecko doesn't have news endpoint, but you can use their trending data
    const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
    const data = await response.json();
    
    this.newsData.crypto = data.coins.slice(0, 6).map(coin => ({
        title: `${coin.item.name} (${coin.item.symbol}) Trending`,
        summary: `${coin.item.name} is currently trending in the crypto market`,
        source: 'CoinGecko',
        time: 'Live',
        url: `https://www.coingecko.com/en/coins/${coin.item.id}`,
        image: coin.item.large
    }));
}
```

### 4. Reddit API (Free)
- **URL**: https://www.reddit.com/dev/api/
- **Free**: Yes, with rate limits
- **Best for**: Sports, general news from subreddits

```javascript
async loadSportsNews() {
    const response = await fetch('https://www.reddit.com/r/sports/hot.json?limit=10');
    const data = await response.json();
    
    this.newsData.sports = data.data.children.map(post => ({
        title: post.data.title,
        summary: post.data.selftext.substring(0, 150) + '...',
        source: 'Reddit Sports',
        time: this.formatTime(new Date(post.data.created_utc * 1000)),
        url: `https://reddit.com${post.data.permalink}`,
        image: post.data.thumbnail !== 'self' ? post.data.thumbnail : 'https://via.placeholder.com/300x200/0f0f28/ffd700?text=Sports'
    }));
}
```

## Implementation Steps

1. **Get API Keys**:
   - Sign up for NewsAPI.org
   - No key needed for Hacker News, CoinGecko, or Reddit

2. **Update Environment**:
   ```javascript
   // Add to the top of news-feed.js
   const API_KEYS = {
       newsapi: 'YOUR_NEWSAPI_KEY_HERE',
       // Add other keys as needed
   };
   ```

3. **Replace Mock Functions**:
   - Replace `getMockNews()` calls with actual API calls
   - Add error handling for API failures
   - Implement caching to avoid rate limits

4. **Add CORS Handling**:
   - Some APIs may require server-side proxy
   - Consider using a serverless function for API calls

## Rate Limiting & Caching

```javascript
class NewsCache {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }
    
    get(key) {
        const item = this.cache.get(key);
        if (item && Date.now() - item.timestamp < this.cacheTimeout) {
            return item.data;
        }
        return null;
    }
    
    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }
}
```

## Error Handling

```javascript
async loadNewsWithFallback(category) {
    try {
        // Try real API first
        await this.loadRealNews(category);
    } catch (error) {
        console.warn(`Failed to load ${category} news from API, using mock data:`, error);
        // Fallback to mock data
        this.newsData[category] = this.getMockNews(category);
    }
}
```

## Security Notes

- Never expose API keys in client-side code
- Use environment variables or server-side proxy
- Implement proper CORS handling
- Add rate limiting to prevent abuse

## Testing

1. Test with mock data first
2. Test API integration with small requests
3. Test error handling and fallbacks
4. Monitor API usage and costs

## Next Steps

1. Choose your preferred news sources
2. Sign up for API keys
3. Implement one category at a time
4. Add proper error handling and caching
5. Monitor performance and usage
