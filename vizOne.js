const h = 500,
    w = 700;

const svg = d3.select("#vizOne")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

    
d3.json("data.json", function(error, data) {
    if (error) throw error;

    rScale = d3.scaleLinear()
        .domain([1, d3.max(data, function(d){ return +d.estimate})])
        .range([2.5, 65]);

    yScale = d3.scaleLog()
        .domain(d3.extent(data, function(d){ return +d.marginOfError}))
        .range([h-10,80])

    xScale = d3.scaleLog()
        .domain(d3.extent(data, function(d){ return +d.estimate}))
        .range([10,w-80])

var circles = svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")



circles
    .attr("cx", function (d) { return xScale(+d.estimate) })
    .attr("cy", function (d) { return yScale(+d.marginOfError) })
    .attr("r", function (d) { return rScale(+d.estimate) })
    .style("fill", "green")
    .on("mouseenter", function () {
        d3.select(this).classed("hovering", true);
    })
    .on("mouseleave", function () {
        d3.select(this).classed("hovering", false);
    })
    .append("title")
    .text(function (d) {
        return d.country
    });
    




// var root = d3.stratify(data)


        // .sum(function(d) { return d.estimate })
        // .sort(function(a, b) { return b.value - a.value; });


//   var node = g.selectAll(".node")
//     .data(pack(root).descendants())
//     .enter().append("g")
//       .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
//       .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

//       console.log(root)

//   node.append("title")
//       .text(function(d) { return d.data.name + "\n" + format(d.value); });

//   node.append("circle")
//       .attr("r", function(d) { return d.r; });

//   node.filter(function(d) { return !d.children; }).append("text")
//       .attr("dy", "0.3em")
//       .text(function(d) { return d.data.name.substring(0, d.r / 3); });
});
