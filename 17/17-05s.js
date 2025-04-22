const redis = require('redis');

const subscriber = redis.createClient({url:'redis://localhost:6379/'});

subscriber.on('ready',() => {console.log('Ready');});
subscriber.on('error',(err) => console.log('Error: ',err));
subscriber.on('connect',() => console.log('Connect'))
subscriber.on('end',() => console.log('End'));

async function main(){
    await subscriber.connect();

    await subscriber.subscribe('channel1', (message) => {
      console.log(`Message received: ${message}`);
    });

    subscriber.on('message', (channel, message) => {
      console.log(`Channel ${channel} sent message: ${message}`);
    });
}

main();