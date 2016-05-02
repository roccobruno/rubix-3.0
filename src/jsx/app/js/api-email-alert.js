
var ajax = require("./ajax.js");

var EmailAlert = require("./emailAlert.js").EmailAlert;
var EmailAlertList = require("./emailAlert.js").EmailAlertList;


var EmailAlerts = function() {};

EmailAlerts.prototype.sendEmailAlert = function(emailalert,callbackSuccess,callbackFailed) {
    ajax.post("/api/bobbit",emailalert.toWireFormat(),callbackSuccess,callbackFailed);
};

EmailAlerts.prototype.deleteEmailAlert = function(emailalertId,callbackSuccess) {
    ajax.del("/api/bobbit/"+emailalertId,callbackSuccess);
};



EmailAlerts.prototype.findAll = function(callback) {
    ajax.get("/api/bobbit/", function (json) {
        callback(EmailAlertList.fromWireFormat(json));
    });

};

EmailAlerts.prototype.find = function(id,callback) {
    ajax.get("/api/emailalert/"+id, function (json) {
        callback(EmailAlert.fromWireFormat(json));
    });
};



module.exports = new EmailAlerts();
