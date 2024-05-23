const express = require('express');

require('dotenv').config();

const PORT = process.env.PORT || 3003

const app = express();

const router = express.Router();

router.get('/' , () => {

});

app.use('/api' , router);

app.get('/' , (request , response) => {

    response.status(202).send('hello world');
});

app.listen(PORT , () => {
    console.log('server running on port ' + PORT);
});