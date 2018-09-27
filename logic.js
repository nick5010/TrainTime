// Initialize Firebase
var config = {
    apiKey: "AIzaSyAPvnkUQ_O8D5zDKptieVldqobkvs1Ixqk",
    authDomain: "fir-project-45232.firebaseapp.com",
    databaseURL: "https://fir-project-45232.firebaseio.com",
    projectId: "fir-project-45232",
    storageBucket: "fir-project-45232.appspot.com",
    messagingSenderId: "456913029353"
};
firebase.initializeApp(config);

var database = firebase.database();

$('#submit').on('click', function (event) {
    event.preventDefault();

    var tName = $('#train-name').val().trim();
    var dest = $('#destination').val().trim();
    var fTrain = $('#first-train').val().trim();
    var freq = $('#frequency').val().trim();

    var newTrain = {
        name: tName,
        destination: dest,
        firstTrain: fTrain,
        frequency: freq
    };
    database.ref().push(newTrain);

    $('#train-name').val('');
    $('#destination').val('');
    $('#first-train').val('');
    $('#frequency').val('');
});

database.ref().on('child_added', function (childSnap) {
    var tName = childSnap.val().name;
    var dest = childSnap.val().destination;

    //use these vars with moment
    var fTrain = childSnap.val().firstTrain;
    var freq = childSnap.val().frequency;

    var fTimeConverted = moment(fTrain, 'HH:mm').subtract(1, 'years');

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(fTimeConverted), 'minutes');
    console.log('diff in time ' +   diffTime);

    var remainder = diffTime % freq;
    console.log(remainder)

    var minutesTillTrain = freq - remainder;
    console.log('remainder is ' + (minutesTillTrain));

    var nextTrain = moment().add(minutesTillTrain, 'minutes');
    console.log('arrival time is ' + moment(nextTrain).format('hh:mm a'));

    var newRow = $('<tr>').append(
        $('<td>').text(tName),
        $('<td>').text(dest),
        $('<td>').text(moment(nextTrain).format('hh:mm a')),
        $('<td>').text(freq),
        $('<td>').text(minutesTillTrain)
    )

    $('#tBody').append(newRow);
});