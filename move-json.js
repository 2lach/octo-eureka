const { exec } = require('child_process');

function move(){ 
    exec('mv ./output.json ./frontend/src/data/', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      return;
    });
}

function curl(){ 
  exec(' curl http://localhost:8080', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log('doin a little curlin.')
    return;
  });
}




module.exports.move = move;
module.exports.curl = curl;