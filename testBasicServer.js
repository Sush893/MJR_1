// Basic standalone Express server test
import express from 'express';

const app = express();
const PORT = 3000;

// Basic JSON middleware
app.use(express.json());

// Test route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Direct test route
app.post('/test-register', (req, res) => {
  console.log('Test register hit');
  res.json({ message: 'Test register works!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Basic test server running on port ${PORT}`);
}); 