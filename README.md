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

Javascript Example:

## Recieving Data
1) Import zmq from the zeromq class
2) Create a socket variable and set it to a new zmq reply instance 
3) Connect the server to the client by binding it with the same port. (I initialized it to port 5555.) Now the server is listening to incoming connections.
4) Create a for await... of loop to iterate over incoming messages from socket.


     a)  It waits for each message to arrive, processes it, and then waits for the next message, making sure that the server can handle multiple messages efficiently.
5) In the for await, create variable 'msg' that holds the string value sent from the client. The msg is then stored in another variable called 'foodMessageName' which is used in the future for concatinating the new food item name.

![image](https://github.com/user-attachments/assets/226deb9e-d16c-4d21-aac6-36f983e96c95)

