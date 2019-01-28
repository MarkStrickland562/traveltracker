// Business Logic for TravelLog ----
function TravelLog() {
  this.destinations = []
  this.currentId = 0 //each time a new TravelLog is created, it will have a currentId property that begins at 0
}

TravelLog.prototype.addDestination = function(destination) {
  destination.id = this.assignId();
  this.destinations.push(destination);
}

TravelLog.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

TravelLog.prototype.findDestination = function(id) {
  for (var i=0; i < this.destinations.length; i++) {
    if (this.destinations[i]) {
      if (this.destinations[i].id == id) {
        return this.destinations[i];
      }
    }
  };
  return false;
}

TravelLog.prototype.deletedDestination = function(id) {
  for (var i=0; i< this.destinations.length; i++) {
    if (this.destinations[i]) {
      if (this.destinations[i].id == id) {
        delete this.destinations[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for destinations ---


function destination(locationName, landmarks, timeOfYear, familyFriendly, petFriendly, notes) {
  this.locationName = locationName,
  this.landmarks = landmarks,
  this.timeOfYear = timeOfYear,
  this.familyFriendly = familyFriendly,
  this.petFriendly = petFriendly,
  this.notes = notes
}

//UI Logic -----
var TravelLog = new TravelLog();

function displayDestinationDetails(TravelLogToDisplay) {
  var destinationsList = $("ul#destinations");
  var htmlForDestinationInfo = "";
  TravelLogToDisplay.destinations.forEach(function(destination) {
    htmlForDestinationInfo += "<li id=" + destination.id + ">" + destination.locationName + "</li>";
  });
  destinationsList.html(htmlForDestinationInfo);
};

function showDestination(destinationId) {
  var destination = TravelLog.findDestination(destinationId);
  $("#show-destination").show();
  $(".location").html(destination.locationName);
  $(".landmarks").html(destination.landmarks);
  $(".timeOfYear").html(destination.timeOfYear);
  $(".familyFriendly").html(destination.familyFriendly);
  $(".petFriendly").html(destination.petFriendly);
  $(".notes").html(destination.notes);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + destination.id + ">Delete</button>");
}

function attachdestinationListeners() {

  $("ul#destinations").on("click", "li", function() {
    //console.log("The id of this <li> is " + this.id + ".");
    showDestination(this.id); //this refers to the li by a specific ID. Next pass the destination into showdestination function
  });
  $("#buttons").on("click", ".deleteButton", function () {
    TravelLog.deletedestination(this.id);
    $("#show-destination").hide();
    displaydestinationDetails(TravelLog);
  });

};

$(document).ready(function() {
  attachdestinationListeners ();
  $("form#new-log").submit(function(event) {
    event.preventDefault();
    var inputtedLocation = $("input#new-location").val();
    var inputtedLandmarks = $("input#new-landmarks").val();
    var inputtedTimeOfYear = $("input#new-timeofyear").val();
    var inputtedFamilyFriendly = $("input#new-familyfriendly").val();
    var inputtedPetFriendly = $("input#new-petfriendly").val();
    var inputtedNotes = $("input#new-notes").val();

    $("input#new-location").val("");
    $("input#new-landmarks").val("");
    $("input#new-timeofyear").val("");
    $("input#new-familyfriendly").val("");
    $("input#new-petfriendly").val("");
    $("input#new-notes").val("");

    var newdestination = new destination(inputtedLocation, inputtedLandmarks, inputtedTimeOfYear, inputtedFamilyFriendly, inputtedPetFriendly, inputtedNotes);
    TravelLog.addDestination(newdestination);
    //console.log(TravelLog.destinations);
    displayDestinationDetails(TravelLog); //replaces console.log above
  })
})
