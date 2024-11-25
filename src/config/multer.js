import  multer from 'multer'

import { extname, resolve} from 'node:path'

import { v4 } from 'uuid'

//******************************************************* */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
//****************************************************** */

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => callback(null, v4() + extname(file.originalname)),  
        
    }),
}

// return callback(null, v4() + extname(file.originalname)),