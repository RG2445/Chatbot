// Configuration for different environments
const config = {
  development: {
    API_BASE_URL: 'http://localhost:3000'
  },
  production: {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'https://your-backend-url.com'
  }
};

export default config[process.env.NODE_ENV || 'development'];