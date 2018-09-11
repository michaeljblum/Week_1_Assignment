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

    console.log(d3.extent(data, function(d) { return +d.estimate}))

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
                    .ticks(10, ",.1s")
                    // .tickValues([1625,11643298])
        
    var circles = svg.selectAll("circle")
                        .data(data)
                        .enter()
                        .append("circle")


    // var nestedData = d3.nest().key(d=>d.estimate).key(d=>d.country).entries(data)
    // console.log(nestedData)

    var colors = ["green", "orange", "red", "blue"]

    function randomColor() {
        return colors[Math.floor(Math.random() * colors.length)]
    }
    

    circles
        .attr("cx", function (d) { return xScale(+d.estimate) })
        // .attr("cx", function (d,i) { return i * 5})
        .attr("cy", function (d) { return yScale(+d.marginOfError) })
        // .attr("cy", function (d,i) { return (i * 4) - 25})
        .attr("r", function (d) { return aScale(+d.estimate) })
        .style("fill", randomColor)
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


})


