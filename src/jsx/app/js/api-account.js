
var ajax = require("./ajax.js");

var Account = require("./account.js").Account;


var Account = function() {};

Account.prototype.sendAccount = function(account,callbackSuccess,callbackFailed) {
    ajax.post("/api/bobbit/account",account.toWireFormat(),callbackSuccess,callbackFailed);
};

Account.prototype.logout = function(callbackSuccess,callbackFailed) {
    ajax.post("/api/bobbit/logout","",callbackSuccess,callbackFailed);
};

Account.prototype.login = function(account,callbackSuccess,callbackFailed) {
    ajax.post("/api/bobbit/login",account.toLoginWireFormat(),callbackSuccess,callbackFailed);
};


module.exports = new Account();
