mark = [];

const API_KEY = "AIzaSyCM3MixfBEjbgbPdvlSEu8kubULJuXv9bg";

// Initiates a map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 1.35721, lng: 103.8198}
  });
  var geocoder = new google.maps.Geocoder();

  $('#submit').click(function(){
    geocodeAddress(geocoder, map);
  });
  initAutocomplete();

  $("#place").click(place);
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('test').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {772
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// Inits the autocomplete functions
function initAutocomplete() {
  var input = document.getElementById('person')
  var options = {
      componentRestrictions: {country: "sg"}
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();

      document.getElementById("lat").value = lat;
      document.getElementById("long").value = lng;
    });
}

function place() {
  let myLatLng = {lat: parseFloat($("#lat").val()), lng: parseFloat($("#long").val())};

  if ( mark[0] != undefined ) {
    mark[0].setMap(null);
  }

  mark = [];
    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
    mark.push(marker)
}

var chrisHome = {lat: 1.321509, lng: 103.813669};

var imm = {lat: 1.3347838, lng: 103.74681009999995};

var nus = {lat: 1.2966426, lng: 103.77639390000002};

var sicc = {lat: 1.3419133, lng: 103.81121860000007};

var airport = {lat: 1.3644202, lng: 103.99153079999996};

var locations = [chrisHome, imm, nus, sicc, airport];

function marks() {
    for ( let i = 0; i < locations.length; i++ ) {
        marker = new google.maps.Marker({
            position: locations[i],
            map: map,
        })
    }
}

function markMid() {

    let totalLat = 0;
    let totalLon = 0;

    for ( let i = 0; i < locations.length; i++ ) {
        totalLat = totalLat + locations[i].lat
        totalLon = totalLon + locations[i].lng
    }

    let aveLat = totalLat / locations.length
    let aveLon = totalLon / locations.length

    console.log(aveLat, aveLon)

    let midPoint = {lat: aveLat, lng: aveLon};

    midMarker = new google.maps.Marker({
        position: midPoint,
        map: map,
        draggable: true
    })

    $("#dragLat").html(midMarker.position.lat())
    $("#dragLong").html(midMarker.position.lng())

    google.maps.event.addListener(midMarker, 'dragend', function(evt) {
        $("#dragLat").html(midMarker.position.lat())
        $("#dragLong").html(midMarker.position.lng())
    })

}

$("#marks").click(marks)
$("#mid").click(markMid)

// Search places
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY

function findPlaces() {

    let input = $("#places").val();

    let location = $("#dragLat").html() + "," + $("#dragLong").html();

    let ajaxCall = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=1500&keyword=${input}&key=${API_KEY}`

    let responseHandler = function() {
        responseObj = JSON.parse(this.responseText);
        console.log(responseObj)
    }

    let request = new XMLHttpRequest();

    request.addEventListener('load', responseHandler);

    request.open('GET', ajaxCall);

    request.send();
}





// function findPlaces() {

//     let input = $("#places").val();

//     let location = $("#dragLat").html() + "," + $("#dragLong").html();

//     $.ajax({
//         type: 'GET',
//         url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=1500&keyword=${input}&key=${API_KEY}`,
//         async: false,
//         jsonpCallback: 'jsonCallback',
//         contentType: "application/json",
//         dataType: 'jsonp',
//         success: function (data) {
//             responseObj = JSON.parse(this.responseText);
//             console.log(responseObj);
//         },
//         error: function (e) {
//             console.log(e.message);
//         }
//     });
// };

$("#list").click(findPlaces);



