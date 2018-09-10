const h = 500,
    w = 700;

const svg = d3.select("#vizOne")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

    
d3.json("data.json", function(error, data) {
    if (error) throw error

    // rScale = d3.scaleLinear()
    //     .domain([1, d3.max(data, function(d){ return +d.estimate})])
    //     .range([2.5, 65]);

    var aScale = d3.scaleSqrt()
                // .domain([0, d3.max(data, function(d){ return +d.estimate })])
                .domain(d3.extent(data, function(d){ return +d.estimate}))
                .range([2,25])

    var yScale = d3.scaleLog()
        .domain(d3.extent(data, function(d){ return +d.marginOfError}))
        .range([h-10,35])

    var xScale = d3.scaleLog()
        .domain(d3.extent(data, function(d){ return +d.estimate}))
        .range([10,w-35])
    
    var xAxis = d3.axisTop()
                    .scale(xScale)
                    .ticks(6)
        
var circles = svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")



circles
    .attr("cx", function (d) { return xScale(+d.estimate) })
    .attr("cy", function (d) { return yScale(+d.marginOfError) })
    .attr("r", function (d) { return aScale(+d.estimate) })
    .style("fill", "white")
    .on("mouseenter", function () {
        d3.select(this).classed("hovering", true);
    })
    .on("mouseleave", function () {
        d3.select(this).classed("hovering", false);
    })
    .append("title")
    .text(function (d) {
        return d.country});

    
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + (h-1) + ")")
        .call(xAxis)

    // svg.append("g")
    //     .call(d3.axisBottom()
    //     .scale(xScale))

})