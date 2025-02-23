import zmq from 'zeromq';
import { generateSlug, totalUniqueSlugs } from 'random-word-slugs';

async function runServer() {
    const sock = new zmq.Reply();
    await sock.bind("tcp://*:5555");
    console.log("Server is listening on port 5555...\n\n");

    let foodMessageName = null;

    const foodMenu = [
        "Zebra egg",
        "Australia egg",
        "King egg",
        "Pilot egg",
        "Flower egg",
        "Table egg",
        "Kangaroo egg",
        "Salesmen egg",
        "Zebra egg",
        "Hair egg",
        "Joystick egg",
        "Painting egg",
        "Crowd egg",
        "Engineer egg",
        "Airplane egg",
        "Ad egg",
        "Gigabyte egg",
        "Fish egg",
        "Salesclerk egg",
        "Library egg",
        "Bit egg",
        "School egg",
    ]

    for await (const [message] of sock) {
        const msg = message.toString();
        console.log(`Received request: ${msg}`);

        if (!foodMessageName) {

            // Save the first message in foodMessageName
            foodMessageName = msg;

        }

        if (msg.toLowerCase() === 'g') {
            let appendWord = null;
            let isUnique = false;

            while (!isUnique){
                // Generate a random word
                const randWord = generateSlug(1, { format: "title" });
                console.log(`\n\nGenerated word: ${randWord}\n`);
                appendWord = randWord + " " + foodMessageName;
                console.log(`New Generated Name: ${appendWord}\n\n`);

                // Check if the generated word is unique
                isUnique = !foodMenu.includes(appendWord);
            }
            
            await sock.send(`Server Generated Name: ${appendWord}`);
            
            

        } else if (msg.toLowerCase() === 'q') {

            // Signal to stop the server
            console.log("Server stopping...");
            break;

        } else {

            // Echo the received message
            await sock.send(`Received: ${msg}`);
        
        }
    }

    sock.close();
}

runServer();