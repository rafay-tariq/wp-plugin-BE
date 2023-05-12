import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
export const dataSourceOptions:DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ssl: process.env.POSTGRES_SSL === 'true',
  entities: ['dist/**/*.entity.js'],
  // We are using migrations, synchronize should be set to false.
  synchronize: true,
  //dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  // logging: false,
  // subscribers:[],
  // migrations: ['dist/src/migrations/*.js'],
}
const index = new DataSource(dataSourceOptions);
export default index;
