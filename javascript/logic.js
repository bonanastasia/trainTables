    var config = {
    apiKey: "AIzaSyDyKo3FaRZY7CwFATik5LCsE63oA9Tdhuo",
    authDomain: "train-table-1718d.firebaseapp.com",
    databaseURL: "https://train-table-1718d.firebaseio.com",
    storageBucket: "train-table-1718d.appspot.com",
    messagingSenderId: "533379725216"
  };
  firebase.initializeApp(config);

  var database= firebase.database();

var trainName = "";
var destination = "";
var frequency = 0;
var nextTrain = "";
var minutesAway = 0;
var currentDate = moment().format('MM/DD/YY');


$("#submit").on("click", function(event){
  event.preventDefault();
 
  
// grab variable values from HTML inputs upon submit
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    
    frequency = $("#frequency").val().trim();
    //using moment to grab first train time and convert to unix
    firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").format("X");
  
  
// calculate next occurance of train based on the difference between current time and start time.
// Math.ceil used to round up to find next time train will come.
//  var difference= Math.ceil(parseInt(moment().diff(moment.unix(firstTrain, "X"), "minutes"))/frequency);

//  // take the calculation from previous variable, multiply by frequency to find next train time. 
//  var nextTrain= moment.unix(firstTrain, "X").add(difference*frequency, "minutes");

// // based off value from nextTrain, find minutes away by taking its time and subtracting the current time. 

// var minutesAway=moment(nextTrain).diff(moment(), "minutes")+1;





    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,  
        dateAdded: firebase.database.ServerValue.TIMESTAMP
});
  });


database.ref().on("child_added", function(Snapshot, prevChildKey) {
  // var totalBilled="";

  var trainName= Snapshot.val().trainName;
  var destination= Snapshot.val().destination;
  var frequency= Snapshot.val().frequency;
  var firstTrain= Snapshot.val().firstTrain;

  var difference= Math.ceil(parseInt(moment().diff(moment.unix(firstTrain, "X"), "minutes"))/frequency);

 // take the calculation from previous variable, multiply by frequency to find next train time. 
 var nextTrain= moment.unix(firstTrain, "X").add(difference*frequency, "minutes");

// based off value from nextTrain, find minutes away by taking its time and subtracting the current time. 

var minutesAway=moment(nextTrain).diff(moment(), "minutes")+1;

var prettyNextTrain=moment.unix(nextTrain).format("HH:mm");
console.log(prettyNextTrain);





$("#rows").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +  frequency + "</td><td>" + prettyNextTrain +"</td><td>" +  minutesAway + "</td></tr>");
});

