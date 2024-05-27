
// Warning! this code is very dirty because the developer was in a hurry.

const express = require('express') ;
require('dotenv').config();
const PORT = process.env.PORT || 3002 ;
const app = express() ;
const cors = require('cors');

const fs = require('fs');

const path = require('path');

const bodyParser = require('body-parser');

const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use('/api' , router);

router.get('/articles' , (request , response) => {

    const url = request.url ;

    let params_all = '' ;

    let params_array = [] ;

    let params_for_articles = [] ;
    
    if(url.match(/\?/i)) {

        params_all = url.split('?')[1] ;

        if(params_all.match(/&/i)) {

        }
        else {
            params_array = [params_all] ;
        }

        const article_filter = params_array.filter(elem => elem.match(/articles-filter/i));

        if(article_filter.length) {

            if(article_filter.length > 1) {

                params_for_articles = [] ;
                throw('errorrrrrrrrrrrrrrr');

            }
            else {

                let filter = article_filter[0] ;

                if(typeof filter  === 'string') {

                    filter = filter.split('=')[1];

                    if(typeof filter === 'string') {

                        if(filter.match(/__/)) {

                            const params = filter.split('__');

                            params_for_articles = params ;
                        }
                        else {

                            params_for_articles = [filter] ;

                        }
                    }
                    else {
                        params_for_articles = [] ;
                    }
                }
                else {

                    params_for_articles = [] ;
                    throw('no strreeeeengggg');
                }
            }
        }
        else {
            params_for_articles = [] ;
        }
    }
    else {
        params_for_articles = [] ;
    }

    const path1 = path.resolve('./articles_1.json') ;
    const path2 = path.resolve('./articles_2.json') ;

    let json_1 = fs.readFileSync(path1 , 'utf-8');
    let json_2 = fs.readFileSync(path2 , 'utf-8');
    
    const obj = JSON.parse(json_1);
    const obj2 = JSON.parse(json_2);

    console.log(typeof obj.pageProps.rubrics);
    
    let articles = obj.pageProps.articles ;
    let articles_2 = obj2.pageProps.articles ;

    if(params_for_articles.length) {

        articles = articles.filter(article => params_for_articles.find(elem => elem === article.rubricId)) ;
        articles_2 = articles_2.filter(article => params_for_articles.find(elem => elem === article.rubricId)) ;
        
    }
    
    obj.pageProps.articles = [...articles , ...articles_2] ;

    const s = JSON.stringify(obj)

    return response.status(200).json(/* json_1 */s);
});

app.listen(PORT , () => {
    console.log('server running on port ' + PORT);
});