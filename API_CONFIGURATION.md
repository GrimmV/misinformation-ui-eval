# API Configuration

This application now fetches data from Flask endpoints instead of using mocked data. To configure the API endpoints, you can set the following environment variables:

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_API_BASE_URL=http://localhost
VITE_API_PORT=5000
```

## Default Configuration

If no environment variables are set, the application will use these defaults:
- Base URL: `http://localhost`
- Port: `5000`

## API Endpoints

The application expects the following Flask endpoints:

### Posts Endpoint
- **URL**: `{{base_url}}:{{port}}/api/v1/posts`
- **Method**: GET
- **Response**: Array of social media posts

### Evaluation Data Endpoint
- **URL**: `{{base_url}}:{{port}}/api/v1/evaluation_data`
- **Method**: POST
- **Request Body**: `{ "post_ids": [1, 2, 3, ...] }`
- **Response**: Array of evaluation data objects

## Data Format

### Post Object
```typescript
{
  id: number;
  name: string;
  profileImage: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  isFakeNews?: boolean;
  category?: string;
}
```

### Evaluation Data Object
```typescript
{
  id: number;
  trustScore: 'No' | 'Low' | 'Medium' | 'High';
  rationale: string;
  detailedAnalysis: string;
}
```

## Error Handling

The application includes comprehensive error handling:
- Loading states while fetching data
- Error messages for failed requests
- Retry functionality for failed requests
- Graceful fallbacks when data is unavailable

## Caching

The application implements intelligent caching:
- Posts are cached for 5 minutes
- Evaluation data is cached per post ID combination
- Cache is automatically cleared when needed
