const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3003
const app = express();
const cors = require('cors');

const fs = require('fs');

const bodyParser = require('body-parser');

const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use('/api' , router);

router.get('/articles' , (request , response) => {

    const json = fs.readFileSync('./articles.json' , 'utf-8');

    
    return response.status(200).json(json);
});



app.listen(PORT , () => {
    console.log('server running on port ' + PORT);
});