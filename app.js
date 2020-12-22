const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const fs = require('fs');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
// const mongoose = require('mongoose');
// const passport = require('passport');
const logger = require('./utils/logger');
const morgan = require('./utils/morgan');
const config = require('./utils/config');
const errorHandler = require('./utils/errorHandler');
const routes = require('./routes/index');
const apiRoutes = require('./apiRoutes/index');
// require('./utils/passport')(passport);

// mongoose.connect(config.mongoUrl, config.mongoOptions).then(() => {
//   logger.info('Connected to MongoDB');
//   server = app.listen(config.port, () => {
//     logger.info(`Listening to port ${config.port}`);
//   });
// });

const app = express();

app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(config.subAppDomain, express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// app.use(helmet());
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());
app.use(helmet.noSniff());
// Express Session
// app.use(
//   session({
//     secret: config.secret,
//     saveUninitialized: true,
//     resave: true
//   })
// );

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// app.use(passport.initialize());
// app.use(passport.session({
//   cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
// }));

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(`${config.subAppDomain}/api`, apiRoutes);
app.use(config.subAppDomain, routes);

app.use(errorHandler.pageNotFound);

module.exports = app;
