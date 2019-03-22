require('./user.model');
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true
  };
  
  const dburl = 'mongodb://127.0.0.1:27017/srbank';
  //const dburl = 'mongodb://ds046549.mlab.com:46549/srbank';
  //const dburl='mongodb://trends121:trends121@ds139775.mlab.com:39775/trends';
  
  mongoose.connect(dburl,options);
  const connection = mongoose.connection;

    connection.once('open',()=>{
        console.log('mongoDB Connected with mongoose Successfully ..!');
    });
    connection.on('error',()=>{
        console.log('connection faild with mongoose ..!');
    });

    process.once('SIGUSR2', function() {
        gracefullShutdown(' nodemon restart', () => {
          process.kill(process.pid, 'SIGUSR2')
        });
      });
       //SIGINT is for terminating the process
       //The default behavior is to terminate the process, 
       //but it can be caught or ignored.it's for graceful shutdown(<Ctrl>+C)
      process.on('SIGINT', function() {
        gracefullShutdown(' App terminating signal (SIGINT) ', () => {
          process.exit(0);
        });
      });
      //The SIGTERM signal used to cause program termination.
      //this signal can be blocked, handled, and ignored.
      process.on('SIGTERM', function() {
        gracefullShutdown(' App terminating signal (SIGTERM)', () => {
          process.exit(0);
        });
      });
      
      function gracefullShutdown(message, callback) {
        mongoose.connection.close(function() {
          console.log("Mongooose is DisConnected with App Termination");
          console.log("Connection Intruption by" + message);
          callback();
        });
      }