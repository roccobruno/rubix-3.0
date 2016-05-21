var _ = require("lodash");
var moment = require("moment");


var EmailAlert = function(){
}

var EmailAlert = function(id,nameFrom,emailFrom,nameTo,emailTo,tubeLines,recurring,hourStart,duration,enabled,creationTimestamp,alertName){
    this._nameFrom = nameFrom;
    this._emailFrom = emailFrom;
    this._nameTo = nameTo;
    this._emailTo = emailTo;
    this._tubeLines = tubeLines;
    this._id = id;
    this._recurring= recurring;
    this._hourStart =  hourStart;
    this._duration =  duration;
    this._enabled =  enabled;
    this._creationTimestamp =  creationTimestamp;
    this._alertName =  alertName;
};

EmailAlert.prototype.alertName = function(){
    return this._alertName;
};

EmailAlert.prototype.nameFrom = function(){
    return this._nameFrom;
};

EmailAlert.prototype.emailFrom = function(){
    return this._emailFrom;
};

EmailAlert.prototype.nameTo = function(){
    return this._nameTo;
};

EmailAlert.prototype.emailTo = function(){
    return this._emailTo;
};

EmailAlert.prototype.tubeLines = function(){
    return this._tubeLines;
};

EmailAlert.prototype.id = function(){
    return this._id;
};

EmailAlert.prototype.recurring = function(){
    return this._recurring;
};

EmailAlert.prototype.hourStart = function(){
    return this._hourStart;
};

EmailAlert.prototype.duration = function(){
    return this._duration;
};

EmailAlert.prototype.enabled = function(){
    return this._enabled;
};

EmailAlert.prototype.enabled = function(){
    return this._enabled;
};


EmailAlert.prototype.creationTimestamp = function () {
    return this._creationTimestamp;
};

EmailAlert.prototype.creationTimestampInFormat = function (format) {
    return moment.unix(this._creationTimestamp).format(format);
};



EmailAlert.prototype.addTubeLine = function(tubeLine) {
  if(_.isEmpty(this._tubeLines))
     this._tubeLines = []

  if(!_.isEmpty(tubeLine) && _.isEmpty(_.find(this._tubeLines,function(value){return value==tubeLine})))
  this._tubeLines.push(tubeLine);
}







EmailAlert.fromWireFormat = function(m) {
    return new EmailAlert(m.id,m.nameFrom,m.emailFrom,m.nameTo,m.emailTo,m.tubeLines,m.recurring,m.hourStart,
    m.duration,m.enabled,m.creationTimestamp,m.alertName);
};


EmailAlert.prototype.update = function(field, value) {

    if(field == 'alertName') {
        this._alertName = value;
    }

    if(field == 'nameFrom') {
        this._nameFrom = value;
    }
    if(field == 'emailFrom') {
        this._emailFrom = value;
    }

      if(field == 'nameTo') {
            this._nameTo = value;
        }
    
    if(field == 'emailTo') {
        this._emailTo = value;
    }
     if(field == 'tubeLine') {
            this.addTubeLine(value);
        }
         if(field == 'recurring') {
                this._recurring = value;
            }
    if(field == 'hourStart') {
        this._hourStart = value;
    }
    if(field == 'duration') {
        this._duration = value;
    }
    if(field == 'enabled') {
        this._enabled = value;
    }

};




EmailAlert.prototype.toWireFormat = function () {
    return {
       title: this._alertName,
       alert: {
            nameFrom: this._nameFrom,
       		from: {
       			value:this._emailFrom
       		},
       		nameTo: this._nameTo,
       		to: {
       			value: this._emailTo
       		}
       	},
       	journey: {
       		recurring: true,
       		meansOfTransportation: {
       			tubeLines:[{
                         				name: "northern",
                         				id: "northern"
                         			}],
       			trainService: []
       		},
       		startsAt: {
       			hour: _.toInteger(_.split(this._hourStart,":",2)[0]),
       			min:  _.toInteger(_.split(this._hourStart,":",2)[1])
       		},
       		durationInMin:  _.toInteger(this._duration)
       	},
       	active: getBool(this._enabled)
    };
};

function getBool(val) {
    return !!JSON.parse(String(val).toLowerCase());
}





var EmailAlertList = function(list) {
    this._emailAlerts = list;
};

EmailAlertList.prototype._emailAlerts = function() {
    return this._emailAlerts;
};

EmailAlertList.fromWireFormat = function (wireFormat) {
   
    return new EmailAlertList(_.map(wireFormat, EmailAlert.fromWireFormat));
};

EmailAlertList.fromWireFormatForSuggest = function (wireFormat) {
	   
    return new EmailAlertList(_.map(wireFormat, EmailAlert.fromWireFormatForSuggest));
};


module.exports.fromWireFormat = EmailAlert.fromWireFormat;
module.exports.EmailAlert = EmailAlert;
module.exports.EmailAlertList = EmailAlertList;

