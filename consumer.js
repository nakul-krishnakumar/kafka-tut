const { kafka } = require("./client");
const group = process.argv[2] || "user-1";

async function init() {
   const consumer = kafka.consumer({ groupId: group });
   
   try {
      console.log("Connecting Consumer...");
      await consumer.connect();
      console.log("Consumer Connected Succesfully");

      await consumer.subscribe({
         topics: ["rider-updates"],
         fromBeginning: true,
      })

      console.log("Consumming messages...");
      await consumer.run({
         eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`[${topic}]: PART:${partition}:`, message.value.toString());
         },
      });
   } catch (e) {
      console.log(`Error: ${e}`);
   }
}

init();