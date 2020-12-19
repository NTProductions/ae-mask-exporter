// mask/shape/anime exporter
"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(indent=gap="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if((rep=e)&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

var rememberFolder = File("~/Documents/maskRemember.mrf");

var window = new Window("palette", "Mask Exporter", undefined);
window.orientation = "column";

var panel = window.add("panel", undefined, "");
panel.orientation = "column";

var infoText = panel.add("statictext", undefined, "Select layer, name/location, and export");

var groupOne = panel.add("group", undefined, "groupOne");
groupOne.orientation = "row";
var nameText = groupOne.add("statictext", undefined, "Name:");
nameText.size = [50, 25];
var nameEditText = groupOne.add("edittext", undefined, "");
nameEditText.size = [160, 25];

var groupTwo = panel.add("group", undefined, "groupTwo");
groupTwo.orientation = "row";
var locationText = groupTwo.add("statictext", undefined, "Location:");
locationText.size = [50, 25];
var locationEditText = groupTwo.add("edittext", undefined, "");
locationEditText.size = [130, 25];
if(rememberFolder.exists) {
rememberFolder.open("r");
locationEditText.text = rememberFolder.read();
rememberFolder.close();
    }
var locationButton = groupTwo.add("button", undefined, "...");
locationButton.size = [25, 25];
locationButton.helpTip = "Change save path";

var exportButton = panel.add("button", undefined, "Export");

window.center();
window.show();

locationButton.onClick = function() {
    var thisPresetFolder = new Folder;
    thisPresetFolder = thisPresetFolder.selectDlg("Select your presets Folder");
    
    if(thisPresetFolder != null) {
        locationEditText.text = thisPresetFolder.fsName.replace(/%20/g, " ");
        rememberFolder.open("w");
        rememberFolder.write(locationEditText.text);
        rememberFolder.close();
        } else {
        locationEditText.text = "No folder selected!";
            }
    }

exportButton.onClick = function() {
        if(app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
            alert("Please select a composition");
            return false;
            }
        
        if(app.project.activeItem.selectedLayers.length != 1) {
            alert("Please select exactly 1 layer");
            return false;
            }
        
        if(!Folder(locationEditText.text).exists) {
                alert("Not a valid output Location");
                return false;
            }
        
        if(nameEditText.text == "") {
            alert("No name detected!");
            return false;
            }
        
        main(app.project.activeItem.selectedLayers[0], nameEditText.text, locationEditText.text);
    }

function main(layer, presetName, location) {
    
var thisShape;

var startString = 'var shape = {\r';
var nameString = '\tname: "'+presetName+'",\r';
var durationString = '\tduration: '+layer.outPoint+',\r';
var numMasksString = '\tnumMasks: '+layer.property("ADBE Mask Parade").numProperties+',\r';
var maskColoursString = '\tmaskColours: [';
var maskModesString = '\tmaskModes: [';
var pathStaticVerticesString = '\tpathStaticVertices: [';
var pathStaticInTangentsString = '\tpathStaticInTangents: [';
var pathStaticOutTangentsString = '\tpathStaticOutTangents: [';
var featherStaticValuesString = '\tfeatherStaticValues: [';
var opacityStaticValuesString = '\topacityStaticValues: [';
var expansionStaticValuesString = '\texpansionStaticValues: [';
var numPathKeysString = '\tnumPathKeys: [';
var numFeatherKeysString = '\tnumFeatherKeys: [';
var numOpacityKeysString = '\tnumOpacityKeys: [';
var numExpansionKeysString = '\tnumExpansionKeys: [';
var pathVerticesKeyedValuesString='\tpathVerticesKeyedValues: [';
var pathVerticesKeyedTimesString='\tpathVerticesKeyedTimes: [';
var pathInTangentsKeyedValuesString='\tpathInTangentsKeyedValues: [';
var pathInTangentsKeyedTimesString='\tpathInTangentsKeyedTimes: [';
var pathOutTangentsKeyedValuesString='\tpathOutTangentsKeyedValues: [';
var pathOutTangentsKeyedTimesString='\tpathOutTangentsKeyedTimes: [';
var featherKeyedValuesString='\tfeatherKeyedValues: [';
var featherKeyedTimesString='\tfeatherKeyedTimes: [';
var opacityKeyedValuesString='\topacityKeyedValues: [';
var opacityKeyedTimesString='\topacityKeyedTimes: [';
var expansionKeyedValuesString='\texpansionKeyedValues: [';
var expansionKeyedTimesString='\texpansionKeyedTimes: [';
var endString = '\r}'

// loop thru masks
for(var i = 1; i <= layer.property("ADBE Mask Parade").numProperties; i++) {
    if(i != layer.property("ADBE Mask Parade").numProperties) {
            maskColoursString+=JSON.stringify(layer.property("ADBE Mask Parade").property(i).color)+",";
            maskModesString+=layer.property("ADBE Mask Parade").property(i).maskMode+",";
            thisShape = layer.property("ADBE Mask Parade").property(i).property(1).value;
            pathStaticVerticesString+=JSON.stringify(thisShape.vertices)+",";
            pathStaticInTangentsString+=JSON.stringify(thisShape.inTangents)+",";
            pathStaticOutTangentsString+=JSON.stringify(thisShape.outTangents)+",";
            featherStaticValuesString+=layer.property("ADBE Mask Parade").property(i).property(2).value[0].toString()+",";
            opacityStaticValuesString+=layer.property("ADBE Mask Parade").property(i).property(3).value+",";
            expansionStaticValuesString+=layer.property("ADBE Mask Parade").property(i).property(4).value+",";
            
            // checking for path keys
            if(layer.property("ADBE Mask Parade").property(i).property(1).numKeys > 0) {
            numPathKeysString+=layer.property("ADBE Mask Parade").property(i).property(1).numKeys+",";
            pathVerticesKeyedValuesString+=getTheseVerticesValues(layer.property("ADBE Mask Parade").property(i).property(1))+",";
            pathVerticesKeyedTimesString+=getTheseVerticesTimes(layer.property("ADBE Mask Parade").property(i).property(1))+",";
            pathInTangentsKeyedValuesString+=getTheseInTangentsValues(layer.property("ADBE Mask Parade").property(i).property(1))+",";
            pathInTangentsKeyedTimesString+=getTheseInTangentsTimes(layer.property("ADBE Mask Parade").property(i).property(1))+",";
            pathOutTangentsKeyedValuesString+=getTheseOutTangentsValues(layer.property("ADBE Mask Parade").property(i).property(1))+",";
            pathOutTangentsKeyedTimesString+=getTheseOutTangentsTimes(layer.property("ADBE Mask Parade").property(i).property(1))+",";
                } else {
            numPathKeysString+="0,";
            pathVerticesKeyedValuesString+="[null],";
            pathVerticesKeyedTimesString+="[null],";
            pathInTangentsKeyedValuesString+="[null],";
            pathInTangentsKeyedTimesString+="[null],";
            pathOutTangentsKeyedValuesString+="[null],";
            pathOutTangentsKeyedTimesString+="[null],";
            }
        
            // checking for feather keys
            if(layer.property("ADBE Mask Parade").property(i).property(2).numKeys > 0) {
            numFeatherKeysString+=layer.property("ADBE Mask Parade").property(i).property(2).numKeys+",";
            featherKeyedValuesString+=getTheseKeyValues(layer.property("ADBE Mask Parade").property(i).property(2))+",";
            featherKeyedTimesString+=getTheseKeyTimes(layer.property("ADBE Mask Parade").property(i).property(2))+",";
                } else {
            numFeatherKeysString+="0,";
            featherKeyedValuesString+="[null],";
            featherKeyedTimesString+="[null],";
            }
        
            // checking for opacity keys
            if(layer.property("ADBE Mask Parade").property(i).property(3).numKeys > 0) {
            numOpacityKeysString+=layer.property("ADBE Mask Parade").property(i).property(3).numKeys+",";
            opacityKeyedValuesString+=getTheseKeyValues(layer.property("ADBE Mask Parade").property(i).property(3))+",";
            opacityKeyedTimesString+=getTheseKeyTimes(layer.property("ADBE Mask Parade").property(i).property(3))+",";
                } else {
            numOpacityKeysString+="0,";
            opacityKeyedValuesString+"[null],";
            opacityKeyedTimesString+="[null],";
            }
        
            // checking for expansion keys
            if(layer.property("ADBE Mask Parade").property(i).property(4).numKeys > 0) {
            numExpansionKeysString+=layer.property("ADBE Mask Parade").property(i).property(4).numKeys+",";
            expansionKeyedValuesString+=getTheseKeyValues(layer.property("ADBE Mask Parade").property(i).property(4))+",";
            expansionKeyedTimesString+=getTheseKeyTimes(layer.property("ADBE Mask Parade").property(i).property(4))+",";
                } else {
            numExpansionKeysString+="0,";
            expansionKeyedValuesString+="[null],";
            expansionKeyedTimesString+="[null],";
            }
        
             
        
            } else {
                // final instance doesnt need to add comma since it's the last element
              maskColoursString+=JSON.stringify(layer.property("ADBE Mask Parade").property(i).color);
            maskModesString+=layer.property("ADBE Mask Parade").property(i).maskMode;
            thisShape = layer.property("ADBE Mask Parade").property(i).property(1).value;
            pathStaticVerticesString+=JSON.stringify(thisShape.vertices);
            pathStaticInTangentsString+=JSON.stringify(thisShape.inTangents);
            pathStaticOutTangentsString+=JSON.stringify(thisShape.outTangents);
            featherStaticValuesString+=layer.property("ADBE Mask Parade").property(i).property(2).value[0].toString();
            opacityStaticValuesString+=layer.property("ADBE Mask Parade").property(i).property(3).value;
            expansionStaticValuesString+=layer.property("ADBE Mask Parade").property(i).property(4).value;
            
            // checking for path keys
            if(layer.property("ADBE Mask Parade").property(i).property(1).numKeys > 0) {
            numPathKeysString+=layer.property("ADBE Mask Parade").property(i).property(1).numKeys;
            pathVerticesKeyedValuesString+=getTheseVerticesValues(layer.property("ADBE Mask Parade").property(i).property(1));
            pathVerticesKeyedTimesString+=getTheseVerticesTimes(layer.property("ADBE Mask Parade").property(i).property(1));
            pathInTangentsKeyedValuesString+=getTheseInTangentsValues(layer.property("ADBE Mask Parade").property(i).property(1));
            pathInTangentsKeyedTimesString+=getTheseInTangentsTimes(layer.property("ADBE Mask Parade").property(i).property(1));
            pathOutTangentsKeyedValuesString+=getTheseOutTangentsValues(layer.property("ADBE Mask Parade").property(i).property(1));
            pathOutTangentsKeyedTimesString+=getTheseOutTangentsTimes(layer.property("ADBE Mask Parade").property(i).property(1));
                } else {
            numPathKeysString+="0";
            pathVerticesKeyedValuesString+="[null]";
            pathVerticesKeyedTimesString+="[null]";
            pathInTangentsKeyedValuesString+="[null]";
            pathInTangentsKeyedTimesString+="[null]";
            pathOutTangentsKeyedValuesString+="[null]";
            pathOutTangentsKeyedTimesString+="[null]";
            }
        
            // checking for feather keys
            if(layer.property("ADBE Mask Parade").property(i).property(2).numKeys > 0) {
            numFeatherKeysString+=layer.property("ADBE Mask Parade").property(i).property(2).numKeys;
            featherKeyedValuesString+=getTheseKeyValues(layer.property("ADBE Mask Parade").property(i).property(2));
            featherKeyedTimesString+=getTheseKeyTimes(layer.property("ADBE Mask Parade").property(i).property(2));
                } else {
            numFeatherKeysString+="0";
            featherKeyedValuesString+="[null]";
            featherKeyedTimesString+="[null]";
            }
        
            // checking for opacity keys
            if(layer.property("ADBE Mask Parade").property(i).property(3).numKeys > 0) {
            numOpacityKeysString+=layer.property("ADBE Mask Parade").property(i).property(3).numKeys;
            opacityKeyedValuesString+=getTheseKeyValues(layer.property("ADBE Mask Parade").property(i).property(3));
            opacityKeyedTimesString+=getTheseKeyTimes(layer.property("ADBE Mask Parade").property(i).property(3));
                } else {
            numOpacityKeysString+="0";
            opacityKeyedValuesString+"[null]";
            opacityKeyedTimesString+="[null]";
            }
        
            // checking for expansion keys
            if(layer.property("ADBE Mask Parade").property(i).property(4).numKeys > 0) {
            numExpansionKeysString+=layer.property("ADBE Mask Parade").property(i).property(4).numKeys;
            expansionKeyedValuesString+=getTheseKeyValues(layer.property("ADBE Mask Parade").property(i).property(4));
            expansionKeyedTimesString+=getTheseKeyTimes(layer.property("ADBE Mask Parade").property(i).property(4));
                } else {
            numExpansionKeysString+="0";
            expansionKeyedValuesString+="[null]";
            expansionKeyedTimesString+="[null]";
            }
        
                }
    }

maskColoursString+='],\r';
maskModesString+='],\r';
pathStaticVerticesString+='],\r';
pathStaticInTangentsString+='],\r';
pathStaticOutTangentsString+='],\r';
featherStaticValuesString+='],\r';
opacityStaticValuesString+='],\r';
expansionStaticValuesString+='],\r';
numPathKeysString+='],\r';
numFeatherKeysString+='],\r';
numOpacityKeysString+='],\r';
numExpansionKeysString+='],\r';
pathVerticesKeyedValuesString+='],\r';
pathVerticesKeyedTimesString+='],\r';
pathInTangentsKeyedValuesString+='],\r';
pathInTangentsKeyedTimesString+='],\r';
pathOutTangentsKeyedValuesString+='],\r';
pathOutTangentsKeyedTimesString+='],\r';
featherKeyedValuesString+='],\r';
featherKeyedTimesString+='],\r';
opacityKeyedValuesString+='],\r';
opacityKeyedTimesString+='],\r';
expansionKeyedValuesString+='],\r';
expansionKeyedTimesString+=']';

var totalString = startString + nameString + durationString + numMasksString + maskColoursString + maskModesString + pathStaticVerticesString + pathStaticInTangentsString + pathStaticOutTangentsString + featherStaticValuesString + opacityStaticValuesString + expansionStaticValuesString + numPathKeysString + numFeatherKeysString + numOpacityKeysString + numExpansionKeysString + pathVerticesKeyedValuesString + pathVerticesKeyedTimesString + pathInTangentsKeyedValuesString + pathInTangentsKeyedTimesString + pathOutTangentsKeyedValuesString + pathOutTangentsKeyedTimesString + featherKeyedValuesString + featherKeyedTimesString + opacityKeyedValuesString + opacityKeyedTimesString + expansionKeyedValuesString + expansionKeyedTimesString + endString;

var file = File(location+"/"+presetName+".jsx");
file.open("w");
file.write(totalString);
file.close();
//file.execute();
}

function getTheseVerticesValues(property) {
    var array = [];
    for(var a = 1; a <= property.numKeys; a++) {
        array.push(property.keyValue(a).vertices);
        }
    return JSON.stringify(array);
    }

function getTheseVerticesTimes(property) {
    var array = [];
    for(var a = 1; a <= property.numKeys; a++) {
        array.push(property.keyTime(a));
        }
    
    return JSON.stringify(array);
    }

function getTheseInTangentsValues(property) {
    var array = [];
    for(var a = 1; a <= property.numKeys; a++) {
        array.push(property.keyValue(a).inTangents);
        }
    
    return JSON.stringify(array);
    }

function getTheseInTangentsTimes(property) {
    var array = [];
    for(var a = 1; a <= property.numKeys; a++) {
        array.push(property.keyTime(a));
        }
    
    return JSON.stringify(array);
    }

function getTheseOutTangentsValues(property) {
    var array = [];
    for(var a = 1; a <= property.numKeys; a++) {
        array.push(property.keyValue(a).outTangents);
        }
    
    return JSON.stringify(array);
    }

function getTheseOutTangentsTimes(property) {
    var array = [];
    for(var a = 1; a <= property.numKeys; a++) {
        array.push(property.keyTime(a));
        }
    
    return JSON.stringify(array);
    }

function getTheseKeyValues(property) {
    var array = [];
    for(var a = 1; a <= property.numKeys; a++) {
        array.push(property.keyValue(a));
        }
    
    return JSON.stringify(array);
    }

function getTheseKeyTimes(property) {
    var array = [];
    for(var a = 1; a <= property.numKeys; a++) {
        array.push(property.keyTime(a));
        }
    
    return JSON.stringify(array);
    }