import zmq from 'zeromq';
import readline from 'readline';

async function runClient() {
    const sock = new zmq.Request();

    console.log("Client attempting to connect to server...\n\n");
    sock.connect("tcp://localhost:5555");

    // Prompt the user to type in a food item
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter a food item: ", async (food_item) => {
        // Send the food_item to the server
        await sock.send(food_item);

        // Receive a reply
        const [reply] = await sock.receive();
        console.log(`Received reply from server: ${reply.toString()}`);

        // Prompt the user to generate a food name
        rl.question("Type 'G' to generate a food name: ", async (genMessage) => {
            if (genMessage.toLowerCase() === 'g') {
                await sock.send(genMessage);
                const [generated_word] = await sock.receive();
                console.log(`\n\n${generated_word.toString()}\n`);
            }

            // Signal the server to stop
            await sock.send("Q");
            rl.close();
        });
    });
}

runClient();