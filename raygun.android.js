var _ = require("lodash");
var utils = require("utils/utils");

var raygun = {}

var RaygunClient = main.java.com.mindscapehq.android.raygun4android.RaygunClient;
var RaygunUserInfo = main.java.com.mindscapehq.android.raygun4android.messages.RaygunUserInfo;

raygun.start = function(key) {
  RaygunClient.Init(utils.ad.getApplicationContext(), key);
  RaygunClient.AttachExceptionHandler();
};

raygun.identify = function(val) {
  if (_.isObject(val)) {
    var user = new RaygunUserInfo();
    user.Identifier = val.identifier;
    user.FullName = val.fullName;
    user.FirstName = val.firstName;
    user.IsAnonymous = val.isAnonymous ? true : false;
    RaygunClient.SetUser(user);
  } else {
    throw new Error("Parameter needs to be an object of user details, see the docs");
  }

};

raygun.send = function() {
  var error = arguments[0];
  
  if (arguments.length === 1) {
    RaygunClient.Send(error);
  } else if (arguments.length === 2) {
    RaygunClient.Send(error, arguments[1]);
  } else if (arguments.length >= 3) {
    RaygunClient.Send(error, arguments[1], arguments[2]);
  }
}

module.exports = raygun;
