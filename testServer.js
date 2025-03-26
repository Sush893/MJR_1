import express from 'express';

// Create the express app
const app = express();
console.log('Express app created');

// Add JSON middleware
app.use(express.json());
console.log('JSON middleware added');

// Add a simple test route
app.get('/hello', (req, res) => {
  console.log('Hello route hit');
  res.json({ message: 'Hello World!' });
});
console.log('Routes added');

// Start server
const PORT = 5002; // Using a different port
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
}); 