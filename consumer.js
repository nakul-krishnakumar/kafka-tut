const { kafka } = require("./client");

async function init() {
   const consumer = kafka.consumer({ groupId: "user-1" });
   
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