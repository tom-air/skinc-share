require('dotenv').config();

const devConfig = {
  mongoUrl: process.env.MONGO_URL_DEV
};

const testConfig = {};

const prodConfig = {
  mongoUrl: process.env.MONGO_URL_PROD
};

const defaultConfig = {
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: process.env.SECRET,
  site: {
    name: process.env.NAME,
    slug: process.env.SLUG,
  },
  env: process.env.NODE_ENV || 'development',
  mongoOptions: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  accessKey: process.env.ALI_ACCESS_KEY,
  accessSecret: process.env.ALI_ACCESS_SECRET,
  bucketRegion: process.env.ALI_REGION,
  bucketName: process.env.ALI_BUCKET_NAME,
  subAppDomain: process.env.SUP_DOMAIN,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'production':
      return prodConfig;
    default:
      return prodConfig;
  }
}

module.exports = Object.assign(defaultConfig, envConfig(process.env.NODE_ENV));
