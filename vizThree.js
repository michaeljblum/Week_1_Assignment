const ht = 500,
    wh = 700;

const svgThree = d3.select("#vizThree")
    .append("svg")
    .attr("width", wh)
    .attr("height", ht)
    .attr("class","svgThree")

d3.json("data.json", function(error, data) {
    if (error) throw error
    
    data.forEach(function(d) {
        d.estimate = +d.estimate
    })

    console.log(data)

    var x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([0,wh])
            .paddingInner(0.1)
            .paddingOuter(0.2)

    var y = d3.scaleLinear()
            .domain(d3.extent(data, function(d){ return d.estimate}))
            .range([ht, 0])

            var colors = ["green", "orange", "red", "blue","purple"]

            function randomColor() {
                return colors[Math.floor(Math.random() * colors.length)]
            }

    var rect = svgThree.selectAll("rect").data(data)

    rect
        .enter()
        .append("rect")
        .attr("x",function(d,i) { return x(i)})
        .attr("width", x.bandwidth())
        .attr("y", function(d) {return y(d.estimate)})
        .attr("fill", randomColor)
        .attr("height", function(d){ return ht - y(d.estimate)})
        .append("title")
                    .text(function (d) {
                        return d.country});

    // svg.append("g")
    //     .attr("class", "axis-y")
    //     .call(d3.axisLeft(y).ticks(6, "s"))
    //     .append("text")
    //     .attr("transform", "rotate(-90)")

    var leftAxis = d3.axisRight(y);
                
        svgThree.append("g")
        .attr("class", "y-axis")
        .attr("transform","translate("+ 0 +",0)")
        .call(leftAxis);
})