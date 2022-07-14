//Cloud Functions
"use strict";
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors')({
  origin: true,
});

var db = admin.database();
var bryggref = db.ref("BryggListe/");
var topref = db.ref("TopListe/");
var stemref = db.ref("Stemmer/");

const GuleSider = [
["placer", -1],
["7Fjell", 0],
["7Fjell", 1],
["7Fjell", 2],
["7Fjell", 3],
["7Fjell", 4],

["Agir", 0],
["Agir", 1],
["Agir", 2],
["Agir", 3],
["Agir", 4],
["Agir", 5],
["Agir", 6],
["Agir", 7],



];

//Sort
exports.Sort = functions.https.onRequest((req, res) => {

	stemref.on("value", function(snapshot) {
	var stemlst = snapshot.val();
	var Counter = [];
	var x = 1;
	while (x < 130){
		Counter[x] = 0;
		x = x + 1;
	}
	for (var key in stemlst) {
		for (var i in stemlst[key]){
		if(!isNaN(Counter[i])){
		Counter[i] = parseInt(Counter[i]) + parseInt(stemlst[key][i]);
		}
		}
	}
	
	//sort, fixme?
	var toppbois = {};
	for(var a = 0; a < 10; a++){
		
	var Current = Counter[Counter.length-1];
	for(var z = Counter.length; z > 1; z--){
		console.log("sammenligner");
		console.log(Current + " " + Counter[z-1]);
	if(parseInt(Current) < parseInt(Counter[z-1])){
		console.log("ny current");
		Current = Counter[z-1];
	} 
		}
		console.log("setter toppbois");
		console.log(Counter.indexOf(Current));
	toppbois[a] = Counter.indexOf(Current);
	Counter[Counter.indexOf(Current)] = -1;
	}
	console.log(toppbois);
	
	
	return cors(req, res, () => {


	res.status(200).send();
});
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
	});


//Vote
exports.vote = functions.https.onRequest((req, res) => {
var Voteobj = JSON.parse(req.body);
if(isNaN(Voteobj.Kar)){
return cors(req, res, () => {	
	res.status(400).send();
});
}
if(Voteobj.Kar > 6){
return cors(req, res, () => {	
	res.status(400).send();
});}
if(Voteobj.Kar < 1){
return cors(req, res, () => {	
	res.status(400).send();
});}
if(isNaN(Voteobj.Brygg)){
return cors(req, res, () => {	
	res.status(400).send();
});}
if(isNaN(Voteobj.ID)){
return cors(req, res, () => {	
	res.status(400).send();
});}

console.log(Voteobj.ID);
console.log(Voteobj.Brygg);
console.log(Voteobj.Kar);
var Votev = {}
var ok = Voteobj.Brygg;
Votev.ok = Voteobj.Kar;
console.log(Votev);

db.ref("Stemmer/"+Voteobj.ID).update({
[Voteobj.Brygg] : Voteobj.Kar
});


	
return cors(req, res, () => {	
	res.status(200).send();
});


});

//top10
exports.top = functions.https.onRequest((req, res) => {
    SetTop()
	topref.on("value", function(snapshot) {
	
	return cors(req, res, () => {
		var toplst = snapshot.val();
	res.status(200).send(toplst);
});
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
	});
  
  
  //alle brygg
 exports.brygg = functions.https.onRequest((req, res) => {
	
	bryggref.on("value", function(snapshot) {
	
	return cors(req, res, () => {

		var brglst = snapshot.val();
	
	res.status(200).send(brglst);
});
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
});
  
  
  
	function SetTop(){ //toppbois
	bryggref.on("value", function(snapshot) {
	var brgs = snapshot.val();
	console.log(brgs[GuleSider[2][0]][GuleSider[2][1]]);
	
	topref(i).update(
brgs[GuleSider[2][0]][GuleSider[2][1]]
);
	
	
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
	}
	