export const environment = {
  production: false,
  mongodb : { 
    url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@figfinance.gabco.mongodb.net/`,
  }
};
