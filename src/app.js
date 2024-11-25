//const express = require('express')
import express from 'express'
//const routes = require('./routes')
import routes from './routes.js'

import { resolve } from 'node:path'

import cors from 'cors';

import './database/index.js'
//import './database'

//******************************************************* */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
//****************************************************** */

class App{
    constructor(){
        this.app = express();

        this.app.use(cors());

        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(express.json())
        this.app.use('/product-file', express.static(resolve(__dirname,'..','uploads')),  
    );
        this.app.use('/category-file', express.static(resolve(__dirname,'..','uploads')),  
);
    }

    routes(){
        this.app.use(routes)
    }
}

//module.exports = new App().app
export default new App().app
