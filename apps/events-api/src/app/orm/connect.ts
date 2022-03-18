import { connect, connection, ConnectOptions } from "mongoose";
import { environment } from "../../environments/environment";

export const DBConnection = () => {
  
  const connectORM = () => {
    connect(
        environment.mongodb.url,
        { 
          dbName: 'events',
          useNewUrlParser: true,
          retryWrites: true,
          w: "majority"
        } as ConnectOptions,
      )
      .then(() => {
        return console.info(`Successfully connected to mongodb`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connectORM();

  connection.on('disconnected', connectORM);
}