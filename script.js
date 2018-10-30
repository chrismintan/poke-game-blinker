mark1 = [];

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
  initAutocomplete1();
  initAutocomplete2();
  initAutocomplete3();
  initAutocomplete4();
  $("#calculate").click(calculate);
  $("#place1").click(place1);
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
function initAutocomplete1() {
  var input = document.getElementById('person1')
  var options = {
      componentRestrictions: {country: "sg"}
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();

      document.getElementById("lat1").value = lat;
      document.getElementById("long1").value = lng;
    });
}

function initAutocomplete2() {
  var input = document.getElementById('person2')
  var options = {
      componentRestrictions: {country: "sg"}
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();

      document.getElementById("lat2").value = lat;
      document.getElementById("long2").value = lng;
    });
}

function initAutocomplete3() {
  var input = document.getElementById('person3')
  var options = {
      componentRestrictions: {country: "sg"}
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();

      document.getElementById("lat3").value = lat;
      document.getElementById("long3").value = lng;
    });
}

function initAutocomplete4() {
  var input = document.getElementById('person4')
  var options = {
      componentRestrictions: {country: "sg"}
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();

      document.getElementById("lat4").value = lat;
      document.getElementById("long4").value = lng;
    });
}

function calculate() {
  let latTotal = 0;
  let longTotal = 0;
  let people = 0;
  for ( let i = 1; i < $('.address-input').length + 1; i++ ) {
    if ( document.getElementById('lat'+[i]).value != "" ) {
      latTotal = latTotal + parseFloat((document.getElementById('lat'+[i]).value));
      longTotal = longTotal + parseFloat((document.getElementById('long'+[i]).value));
      people = people + 1;
    }
  }
  $("#latMid").val(latTotal / people);
  $("#longMid").val(longTotal / people);
}

function place1() {
  let myLatLng = {lat: parseFloat($("#lat1").val()), lng: parseFloat($("#long1").val())};

  console.log(myLatLng)

  if ( mark1[0] != undefined ) {
    mark1[0].setMap(null);
  }

  mark1 = [];
    marker1 = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
    mark1.push(marker1)
}
