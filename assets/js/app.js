var a = d3.csv("D3data.csv", function(data){
    console.log(data);
});

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



census.forEach(function(data) {
  data.poverty = +data.poverty;
  data.obesity = +data.obesity;
});


var x = d3.scaleLinear()
  .domain(d3.extent(census, d => d.poverty))
  .range([0, width]);

var y = d3.scaleLinear()
  .domain([0, d3.max(census, d => d.obesity)])
  .range([height, 0]);


var bottomAxis = d3.axisBottom(x);
var leftAxis = d3.axisLeft(y);


chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

chartGroup.append("g")
  .call(leftAxis);


var Group = chartGroup.selectAll("Circle")
  .data(census)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.obesity))
  .attr("r", "15")
  .attr("fill", "blue")
  .attr("opacity", "0.5");

var Labels = chartGroup.selectAll(null).data(census).enter().append("text");

Labels
  .attr("x", function(b) {
    return xLinearScale(b.poverty);
  })
  .attr("y", function(b) {
    return yLinearScale(b.obesity);
  })
  .text(function(b) {
    return b.abbr;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "10px")
  .attr("text-anchor", "middle")
  .attr("fill", "white");


chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Obesity (%)");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("In Poverty (%)");
