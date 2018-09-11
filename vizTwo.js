const height = 500,
    width = 700;

const svgTwo = d3.select("#vizTwo")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class","svgTwo")

// var format = d3.format(",d");

// var stratify = d3.stratify()
//     .parentId(function(d) { return d.country.substring(0, d.country.lastIndexOf(".")); })

// var pack = d3.pack()
//             .size([width - 2, height -2])
//             .padding(3)

d3.json("data.json", function(error, data) {
    if (error) throw error

    var depthScale = d3.scaleOrdinal()
            .range("blue","green","pink")

    var nestedData = d3.nest()
            .key(function(d) { return d.country})
            // .rollup(function(v){ return { 
            // total: d3.sum(v, function(d){ return d.estimate})};})
            .entries(data)

            console.log(nestedData)

    var packable = {id: "All Countries", values: nestedData}
    var packChart = d3.pack()

    packChart.size([width,height])

    console.log(packable)

    var root = d3.hierarchy(packable, function(d){ return d.values})
                .sum(d => d.estimate)

    console.log(packChart(root).descendants())

    var colors = ["green", "orange", "red", "blue"]

    function randomColor() {
        return colors[Math.floor(Math.random() * colors.length)]
    }

    svgTwo
                .append("g")
                //.attr("transform","translate(100,20)")
                    .selectAll("circle")
                    .data(packChart(root).descendants())
                    .enter()
                    .append("circle")
                    .attr("class","seeThrough")
                    .attr("r", function(d){ return d.r})
                    .attr("cx", function(d){ return d.x})
                    .attr("cy", function(d){ return d.y})
                    .style("fill", randomColor)
                    .on("mouseenter", function () {
                        d3.select(this).classed("hovering", true);
                    })
                    .on("mouseleave", function () {
                        d3.select(this).classed("hovering", false);
                    })
                    .append("title")
                    .text(function (d) {
                        return d.data.country});
                    
                

//     var root = stratify(data)
//     .sum(function(d) { return d.estimate; })
//     .sort(function(a, b) { return b.estimate - a.estimate; });

//     var node = svg.select("g")
//     .selectAll("g")
//     .data(root.descendants())
//     .enter().append("g")
//       .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
//       .attr("class", function(d) { return "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root"); })
//       .each(function(d) { d.node = this; })
//       .on("mouseover", hovered(true))
//       .on("mouseout", hovered(false));
    
//     // .sum(function(d) { return d.estimate}).sort(function(a,b) {return b.value - a.value})

//     // console.log(root)
     

})