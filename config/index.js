// Portal NS configuration
var port = process.env.PORT || 5000;
var host = process.env.PORTAL_NS_HOST || "http://localhost:"+port;
var token = process.env.PORTAL_NS_TOKEN || "1B724F94C3EDC1DA6FD7294D1C611";
var room = process.env.PORTAL_DEFAULT_ROOM || 'portal';

var config = {
  host: host,
  token: token,
  port: port,
  room: room
};
console.log(config);

module.exports = config;
