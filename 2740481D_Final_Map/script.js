mapboxgl.accessToken = "pk.eyJ1IjoiZHMxMDI5NjU2NTAwIiwiYSI6ImNsY3E3MnB0bTAzNTgzcGxoMTBrOG41cGcifQ.vFOhkRkRSdzA71u3WoLWVg";

const style_All = "mapbox://styles/ds1029656500/cldg2iub0003t01lk412joke7";
const style_Fatal = "mapbox://styles/ds1029656500/cldk8l5ec002701rncc29tszv";
const style_Serious = "mapbox://styles/ds1029656500/cldk8pdyp002701pejgmd65x3";
const style_Slight = "mapbox://styles/ds1029656500/cldk8qspd001l01o5y63j3uow";






const map = new mapboxgl.Map({
  container: "map", // container ID
  style: style_All,
  center: [-4.2693404, 55.8611578],
  zoom: 11
});

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

//On click the radio button, toggle the style of the map.
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id == "style_All") {
      map.setStyle(style_All);
    }
    if (layer.target.id == "style_Fatal") {
      map.setStyle(style_Fatal);
    }
    if (layer.target.id == "style_Serious") {
      map.setStyle(style_Serious);
    }
    if (layer.target.id == "style_Slight") {
      map.setStyle(style_Slight);
    }
  };
}












//////////////////////Controler/////////////


const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Glasgow", // Placeholder text for the search bar
  proximity: {
    longitude: 55.8642,
    latitude: 4.2518
  } // Coordinates of Glasgow center
});







    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'top-right'
    );








map.addControl(geocoder, "top-right");

map.addControl(new mapboxgl.NavigationControl(), "top-right");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-right"
);


//add full screen
    map.addControl(new mapboxgl.FullscreenControl());



////////////////controler/////////////////









////////////////popup////////////////
map.on("click", (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["road-safety-glasgow-with-time (1)"] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
  const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>ACCIDENT INDEX: ${feature.properties.ACCIDENT_INDEX}</h3>
    <p>NUMBER OF CASUALTIES: ${feature.properties.NUMBER_OF_CASUALTIES}</p>
    <p>Speed Limit: ${feature.properties.SPEED_LIMIT}</p>
    <p>Time of Accident: ${feature.properties.Time_of_Accident}</p>`
    )
    .addTo(map);
});
////////////////////popup/////////////////////






////////////////////legend////////////////////////
map.on("load", () => {
  const layers = [
    "Fatal",
    "Serious",
    "Slight"
  ];
  const colors = [
    "#850a0a",
    "#d7771d",
    "#d3c6b1"
  ];

  // create legend
  const legend = document.getElementById("legend");

layers.forEach((layer, i) => {
  const color = colors[i];
  const item = document.createElement('div');
  const key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  const value = document.createElement('span');
  value.innerHTML = `${layer}`;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
     });
  });
///////////////////legend////////////////////////