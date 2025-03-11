# SWE1-Partner-MS
This program allows a user to generate new names for food items of their choice.

## Setup (javascript)
In a terminal, cd to your project directory and run these commands:
1) Initialize npm:
  ```
  npm init
  ```
2) Install Zeromq with node:
```
  npm i zeromq
  ```
3) And that's all!

## Start the Microservice
Create two new JS files, one for your client and one for your server. 

You can start these files in your terminal by using node. (e.g. ```node client.js``` and ```node server.js```)

## Requesting Data
1) Import zmq from the zeromq class
2) Create a socket variable and set it to a new zmq request instance 
3) Connect the client to the server by binding it with the same port. (I initialized it to port 5555.)
4) Send the user's inputted food item by using sock.send.

Javascript Example:

![image](https://github.com/user-attachments/assets/d88ab14a-1b0d-454c-aa59-bf73191ed9bb)


## Recieving Data
1) Import zmq from the zeromq class
4) Create a socket variable and set it to a new zmq reply instance 
2) Data can be recieved by using the `sock.receive();` command after message is sent.

Javascript Example:
```
 const sock = new zmq.Request();

 const [reply] = await sock.receive();
```


