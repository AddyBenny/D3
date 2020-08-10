// @TODO: YOUR CODE HERE!
var svgWidth = 900;
var svgHeight = 550;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

// create an SVG wrapper and append the SVG group that will hold the chart,
// and shift the latter by left and top manner 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("class", "chart")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// append an svg group   
var plotGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);




d3.csv('data.csv').then(function(metaData) {
    console.log(metaData)

    metaData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
    });

    var xScale = d3.scaleLinear()
        .domain([0, (metaData.length) / 2])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(metaData, d => d.smokes) + 5])
        .range([height, 0]);


    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = plotGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    plotGroup.append("g")
        .call(leftAxis);


    // var circleElements = plotGroup.selectAll(null).data(metaData).enter().append("text");


    plotGroup.append('g')
        .selectAll("dot")
        .data(metaData)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d.poverty); })
        .attr("cy", function(d) { return yLinearScale(d.smokes); })
        .attr("r", 10)
        .attr("opacity", ".7")
        .attr("fill", "green")

    plotGroup.append('text')
        .attr('x', 350)
        .attr('y', 500)
        .attr("font-weight", 500)
        .text('In Poverty Rate (%)');

    plotGroup.append('text')
        .attr('x', -300)
        .attr('y', -50)
        .attr("transform", "rotate(-90)")
        .attr("font-weight", 500)
        .text('Smokes (%)');

    var circleElements = plotGroup.selectAll(null).data(metaData).enter().append("text");

    circleElements
        .attr("x", function(d) { return xScale(d.poverty); })
        .attr("y", function(d) { return yLinearScale(d.smokes); })
        .text(function(d) { return d.abbr; })
        .attr("font-size", "9px")
        .attr("text-anchor", "middle")
        .attr("fill", "white");


});