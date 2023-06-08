import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { resolve } from 'path';
import { graphqlHTTP } from 'express-graphql';

import { databaseConnection } from'./database/config';
import { getErrorCode } from './utils/get-error-code';
import { schema } from './schema';

// Configure environment variables
config({ path: resolve(__dirname, '../.env') });

// Create the express app anc connect to the database
const app = express();
databaseConnection();

// Enable cors and define graphql url
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  customFormatErrorFn: (err) => {
    if (err) {
      const error = getErrorCode(err?.message) || { message: err };
      return ({ message: error.message, statusCode: error.statusCode });
    } else {
      return({ message: err, statusCode: 500 });
    }
  }
}));

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

// Run the application
app.listen(app.get('port'), '0.0.0.0', () => {
	console.log(`Application running on port: ${ app.get('port') }`);
});
