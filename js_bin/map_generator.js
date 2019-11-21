hostname=location.hostname
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
function generatePath(tag=null) {
      search='';
      console.log("GeneratePath\n\nSearch Criteria:\t"+document.getElementById("search_field").value);
      if (tag == null) {
            search = document.getElementById("search_field").value;
      }else{
            search = toString(tag);      
      }      
      pathPoints = [];
      document.getElementById("tagTable").innerHTML=search;      
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                  jsonObj = JSON.parse(this.responseText);
                  document.getElementById("results_table_body").innerHTML=""; //reset the table
                  for (i in jsonObj) { //populate the dictionary from the response json
                        pathPoints.push({
                              'lat': jsonObj[i].latitude,
                              'lng': jsonObj[i].longitude
                        }); //append it to the table at the bottom of the page
                        document.getElementById("results_table_body").innerHTML+="<tr><td>"+i+'</td>'+'<td> FEATURE NOT AVAILABLE</td><td>'+jsonObj[i].latitude+'</td><td>'+jsonObj[i].longitude+'</td><td>FEATURE NOT YET AVAILABLE</td></tr>'
                  }
                  console.log(pathPoints);
                  populateMap(pathPoints); //puts the points on the map
                  
            }
      };
      xhttp.open("POST", "http://"+hostname+"/cgi-bin/querypage.py", true);
      xhttp.send("tag=" + search);
      
}
/*=============================================================================================================================================
| Function:	foo
| Args:	bar
| returns:	none 
| description:	1
|=============================================================================================================================================*/

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
     xhttp.open("POST", "http://"+hostname+"/cgi-bin/getIntLocation.py", false);
     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhttp.send("tag="+tag);
}
function clearPaths(){
      for (i=0; i<lineArray.length;i++){
            lineArray[i].setMap(null);
      }
}
function getActiveTags(){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                  jsonObj=JSON.parse(this.responseText);
                  appendText=''
                  for (i in jsonObj.results){
                        tagline="<a class='dropdown-item' onclick='clearPaths();getCenterOfMap(\""+jsonObj.results[i]+"\");generatePath(\""+jsonObj.results[i]+"\");'>"+jsonObj.results[i]+"</a>";
                        appendText += tagline;
                  }
                  document.getElementById('tagDropdown').innerHTML=appendText;
                  console.log(document.getElementById('tagDropdown').innerHTML)
            } 
     };
     xhttp.open("POST", "http://"+hostname+"/cgi-bin/getActiveTags.py", true);
     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhttp.send();
}
