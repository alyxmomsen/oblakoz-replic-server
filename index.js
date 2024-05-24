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

    const url = request.url ;

    let params_all = '' ;

    let params_array = [] ;

    let params_for_articles = [] ;
    
    if(url.match(/\?/i)) {

        params_all = url.split('?')[1] ;

        if(params_all.match(/&/i)) {
            console.log('&&&&&&&&');
            // params_array = params_all.split('&') ;
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
                            // console.log({params});

                            params_for_articles = params ;
                        }
                        else {
                            // console.log({filter});

                            params_for_articles = [filter] ;

                        }


                        // console.log('params_for_articles' , typeof params_for_articles , params_for_articles);
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

    // console.log({params}) ;

    let json_1 = fs.readFileSync('./articles_1.json' , 'utf-8');
    let json_2 = fs.readFileSync('./articles_2.json' , 'utf-8');
    
    const obj = JSON.parse(json_1);
    const obj2 = JSON.parse(json_2);

    console.log(typeof obj.pageProps.rubrics);
    
    let articles = obj.pageProps.articles ;
    let articles_2 = obj2.pageProps.articles ;


    // console.log(typeof articles , typeof articles_2);

    if(params_for_articles.length) {


        articles = articles.filter(article => params_for_articles.find(elem => elem === article.rubricId)) ;
        articles_2 = articles_2.filter(article => params_for_articles.find(elem => elem === article.rubricId)) ;
        
    
        // params_for_articles.forEach(the_param => articles);
        
        console.log('articles' , articles.length , articles_2.length);
    
        // articles = articles.filter(article => article.rubricId);
    }
    
    obj.pageProps.articles = [...articles , ...articles_2] ;
    // console.log('json' , typeof json , typeof obj , articles) ;

    const s = JSON.stringify(obj)

    return response.status(200).json(/* json_1 */s);
});

app.listen(PORT , () => {
    console.log('server running on port ' + PORT);
});