var svg = d3.select("#map-area").append("svg")
    .attr("width", 1000)
    .attr("height", 600);


var projection = d3.mercator()
    .translate([1000 / 2, 600 / 2]);


var path = d3.geoPath()
    .projection(projection);

// Load shapes of U.S. counties (TopoJSON)
d3.json("data/world-110m.json")
    .then(function(data) {
      console.log(data);
// Convert TopoJSON to GeoJSON (target object = 'states')
// var usa = topojson.feature(data, data.objects.states).features
//
// // Render the U.S. by using the path generator
// svg.selectAll("path")
//     .data(usa)
//     .enter().append("path")
//     .attr("d", path);
});
