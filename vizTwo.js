const height = 500,
    width = 700;

const svgTwo = d3.select("#vizTwo")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

// var format = d3.format(",d");

// var stratify = d3.stratify()
//     .parentId(function(d) { return d.country.substring(0, d.country.lastIndexOf(".")); })

// var pack = d3.pack()
//             .size([width - 2, height -2])
//             .padding(3)

d3.json("data.json", function(error, data) {
    if (error) throw error

    var depthScale = d3.scaleOrdinal()
            .range("blue","purple","white","#pink")

    var nestedData = d3.nest()
            .key(function(d) { return d.country})
            // .rollup(function(v){ return { 
            // total: d3.sum(v, function(d){ return d.estimate})};})
            .entries(data)

            // console.log(nestedData)

    var packable = {id: "All Countries", values: nestedData}
    var packChart = d3.pack()

    packChart.size([width,height])

    var root = d3.hierarchy(packable, function(d){ return d.values})
                .sum(d => d.estimate)
                // .sum(function(d) {console.log(d.value.total)})

    // console.log(packChart(root).descendants())

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
                    .style("fill",d=> depthScale(d.depth))
                    
                

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