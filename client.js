const WebSocketClient = require('websocket').client;
const inquirer = require('inquirer');

const questions = [
  {
    type: 'number',
    name: 'numberOfClient',
    message: "How many clients we want to create from this 1 Node client?"
  },
  {
    type: 'number',
    name: 'sendDataAfterSeconds',
    message: "After how many seconds do you want to send data to the server?"
  }
];

const client = [];
inquirer.prompt(questions).then(answers => {
    if (typeof answers['numberOfClient'] === 'number' && typeof answers['sendDataAfterSeconds'] === 'number') {
  for (let i=0; i < answers['numberOfClient']; i++) {
    client[i] = new WebSocketClient();
    client[i].on('connectFailed', function(error) {
        console.log(`Connect Error: ${error.toString()}`);
    });
    client[i].on('connect', function(connection) {
        connection.clientName = i+1;
        console.log('WebSocket Client Connected');
        connection.on('error', function(error) {
            console.log(`Connection Error: ${error.toString()}`);
        });
        connection.on('close', function() {
            console.log('test-protocol Connection Closed');
        });
        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                console.log(`Received data for client${connection.clientName}: ${message.utf8Data}`);
            }
        });
        
        function sendNumber() {
            if (connection.connected) {
                var number = Math.round(Math.random() * 0xFFFFFF);
                connection.sendUTF(number.toString());
                setTimeout(sendNumber, answers['sendDataAfterSeconds']*1000);
            }
        }
        sendNumber();
    });

    client[i].connect('ws://localhost:4000/', 'test-protocol');
  }
}
})
.catch((error) => {
if (error.isTtyError) {
    console.log("Prompt couldn't be rendered in the current environment");
} else {
    console.log('Something else went wrong:', error)
}
});;