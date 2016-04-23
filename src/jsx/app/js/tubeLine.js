var _ = require("lodash");
var moment = require("moment");


var TubeLineList = function() {
   this._list = []
   this._list.push(new TubeLine("central", "Central", "#dc241f"))
   this._list.push(new TubeLine("piccadilly", "Piccadilly", "#0019a8"))
   this._list.push(new TubeLine("tfl-rail", "Tfl Rail", "#0019a8"))
   this._list.push(new TubeLine("bakerloo", "Bakerloo", "#894e24"))
   this._list.push(new TubeLine("circle", "Circle", "#ffce00"))
   this._list.push(new TubeLine("district", "District", "#007229"))
   this._list.push(new TubeLine("hammersmith-city", "Hammersmith & City", "#d799af"))
   this._list.push(new TubeLine("jubilee", "Jubilee", "#6a7278"))
   this._list.push(new TubeLine("metropolitan", "Metropolitan", "#751056"))
   this._list.push(new TubeLine("northern", "Northern", "#000"))
   this._list.push(new TubeLine("victoria", "Victoria", "#00a0e2"))
   this._list.push(new TubeLine("waterloo-city", "Waterloo & City", "#76d0bd"))
   this._list.push(new TubeLine("london-overground", "London Overground", "#e86a10"))
   this._list.push(new TubeLine("dlr", "Dlr", "#00afad"))

};

TubeLineList.prototype.list = function(){
  return this._list;
};

TubeLineList.findById = function(id) {

  console.log("id-"+_.toString(id))
  var ele = _.find(new TubeLineList().list(), function(line) {
     return line.id() == id
  })

  if(_.isEmpty(ele))
    return new TubeLine("error","error no line found for ".concat(id),"")
    else
    return ele
};


var TubeLine = function(){
};

var TubeLine = function(id,displayName,color){
    this._displayName = displayName;
    this._color = color;
    this._id = id;
};

TubeLine.prototype.displayName = function(){
    return this._displayName;
};

TubeLine.prototype.color = function(){
    return this._color;
};


TubeLine.prototype.id = function(){
    return this._id;
};




module.exports.findById = TubeLineList.findById;
module.exports.TubeLine = TubeLine;
module.exports.TubeLineList = TubeLineList;

