var https = require('https');
require('../Q.inc')(function(Q) {
	
	Q.plugins.Users.listen();
	Q.plugins.Streams.listen();
	
	// TODO: Make some classes in classes/Overlay and then require() them
	
	var server = Q.listen({
		'host': Q.Config.expect(['Q', 'node', 'host']),
		'port': Q.Config.expect(['Q', 'node', 'port'])
	});

	server.attached.express.use(function Overlay_request_handler(req, res, next) {
		var photoId = req.query.photoId;
		var accessToken = req.query.accessToken;
		if (photoId) {
			var proxyRequest = https.request({
				'host': 'graph.facebook.com',
				'port': 443,
				'path': '/'+photoId+"/picture?access_token="+encodeURIComponent(accessToken),
				'method': "GET"
			}, function(proxyResponse) {
				proxyResponse.on('data', function(chunk) {
					res.write(chunk, 'binary');
				});
				proxyResponse.on('end', function() {
					res.end();
				});
				res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
			});
			proxyRequest.on('error', function(e) {
				res.write('An error occured while processing request: ' + e.message);
				res.end();
			});

			proxyRequest.end();
			
		}
		return;
	});
	
});