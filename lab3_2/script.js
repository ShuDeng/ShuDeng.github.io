// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = "pk.eyJ1IjoiZHMxMDI5NjU2NTAwIiwiYSI6ImNsY3E3MnB0bTAzNTgzcGxoMTBrOG41cGcifQ.vFOhkRkRSdzA71u3WoLWVg";

const style_2019 = "mapbox://styles/ds1029656500/clda78x5p002d01k8hm7lfynn";
const style_2021 = "mapbox://styles/ds1029656500/clda7spz5000301nz438xq9tv";



const map = new mapboxgl.Map({
  container: "map", // container ID
  style: style_2019,
  center: [-0.089932, 51.514441],
  zoom: 14
});


const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

//On click the radio button, toggle the style of the map.
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id == "style_2019") {
      map.setStyle(style_2019);
    }
    if (layer.target.id == "style_2021") {
      map.setStyle(style_2021);
    }
  };
}