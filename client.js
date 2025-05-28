const { Kafka } = require("kafkajs");
require("dotenv").config();

const BROKER_ID = process.env.IP_ADDR + ":" + process.env.KAFKA_PORT

exports.kafka = new Kafka({
   clientId: "my-app",
   brokers: [BROKER_ID],
});
