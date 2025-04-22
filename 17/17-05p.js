const redis = require('redis');

const publisher = redis.createClient({url:'redis://localhost:6379/'});

publisher.on('ready',() => {console.log('Ready');});
publisher.on('error',(err) => console.log('Error: ',err));
publisher.on('connect',() => console.log('Connect'))
publisher.on('end',() => console.log('End'));

(async () => {
  try {
    await publisher.connect();
    console.log('Publisher connected');
    
    setInterval(async () => {
      await publisher.publish('channel1', `Message ${(new Date()).toISOString()}`);
      console.log('Message published');
    }, 1000);

  } catch (err) {
    console.error('Publisher error:', err);
  }
})();