import { Pool } from 'pg';
const PG_URI =
  'postgres://yesdegpu:BWMRizR4mfESMvmyWYK_aX__puJeTflC@drona.db.elephantsql.com/yesdegpu';

const pool = new Pool({
  connectionString: PG_URI,
});

/*
Created the schemas on elephantSQL browser

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username: VARCHAR(24) 
  password: VARCHAR(30) 
  pokemon VARCHAR(100),
  email VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE job_table (
 id SERIAL PRIMARY KEY,  
 company VARCHAR(255),
 position VARCHAR(255) NOT NULL
 user_id INTEGER REFERENCES users(id); 
 link TEXT NOT NULL,
 app_contact VARCHAR(100),
 double_down INTEGER REFERENCES double_down_table(id),
 cover_letter TEXT NOT NULL,
 status VARCHAR(500) NOT NULL, 
 date_submitted DATE DEFAULT CURRENT_DATE
)

CREATE TABLE double_down_table (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 message TEXT NOT NULL,
 date DATE DEFAULT CURRENT_DATE, 
 contact_info VARCHAR(500) NOT NULL,
 follow_up BOOLEAN DEFAULT FALSE ,
 follow_up_date DATE DEFAULT CURRENT_DATE + 4 NOT NULL
)

*/

export default {
  query: (text: string, params?:any, callback?:any):any => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
