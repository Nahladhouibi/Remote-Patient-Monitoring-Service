const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const client = require('prom-client')
const app = express();
// Enable Prometheus metrics collection
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Create a histogram metric for remote-ms service
const remoteRequestDurationMicroseconds = new client.Histogram({
  name: 'remote_request_duration_seconds',
  help: 'Duration of remote-ms service HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

// Register the histogram for remote-ms service
register.registerMetric(remoteRequestDurationMicroseconds);

// Middleware to measure request duration for remote-ms service
app.use((req, res, next) => {
  const end = remoteRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.url, code: res.statusCode });
  });
  next();
});

// Route to expose Prometheus metrics
app.get('/metrics', async (req, res) => {
  try {
    const metrics = await register.metrics();
    res.set('Content-Type', register.contentType);
    res.end(metrics);
  } catch (error) {
    console.error('Error generating metrics:', error);
    res.status(500).send('Error generating metrics');
  }
});

const routerApi = require('./routes');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



routerApi(app);

app.listen(port,()=>{
    console.log("Port ==> ", port);
});

module.exports = app;