var socketio = require('socket.io');
var deviceListCtrl = require('../controllers/deviceListCtrl');
var callListCtrl = require('../controllers/callListCtrl');
var _ = require('underscore');

module.exports.listen = function(server){

    io = socketio.listen(server);

    //socket io code test purpose
    io.on('connection', function (socket) {
    //console.log("User Connected");
    socket.emit('connected', { status: 'connected with Server', socketId: socket.id });



    socket.on('payload', function(payload){

      console.log("IP: "+payload.IP+" (socket id: "+payload.SocketID+") Connected");

      deviceListCtrl.updateDeviceSocketId(payload, function(err, updatedDevice){
        
        if (err) {
          // disconnect the device so that when it reconnects it gets its updated SocketID
          console.log(err);
          

        } else if (_.isEmpty(updatedDevice)) {
          // tell front-end a IP is calling but not available in database send();
          //console.log(device);
        } else {
          //means device exists in database so device status needs to be transmitted to BBB
          callListCtrl.getCallStatus(updatedDevice.IP, function(err, deviceStatus){
             socket.emit('deviceStatus', {'deviceStatus' : deviceStatus});
          });
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