const http = require('http');

const fs = require('fs');
const {resolve} = require('path');
const path = require('path');

const port = 3003 ;

const server = http.createServer((req , res) => {

    let chunk_id = 0 ;

    const audio_file_path = resolve('video_file_' + Date.now() + '.mp4') ;

    const wstream = fs.createWriteStream(audio_file_path) ;

    req.on('data' , (chunk) => {

        wstream.write(chunk);

        console.log(++chunk_id);
    }) ;

    req.on('end' , () => {

        console.log('done');

        res.end('done');
    }) ;

    req.on('error' , () => {
        console.log('err');
    });

});

server.listen(port , 'localhost' , () => {

    console.log('server running on port: ' + port);
});