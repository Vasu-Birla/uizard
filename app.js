import express from "express";
import * as path from 'path';
import * as url from 'url';
import cookie from 'cookie-parser';

import dotenv from 'dotenv' 
import connection from './config.js'

import http from 'http';

import AdminRouter from './routes/adminRoute.js'
import IndexRouter from './routes/IndexRoute.js';
dotenv.config({path:"./config.env"});
import cors from 'cors';

//---------------Import Section Finish ----------------

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const server = http.createServer(app);

const port = 3007;

//----------------------  global  Middleware start ----------------
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({limit: '50mb', extended: true })); 
app.use(express.static(path.join(__dirname,"public")));
app.use(cookie());

// Enable all CORS requests
app.use(cors());

app.use(async (req, res, next) => {

  const con = await connection();
  try {
      const [[user]] = await con.query('SELECT * FROM tbl_admin WHERE id = ?', [1]);
    app.locals.user = user;
    app.locals.host  =  process.env.Host;
   
    next();
  } catch (error) {
    console.error('Global Variables Error ->> :', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    con.release(); // Release the connection back to the pool
  }
  
});


app.use('/admin',AdminRouter)
app.use("/",IndexRouter);

//------------------   Middleware Section  End ---------------


//--------- View Engine for Express Framwork ------
app.set("view engine","ejs");
app.set("views", [
		path.join(__dirname,"./views"),
    path.join(__dirname,"./views/admin/")				
	]  );




//===========================  Devlepment Start ==================== 
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// initializeChatService(server);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
