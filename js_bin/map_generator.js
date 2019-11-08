
function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
            center: {
                  lat: -34.397,
                  lng: 150.644
            },
            zoom: 15
      });
}
lineArray=[];
function generatePath(debug = false) {
      console.log("GeneratePath\nDebug:\t"+debug+"\nSearch Criteria:\t"+document.getElementById("search_field").value);
      if (debug == false) {
            pathPoints = [];
            search = document.getElementById("search_field").value;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                        jsonObj = JSON.parse(this.responseText);
                        for (i in jsonObj) {
                              pathPoints.push({
                                    'lat': jsonObj[i].latitude,
                                    'lng': jsonObj[i].longitude
                              });
                              document.getElementById("results_table_body").innerHTML+="<tr><td>"+i+'</td>'+'<td> FEATURE NOT AVAILABLE</td><td>'+jsonObj[i].latitude+'</td><td>'+jsonObj[i].longitude+'</td><td>FEATURE NOT YET AVAILABLE</td></tr>'
                        }
                        console.log(pathPoints);
                        populateMap(pathPoints);
                  }
            };
            xhttp.open("POST", "http://54.175.22.220/cgi-bin/querypage.py", true);
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
      lineArray.push(newpath);
}
function getCenterOfMap(tag){
      console.log("getCenterOfMap\ntag:\t"+tag);
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
               jsonObj=JSON.parse(this.responseText);
               console.log(jsonObj.latitude,jsonObj.longitude)
               map.setCenter(new google.maps.LatLng(jsonObj.latitude,jsonObj.longitude));
          }
     };
     xhttp.open("POST", "http://54.175.22.220/cgi-bin/getIntLocation.py", true);
     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhttp.send("tag="+tag);
}
function clearPaths(){
      for (i=0; i<lineArray.length;i++){
            lineArray[i].setMap(null);
      }
}
