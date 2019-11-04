search=document.getElementById("search_field").value
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
    }
};
xhttp.open("POST", "http://54.175.22.220/cgi-bin/queryPage.py", true);
xhttp.send("tag="+search);

function populateMap(){
    
}