var _ = require("lodash");

var raygun = {}

raygun.start = function(key) {
  Raygun.sharedReporterWithApiKey(key);
};

raygun.identify = function(val) {
  this._checkIfRunning();

  if (_.isObject(val)) {
    var userInfo = RaygunUserInfo.alloc().initWithIdentifierWithEmailWithFullNameWithFirstNameWithIsAnonymous(
      val.identifier || null, val.email || null, val.fullName || null, val.firstName || null, val.isAnonymous ? true : false
    );
    this._getReporter().identifyWithUserInfo(userInfo);
  } else {
    this._getReporter().identify(val);
  }
}

raygun.send = function() {
  var error = arguments[0];
  
  if (arguments.length === 1) {
    this._getReporter().send(error);
  } else if (arguments.length === 2) {
    this._getReporter().sendWithTags(error, arguments[1]);
  } else if (arguments.length >= 3) {
    this._getReporter().sendWithTagsWithUserCustomData(error, arguments[1], arguments[2]);
  }
}

raygun._checkIfRunning = function() {
  if (this._isRunning() === false) {
    throw new Error("The Raygun service is not running");
  }
};

raygun._isRunning = function() {
  return this._getReporter() !== null;
};

raygun._getReporter = function() {
  return Raygun.sharedReporter();
};

module.exports = raygun;
