var _ = require("lodash");
var moment = require("moment");

var Account = function(username,email,password, confirmPassword){
    this._username = username;
    this._username = username;
    this._password = password;
    this._confirmPassword = confirmPassword;
}

Account.prototype.username = function(){
    return this._username;
};

Account.prototype.email = function(){
    return this._email;
};

Account.prototype.password = function(){
    return this._password;
};

Account.prototype.confirmPassword = function(){
    return this._confirmPassword;
};

Account.prototype.update = function(field, value) {


    if(field == 'username') {
        this._username = value;
    }

    if(field == 'email') {
        this._email = value;
    }
    if(field == 'password') {
        this._password = value;
    }
      if(field == 'confirmPassword') {
            this._confirmPassword = value;
        }
}


Account.prototype.toWireFormat = function () {
    return {
       userName: this._username,
       email: { value: this._email},
       password: this._password,
       active:false,
       docType: "Account"

       }
}

Account.prototype.toLoginWireFormat = function () {
    return {
       username: this._username,
       password: this._password,
       docType: "Login"
       }
}

module.exports.toWireFormat = Account.toWireFormat;
module.exports.Account = Account;