var socketio = require('socket.io');
var deviceListCtrl = require('../controllers/deviceListCtrl');
var callListCtrl = require('../controllers/callListCtrl');
var _ = require('underscore');

module.exports.listen = function(server){

    io = socketio.listen(server);

    //socket io code test purpose
    io.on('connection', function (socket) {
    //the server emits to device is connected with its socket id
    socket.emit('connected', { status: 'connected with Server', socketId: socket.id });

    //device replies with attaching socket id in its payload
    socket.on('payload', function(payload){

      console.log("IP: "+payload.IP+" (socket id: "+payload.SocketID+") Connected");

      //after getting payload need to update the payload in device table
      deviceListCtrl.updateDeviceSocketId(payload, function(err, updatedDevice){
      
      
          //device is created in server or already exists (socketid updated) 
          //now need to get the call status of the device from calls table 
          callListCtrl.getCallStatus(updatedDevice.IP, function(err, deviceStatus){
             socket.emit('deviceStatus', {'deviceStatus' : deviceStatus});
          });
        });
      });
    });

socket.on('Normal', function (payload, cb) {
    //console.log(payload);
    cb('confirmed Normal Call'); //cb means call back. this data is sent back to beaglebone
    
    callListCtrl.createCallsBBB(payload, function(err,result){

      //console.log('reply: '+result);
      if(result === 1){
        io.emit('Refresh Device Table', result);
      }
      
    });
});




    });
    //socket io connection of /users url
    // users = io.of('/users')
    // users.on('connection', function(socket){
    //     //socket.on ...
    // });






    return io;
}