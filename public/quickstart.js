$(function() {
  App.VideoController.init();
});


var App = {
  videoClient: null,
  activeRoom: null,
  previewMedia: null,
  identity: null,
  roomName: 'Nearsoft',
};


App.VideoController = (function() {
  function init() {
    loadStyles({id: getUrlParameter('id')});
   
    $.getJSON('/token',{id: getUrlParameter('id')}, function (data) {
      if(data.identity!=null){
          App.identity = data.identity;
          App.videoClient = new Twilio.Video.Client(data.token);
          log("Joining to portal '" + App.roomName + "'...");
          App.videoClient.connect({ to: App.roomName}).then(_roomJoined)
          .catch(function(error) {
            log('Could not connect : ' + error.message);
          });
      }else{
        window.location.replace("wait.html");
      }
    });
  }

  return {
    init: init
  }
})();

function _roomJoined(room) {


  App.activeRoom = room;
  log("Joined as '" + App.identity + "");
  room.localParticipant.media.attach('#local-media');
 
  room.participants.forEach(function(participant) {
    log("Already in Room: '" + participant.identity + "");
    participant.media.attach('#remote-media');
  });

  room.on('participantConnected', function (participant) {
    log("Joining: '" + participant.identity + "");     
    participant.media.attach('#remote-media');
  });

  room.on('participantDisconnected', function (participant) {
    log("Participant '" + participant.identity + "' left the room");
    participant.media.detach();
    $.post('/refreshUsers', {participant : participant.identity});
  });

  room.on('disconnected', function () {
    log('Left');
    room.localParticipant.media.detach();
    room.participants.forEach(function(participant) {
      participant.media.detach();
    });
    App.activeRoom = null;
  });
}


function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function loadStyles(user){

  var link = document.createElement( "link" );
  link.href = location.pathname+user.id.toLowerCase()+ ".css";
  link.type = "text/css";
  link.rel = "stylesheet";
  link.media = "screen,print";

  document.getElementsByTagName( "head" )[0].appendChild( link );
}

function log(message) {
  console.log(message);
}
