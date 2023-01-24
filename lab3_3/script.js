// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = "pk.eyJ1IjoiZHMxMDI5NjU2NTAwIiwiYSI6ImNsY3E3MnB0bTAzNTgzcGxoMTBrOG41cGcifQ.vFOhkRkRSdzA71u3WoLWVg";



const map = new mapboxgl.Map({
  container: 'map', // container element id
   style: 'mapbox://styles/mapbox/light-v10',
  center: [-0.089932, 51.514442],
  zoom: 14
});

const data_url = "https://api.mapbox.com/datasets/v1/ds1029656500/clda9j00e0v3i27qhqhtvkz4r/features?access_token=pk.eyJ1IjoiZHMxMDI5NjU2NTAwIiwiYSI6ImNsY3E3MnB0bTAzNTgzcGxoMTBrOG41cGcifQ.vFOhkRkRSdzA71u3WoLWVg";






map.on('load', () => {
  map.addLayer({
    id: 'crimes',
    type: 'circle',
    source: {
      type: 'geojson',
      data: data_url 
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#eb4d4b',
      'circle-opacity': 0.9
    }
  });
  
  //Slider interaction code goes below
//Slider interaction code goes below
  
  document.getElementById('slider').addEventListener('input', (event) => {
//Get the month value from the slider
  const month = parseInt(event.target.value);

  // get the correct format for the data
  formatted_month = '2021-' + ("0" + month).slice(-2)
  //Create a filter
  filterType = ['!=', ['get', 'Crime type'], 'placeholder']
  filterMonth = ['==', ['get', 'Month'], formatted_month]

  //set the map filter
 map.setFilter('crimes', ['all', filterMonth, filterType]);

  // update text in the UI
  document.getElementById('active-month').innerText = month;
});
  //Radio button interaction code goes below

  
  
  
  
  
    //Radio button interaction code goes below
  document.getElementById('filters').addEventListener('change', (event) => {
  const type = event.target.value;
    console.log(type);
  // update the map filter
  if (type == 'all') {
    filterType = ['!=', ['get', 'Crime type'], 'placeholder'];
  } else if (type == 'shoplifting') {
    filterType = ['==', ['get', 'Crime type'], 'Robbery'];
  } else if (type == 'bike') {
    filterType = ['==', ['get', 'Crime type'], 'Bicycle theft'];
  } else {
    console.log('error');
  }
  map.setFilter('crimes', ['all', filterMonth, filterType]);
});


  });