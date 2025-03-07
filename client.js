import zmq from 'zeromq';
import readline from 'readline';

async function runClient() {
    const sock = new zmq.Request();

    console.log("Client attempting to connect to server...\n\n");
    sock.connect("tcp://localhost:5555");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // Prompt the user to type in a food item
    rl.question("Enter a food item: ", async (food_item) => {
        // Send the food_item to the server
        await sock.send(food_item);

        // Receive a reply
        const [reply] = await sock.receive();
        console.log(`Received reply from server: ${reply.toString()}`);

        // Signal the server to stop
        await sock.send("q");
        rl.close();
    });
}

runClient();