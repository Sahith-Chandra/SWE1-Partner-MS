import zmq from 'zeromq';
import { generateSlug, totalUniqueSlugs } from 'random-word-slugs';

async function runServer() {
    const sock = new zmq.Reply();
    await sock.bind("tcp://*:5555");
    console.log("Server is listening on port 5555...\n\n");

    let prevRandWord = null;

    for await (const [message] of sock) {
        const msg = message.toString();
        console.log(`Received request: ${msg}`);

        if (msg !== 'q') {
            let appendWord = null;
            let isUnique = false;

            while (!isUnique){
                // Generate a random word
                const randWord = generateSlug(1, { format: "title" });
                console.log(`\n\nGenerated word: ${randWord}\n`);
                appendWord = randWord + " " + msg;
                console.log(`New Generated Name: ${appendWord}\n\n`);

                // Check if the generated word is unique
                isUnique = !(appendWord == prevRandWord);
                prevRandWord = appendWord;
            }
            
            await sock.send(`Server Generated Name: ${appendWord}`);
            
            

        } else if (msg === 'q') {

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