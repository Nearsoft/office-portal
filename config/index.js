// Portal NS configuration

var host = process.env.PORTAL_NS_HOST || "http://localhost:5000";
var token = process.env.PORTAL_NS_TOKEN || "1B724F94C3EDC1DA6FD7294D1C611";

var config = {
  host: host,
  token: token
};

module.exports = config;
