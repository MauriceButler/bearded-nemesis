var http = require('http'),
    config = require('./config'),
    port = config.port || 8080,
    makeRequest = require('request'),
    server = http.createServer();

server.on('request', function(request, response){
    var targetUrl;

    if (request.method === 'GET') {
        targetUrl = config.installRegistry + request.url;
        console.log(request.method, targetUrl);
        request.pipe(makeRequest.get(targetUrl)).pipe(response);
    }

    if (request.method === 'PUT') {
        targetUrl = config.publishRegistry + request.url;
        console.log(request.method, targetUrl);
        request.pipe(makeRequest.put(targetUrl)).pipe(response);
    }

    if (request.method === 'DELETE') {
        targetUrl = config.publishRegistry + request.url;
        console.log(request.method, targetUrl);
        request.pipe(makeRequest.del(targetUrl)).pipe(response);
    }

});

server.listen(port, function(error){
    if(error){
        console.error(error);
        return process.exit(-1);
    }

    console.log('Listening on port: ' + port);
});
