const WebSocketServer = require('websocket').server;
const http = require('http');

const clients = [];
const server = http.createServer(function(request, response) {
    console.log(`Received request for ${request.url}`);
    response.writeHead(404);
    response.end();
});

server.listen(4000, function() {
    console.log('Server is listening on port 4000');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log(`Connection from origin ${request.origin} rejected.`);
      return;
    }
    
    try {
        const connection = request.accept('test-protocol', request.origin);
        clients.push(connection);
        connection.clientNumber = clients.length;
        console.log(`New client client${connection.clientNumber} added`);
        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                console.log(`Received Message from client${connection.clientNumber}: ${message.utf8Data}`);
                connection.sendUTF(message.utf8Data);
            }
            else if (message.type === 'binary') {
                console.log(`Received Binary Message of ${message.binaryData.length} bytes`);
                connection.sendBytes(message.binaryData);
            }
        });
        connection.on('close', function(reasonCode, description) {
            clients.pop();
            console.log(`Peer ${connection.clientNumber} disconnected. `);
        });
    } catch (e) {
        console.log('Error occured during client connection:', e);
    }
});