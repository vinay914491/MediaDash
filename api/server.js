const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const cors = require('cors');
const userRoutes = require('./userRoutes');

const app = express();
const PORT = process.env.PORT || 4000; // Use environment variable or default to 4000

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT} connected to database`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// Load CSV Data
const loadCSV = (filename) => {
  const filePath = path.join(__dirname, 'data', filename);
  return fs.readFileSync(filePath, 'utf-8');
};

// Function to parse CSV
const parseCSV = (csvString) => {
  const lines = csvString.split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header.trim()] = values[index].trim();
      return obj;
    }, {});
  });
};

// Function to execute Python script
const executePythonScript = (scriptPath) => {
  return new Promise((resolve, reject) => {
    exec(`python ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing Python script: ${error.message}`);
      } else if (stderr) {
        reject(`Script returned error: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Prediction function for performance
const predictPerformance = async () => {
  try {
    const scriptOutput = await executePythonScript('ml/predict_performance.py');
    return JSON.parse(scriptOutput);
  } catch (error) {
    throw new Error(`Error predicting performance: ${error}`);
  }
};

// Segment users function
const segmentUsers = (data) => {
  return data.map(item => ({
    ...item,
    segment: item.likes > 150 ? 'High Engagement' : 'Low Engagement',
  }));
};

// Predict churn function
const predictChurn = (data) => {
  return data.map(item => ({
    ...item,
    churn_risk: item.popularity < 50 ? 'High' : 'Low',
  }));
};

// Routes

// Predict performance endpoint
app.get('/api/predictPerformance', async (req, res) => {
  try {
    const csvData = loadCSV('twitter_data.csv');
    const data = parseCSV(csvData);
    const predictedData = await predictPerformance();
    res.json(predictedData);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Segment users endpoint
app.get('/api/segmentUsers', (req, res) => {
  try {
    const csvData = loadCSV('instagram_data.csv');
    const data = parseCSV(csvData);
    const segmentedData = segmentUsers(data);
    res.json(segmentedData);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Predict churn endpoint
app.get('/api/predictChurn', (req, res) => {
  try {
    const csvData = loadCSV('spotify_data.csv');
    const data = parseCSV(csvData);
    const churnData = predictChurn(data);
    res.json(churnData);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
