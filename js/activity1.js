
var width = 400,
    height = 400;

//var simulation ;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);


// Load data
d3.json("data/airports.json").then(function(data) {
  console.log(data);

  // i) INITIALIZE FORCE-LAYOUT AND DEFINE 'NODES' AND 'EDGES'
  var nodes = data.nodes;
  var edges = data.links;
  // var simulation = d3.forceSimulation()
  //   .force("link", d3.forceLink().distance(20));
  var simulation = d3.forceSimulation( nodes )
    .force('link', d3.forceLink( edges ));

  // ii) DRAW THE LINKS (SVG LINE)
// var link = svg.append("g")
//   .attr("class", "edges")
//   .selectAll("line")
//   .data(edges)
//   .enter()
//   .append("line")
//   .style("fill", "#3182bd")
//   .attr("x1", function(d) {
//     return 7 * d.source.latitude;
//   })
//   .attr("x2", function(d) {
//     return 7 * d.target.latitude;
//   })
//   .attr("y1", function(d) {
//     return 140 + d.source.longitude;
//   })
//   .attr("y2", function(d) {
//     return 140 + d.target.longitude;
//   })
//   .attr("stroke", "black")
//   .attr("stroke-width", 7)

//WE DONT SET X Y COORDINATES HERE
var link = svg.selectAll(".link")
        .data(data.links)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke", "grey");


// iii) DRAW THE NODES (SVG CIRCLE)
//WE DONT SET X Y COORDINATES HERE
  var node = svg.selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .style("fill", function(d) {
    if(d.country == "United States") {
      return "#3182bd";
    }
    return "#de2d26";
  })
  .attr("r", 6)
  //ADD SOMETHING CREATIVE HERE
  
  // iv) LISTEN TO THE 'TICK' EVENT AND UPDATE THE X/Y COORDINATES FOR ALL ELEMENTS
  simulation.on("tick", function() {
    console.log("HERE");

    // Update node coordinates
    node
        .attr("cx", d => 200 + d.x )
        .attr("cy", d => 200 + d.y );

    // Update edge coordinates
    link
        .attr("x1", d => 200+ d.source.x)
        .attr("y1", d => 200+ d.source.y)
        .attr("x2", d => 200+ d.target.x)
        .attr("y2", d => 200+ d.target.y)
});

node.call(d3.drag()
  .on("start", dragstart)
  .on("drag", drag)
  .on("end", dragend));

//TITLE IS WORKING I CAN SEE IT IN CONSOLE BUT WONT DISPLAY ON HOVER
  node.append("title")
    .text(function(d) { return d.name; });

function dragstart(d) {
  console.log("DRAGSTART");
  if (!d.active) simulation.alphaTarget(0.3).restart();
  d.subject.fx = 7 * d.subject.latitude;
  d.subject.fy = 140 + d.subject.longitude;
}

function drag(d) {
  console.log("DRAG");
  d.subject.fx = d.x;
  d.subject.fy = d.y;
}

function dragend(d) {
  console.log("DRAGEND");
  if (!d.active) simulation.alphaTarget(0);
  d.subject.fx = null;
  d.subject.fy = null;
}
})
