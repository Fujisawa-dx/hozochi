var map = L.map('mapid', {
    center: [35.3387758,139.4887078],
    zoom: 13,
    minZoom: 13,
    maxZoom: 16
  });
  var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'この地図は参考です。近隣で工事予定がある場合は必ず郷土歴史課へご連絡ください© <a href="http://osm.org/copyright">OpenStreetMap</a> , <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  });
  tileLayer.addTo(map);

function modalClose(){
    const modal = document.getElementById("fullOverlay")
    modal.style.display = "none";
}

function addGeoJSONLayer(geojson){
    var geojsonLayer = L.geoJSON(geojson,{
        onEachFeature: function (feature, layer) {
            //簡素化
            layer.options.smoothFactor = 1.5;
        }
    });
    //GEOJSONレイヤーをオーバーレイレイヤーに追加
    map.addLayer(geojsonLayer);
};

function getJSON(jsonUrl) {
    fetch(jsonUrl, {
        method:"GET"
    })
    .then(function(response) {
        console.log("status=" + response.status); 
        return response.json();
    })
    .then(function(data) {
        addGeoJSONLayer(data);
    })
    .catch(function(err1) {
        console.log("err=" + err1);
    });
};

function dateUpdate(){
    fetch("date.text", {
        method:"GET"
    })
    .then(function(response) {
        console.log("status=" + response.status); 
        return response.text();
    })
    .then(function(data) {
        var elem = document.createElement("p");
        elem.innerHTML = data;
        document.getElementById("date").appendChild(elem);
    })
    .catch(function(err1) {
        console.log("err=" + err1);
    });
}

function buttonAble(){
    setTimeout('document.getElementById("okbutton").disabled = false;',3000);
}