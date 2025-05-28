const { kafka } = require('./client');
const readline = require("readline");

const rl = readline.createInterface({
   input:process.stdin,
   output:process.stdout
})

async function init() {
   const producer = kafka.producer();
   try {
      console.log("Producer connecting...");
      await producer.connect();
      console.log("Producer Connected Successfully");

      rl.setPrompt("> ");
      rl.prompt();

      rl.on("line", async function(line) {
         const [riderName, location] = line.split(" ");
         
         messages = [
            {
               partition: location.toLowerCase() === "north" ? 1 : 0,
               key: "location-update",
               value: JSON.stringify({
                  name: riderName,
                  loc: location.toUpperCase(),
               })
            }
         ];         

         await producer.send({
            topic: "rider-updates",
            messages: messages,
         });
         console.log("Send Message Successfully")
      }).on("close", async () => {
         console.log("Disconnecting Producer...");
         await producer.disconnect();   
      })
   } catch (e) {
      console.log("Error: ", e);
   }
}

init();