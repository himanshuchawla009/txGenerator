const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

module.exports.uploadDoc = async (req) => {
  return new Promise((resolve,reject)=>{
      console.log(req.file.buffer,"filess")
      try {
        if (!req.file.buffer) {
            let result =  {
              status: 400,
              success: false,
              message: "Please send a valid file"
            };
            resolve(result)
          } else {
            
            ipfs.add(req.file.buffer, (err, resd) => {
              if (err) {
                let result = {
                  status: 200,
                  success: false,
                  message: err.message
                };
                resolve(result)
              } else {
                let result = {
                  status: 200,
                  success: true,
                  message: "Successfully upload your document to ipfs",
                  data: `https://ipfs.infura.io/ipfs/${resd[0].hash}`
                };
                resolve(result)
              }
            });
          }
        
      } catch (error) {
          reject(error)
      }
   
  })
};
