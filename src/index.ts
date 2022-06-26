import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { resolve } from 'path';

import * as routes from './routes';
import { databaseConnection } from './database/config';

//* Configure environment variables
config({ path: resolve(__dirname, '../.env.dev') });

//* Create the express app and connect to the database
const app = express();
databaseConnection();

//* Enable CORS Option
const corsOptions = {	origin: `${ process.env.FRONTEND_URL }` };
app.use(cors(corsOptions));

//* Settings
app.set('port', process.env.PORT || 4000);

//* Middlewares
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

//* Routes
app.use('/api/v1/auth', routes.authRoutes.router);
app.use('/api/v1/categories', routes.categoriesRoutes.router);
app.use('/api/v1/recipes', routes.recipesRoutes.router);
app.use('/api/v1/users', routes.usersRoutes.router);

//* Listening
app.listen(app.get('port'), '0.0.0.0', () => {
	console.log(`Application running on port: ${ app.get('port') }`);
});
