const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json())

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Available Routes
app.use('/api/form', require('./routes/formdata'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/feed', require('./routes/feedback'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Travel backend listening at http://localhost:${port}`)
    console.log(`Swagger UI available at http://localhost:${port}/api-docs`)
})

// import ('./db.js');

// console.log("Backend server setup is commented out.");

