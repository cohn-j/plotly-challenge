function unpack(rows, index) {
 return rows.map(function(row) {
   return row[index];
 });
}
d3.json("../samples.json").then(function(data) {
    console.log(data);
    console.log(data.metadata[0].id)


	// create the drop down menu of cities
	var selector = d3.select("#selDataset")
		.selectAll("option")
		.data(data.names)
		.enter().append("option")
		.text(function(d) { return d; })
		.attr("value", function (d, i) {
			return i;
		});

    function tabulate(data, columns) {
        var table = d3.select("#sample-metadata").append("table"),
            thead = table.append("thead"),
            tbody = table.append("tbody");
        
            // append the header row
        thead.append("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text(function(column) { return column; });
        
            // create a row for each object in the data
        var rows = tbody.selectAll("tr")
            .data(data)
            .enter()
            .append("tr");
        
            // create a cell in each row for each column
        var cells = rows.selectAll("td")
            .data(function(row) {
                return columns.map(function(column) {
                    return {column: column, value: row[column]};
                    });
                })
            .enter()
            .append("td")
            .attr("style", "font-family: Courier") // sets the font style
                .html(function(d) { return d.value; });
            
            return table;
        }
        
        // render the table
        var peopleTable = tabulate(data.metadata, ["id", "ethnicitiy","gender","age","location","bbtype","wfreq"]);

       

})  
