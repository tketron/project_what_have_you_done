var request = require('request');

var sunlight_requester = {
  sendRequest: function(params, parseJSON) {
    return new Promise(function(resolve, reject) {
      request(params.url, function(error, response, body) {
        if (!error & response.statusCode == 200) {
          resolve(parseJSON(JSON.parse(body).results, params));
        } else {
          reject(Error("Unable to access Sunlight API"));
        }
      });
    });
  }
}

module.exports = sunlight_requester;
