function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
            center: {
                  lat: -34.397,
                  lng: 150.644
            },
            zoom: 8
      });
}

function generatePath(debug = false) {
      if (debug == false) {
            pathPoints = [];
            search = document.getElementById("search_field").value;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                        jsonObj = JSON.parse(this.responseText);
                        for (i in jsonObj) {
                              pathPoints.push({
                                    'lat': jsonObj[i].lat,
                                    'lng': jsonObj[i].lon
                              });
                        }
                        populateMap(pathPoints);
                  }
            };
            xhttp.open("POST", "http://54.175.22.220/cgi-bin/queryPage.py", true);
            xhttp.send("tag=" + search);
      } else {
            var pathPoints = [{
                        lat: 37.772,
                        lng: -122.214
                  },
                  {
                        lat: 21.291,
                        lng: -157.821
                  },
                  {
                        lat: -18.142,
                        lng: 178.431
                  },
                  {
                        lat: -27.467,
                        lng: 153.027
                  }
            ];
            populateMap(pathPoints);
      }
}

function populateMap(pathPoints) {
      var newpath = new google.maps.Polyline({
            path: pathPoints,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
      });

      newpath.setMap(map);
}
