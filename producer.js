const { kafka } = require('./client');

messages = [
   {
      partition: 0,
      key: "location-update",
      value: JSON.stringify({
         name: "Nakul Krishnakumar",
         loc: "SOUTH",
      })
   }
]

async function init() {
   const producer = kafka.producer();
   try {
      console.log("Producer connecting...");
      await producer.connect();
      console.log("Producer Connected Successfully");

      await producer.send({
         topic: "rider-updates",
         messages: messages,
      });
      console.log("Send Message Successfully")
   } catch (e) {
      console.log("Error: ", e);
   } finally {
      console.log("Disconnecting Producer...");
      await producer.disconnect();
   }
}

init();