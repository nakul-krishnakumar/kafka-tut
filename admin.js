const { kafka } = require("./client");

async function init() {
   const admin = kafka.admin();
   try {
      console.log("Admin connecting...");
      await admin.connect();
      console.log("Admin Connection Success...")
      
      console.log("Creating Topic [rider-updates]...")
      
      // First check if topic already exists
      const existingTopics = await admin.listTopics();
      if (existingTopics.includes('rider-updates')) {
         console.log("Topic [rider-updates] already exists");
         return;
      }
      
      const result = await admin.createTopics({
         topics: [{
            topic: 'rider-updates',
            numPartitions: 2,
         }]
      });
      
      if (result) {
         console.log("Topic Created Successfully [rider-updates]");
      } else {
         console.log("Topic creation failed [rider-updates]");
      }
   } catch (e) {
      console.log("Error ", e);
   } finally {
      console.log("Disconnecting Admin...")
      await admin.disconnect();
   }
}

init();