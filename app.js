const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const { resolve } = require('path');

const { databaseConnection } = require('./src/database/config');

// Configure environment variables
config({ path: resolve(__dirname, './.env') });

// Create the express app anc connect to the database
const app = express();
databaseConnection();

// Enable cors
app.use(cors());

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

// Run the application
app.listen(app.get('port'), '0.0.0.0', () => {
	console.log(`Application running on port: ${ app.get('port') }`);
});
