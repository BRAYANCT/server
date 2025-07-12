
//deploy url
// mysql://root:ajCWzNVGatfAoIPLptwIgHSYyKGMTELM@mysql.railway.internal:3306/railway
import 'dotenv/config';
import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// export const DB_URL = `mysql://root:ajCWzNVGatfAoIPLptwIgHSYyKGMTELM@${DB_HOST}:3306/railway`
/* export const pool     =createPool({
    host:'localhost'| DB_HOST,
    port:3306,
    user:'root',
    password:'ajCWzNVGatfAoIPLptwIgHSYyKGMTELM',
    database:'railway'
})
 */