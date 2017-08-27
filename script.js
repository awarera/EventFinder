//Viagogo Coding Challenge 
//Abdulrahman Abdullahi
//Generating random coordinates within the specified paramters (-10 to +10)
function coordinatesGen() {
    var coordinatesArray = [];
    for (var i = 0; i < 50; i++) {
        var randomLatitude = Math.floor(Math.random() * 21) - 10;
        var randomLongitude = Math.floor(Math.random() * 21) - 10;
        var coordinates = [randomLatitude, randomLongitude];
        if (!coordinatesArray.includes(coordinates)) {
            coordinatesArray.push(coordinates);
        }
    }
    return coordinatesArray;
}

//Generating random number of tickets & ticket prices
function ticketgen() {
    ticketsArray = [];
    var randomNumberOfTickets = Math.floor(Math.random() * 15);
    for (var o = 1; o < randomNumberOfTickets; o++) {
        var randomTicketPrice = Math.floor(Math.random() * 50);
        var ticketObj = {};
        ticketObj.ticketNumber = o;
        ticketObj.ticketPrice = randomTicketPrice + 1;
        ticketsArray.push(ticketObj);
    }
    return ticketsArray;
}

// Array containing a limited number of event objects (seed data)
var events = [];
var generatedCoordinates = coordinatesGen();
for (var g = 1; g < 40; g++) {
    events.push({
        eventIdentifier: g,
        eventCoordinates: generatedCoordinates[g],
        eventTickets: ticketgen()
    });
}


function searchEvents() {
    //User Input Validation
    var regex = /^[\-\+]?\d+$/;
    var latitude = prompt("Please enter your latitude:");
    while ((latitude > 10 || latitude < -10) || (regex.test(latitude) === false)) {
        latitude = prompt('Error, please enter a latitude between -10 and 10');
    }
    var longitude = prompt("Please enter your longitude:");
    while ((longitude > 10 || longitude < -10) || (regex.test(longitude) === false)) {
        longitude = prompt('Error, please enter a longitude between -10 and 10');
    }


    var userInput = [latitude, longitude];

    // Calcuating Manhattan distance between coordinates
    function calculateDistance(array1, array2) {
        return (array1[0] - array2[0]) + (array1[1] - array2[1]);
    }
    // Calcuating cheapest ticket
    function findTicket() {
        if (ticketgen().length > 0) {
            var result = ticketgen().map(function(a) {
                return a.ticketPrice;
            });
            if (isFinite(result)) {
                return "There are no tickets available";
            } else {
                var min = Math.min.apply(Math, result);
                return min;
            }
        } else {
            return "There are no tickets available";
        }
    }


    //Returning details about the five closest events
    var filteredEventsArray;
    var unfilteredEventsArray = [];

    function closestFiveEvents() {
        for (var c = 0; c < events.length; c++) {
            var sumOfDistance;
            var ticketsArray = events[c]["eventTickets"];
            var eventCoordinates = events[c]["eventCoordinates"];
            sumOfDistance = calculateDistance(eventCoordinates, userInput);
            unfilteredEventsArray.push({
                eventNumber: events[c]["eventIdentifier"],
                eventDistance: Math.abs(sumOfDistance),
                cheapestTicket: findTicket()
            });
        }
        unfilteredEventsArray.sort(function(a, b) {
            return parseFloat(a.eventDistance) - parseFloat(b.eventDistance);
        });
        filteredEventsArray = unfilteredEventsArray.slice(0, 5);
        return filteredEventsArray;
    }

    //Outputting search results to user
    function results() {
        var string = "Closest Events to: (" + longitude + "," + latitude + ") : \n \n";
        for (var p = 0; p < 5; p++) {
            var sort = (filteredEventsArray[p].cheapestTicket == "There are no tickets available") ? "Sold Out" :
                '$' + filteredEventsArray[p].cheapestTicket;
            string += "Event: " + filteredEventsArray[p].eventNumber +
                " - Cheapest Ticket: " + sort +
                " - Distance: " + filteredEventsArray[p].eventDistance + "\n";
        }

        alert(string);

    }
    closestFiveEvents();
    results();
}