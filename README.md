# sample-project

In this application, we are creating client(s) based on the user's input and that all clients sending data to the server based on user-provided input(seconds).

## server.js
In this file we are creating a http server and starting wensocket server.
The servier is running in port number 4000.

## client.js
In this file we are taking two input form user.
1. How many clients we want to create from this 1 Node client?
2. After how many seconds do you want to send data to the server?

Once user-provided both the input we are creating client(s) and that client(s) send data to the server in the given time interval.

## Installation

Use the node package manager [npm] to install sample-project.

```bash
npm install
```
#How to execute sample-project
Step-1: First need to start websocket server using following command
```bash
npm start
```
Step-2: Now need to start client using following command
```bash
node client.js
```
After starting the client,  answer the question(s), and based on the answer(s) the number of clients starts and interact with the server on the given second(s).

## License
[MIT](https://choosealicense.com/licenses/mit/)