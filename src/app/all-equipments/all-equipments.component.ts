import { Component, OnInit } from '@angular/core';

declare var d3:any; 

@Component({
  selector: 'app-all-equipments',
  templateUrl: './all-equipments.component.html',
  styleUrls: ['./all-equipments.component.css']
})
export class AllEquipmentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.startDiagram();
  }
  startDiagram(){
    var treeData = [{"name": "Udonthani", "parent": "null", "children": [{"name": "Communication", "parent": "Udonthani", "children": [{"name": "Radio", "parent": "Communication", "_children": [{"name": "121.5", "parent": "Radio", "_children": [{"name": "Receiver", "parent": "121.5", "children": [{"name": "Main", "parent": "Receiver", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Receiver", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]},{"name": "Transmitter", "parent": "121.5", "children": [{"name": "Main", "parent": "Transmitter", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Transmitter", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]}]},{"name": "126.5", "parent": "Radio", "_children": [{"name": "Receiver", "parent": "126.5", "children": [{"name": "Main", "parent": "Receiver", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Receiver", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]},{"name": "Transmitter", "parent": "126.5", "children": [{"name": "Main", "parent": "Transmitter", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Transmitter", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]}]},{"name": "121.9", "parent": "Radio", "_children": [{"name": "Receiver", "parent": "121.9", "children": [{"name": "Main", "parent": "Receiver", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Receiver", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]},{"name": "Transmitter", "parent": "121.9", "children": [{"name": "Main", "parent": "Transmitter", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Transmitter", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]}]},{"name": "122.5", "parent": "Radio", "_children": [{"name": "Receiver", "parent": "122.5", "children": [{"name": "Main", "parent": "Receiver", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Receiver", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]},{"name": "Transmitter", "parent": "122.5", "children": [{"name": "Main", "parent": "Transmitter", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Transmitter", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]}]},{"name": "126.2", "parent": "Radio", "_children": [{"name": "Receiver", "parent": "126.2", "children": [{"name": "Main", "parent": "Receiver", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Receiver", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]},{"name": "Transmitter", "parent": "126.2", "children": [{"name": "Main", "parent": "Transmitter", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Transmitter", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]}]},{"name": "126.5", "parent": "Radio", "_children": [{"name": "Receiver", "parent": "126.5", "children": [{"name": "Main", "parent": "Receiver", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Receiver", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]},{"name": "Transmitter", "parent": "126.5", "children": [{"name": "Main", "parent": "Transmitter", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Transmitter", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]}]},{"name": "128.8", "parent": "Radio", "_children": [{"name": "Receiver", "parent": "128.8", "children": [{"name": "Main", "parent": "Receiver", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Receiver", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]},{"name": "Transmitter", "parent": "128.8", "children": [{"name": "Main", "parent": "Transmitter", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Transmitter", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]}]},{"name": "243.0", "parent": "Radio", "_children": [{"name": "Receiver", "parent": "243.0", "children": [{"name": "Main", "parent": "Receiver", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Receiver", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]},{"name": "Transmitter", "parent": "243.0", "children": [{"name": "Main", "parent": "Transmitter", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Transmitter", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]}]},{"name": "265.9", "parent": "Radio", "_children": [{"name": "Receiver", "parent": "265.9", "children": [{"name": "Main", "parent": "Receiver", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Receiver", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]},{"name": "Transmitter", "parent": "265.9", "children": [{"name": "Main", "parent": "Transmitter", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Transmitter", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]}]},{"name": "275.8", "parent": "Radio", "_children": [{"name": "Receiver", "parent": "275.8", "children": [{"name": "Main", "parent": "Receiver", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Receiver", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]},{"name": "Transmitter", "parent": "275.8", "children": [{"name": "Main", "parent": "Transmitter", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Transmitter", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]}]},{"name": "355.4", "parent": "Radio", "_children": [{"name": "Receiver", "parent": "355.4", "children": [{"name": "Main", "parent": "Receiver", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Receiver", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]},{"name": "Transmitter", "parent": "355.4", "children": [{"name": "Main", "parent": "Transmitter", "children": [{"name": "Main Unit", "parent": "Main", "children": ""},{"name": "VCCS", "parent": "Main", "children": ""},{"name": "Selector", "parent": "Main", "children": ""},{"name": "MUX", "parent": "Main", "children": ""},{"name": "Antenna", "parent": "Main", "children": ""}]},{"name": "Standby", "parent": "Transmitter", "children": [{"name": "Standby Unit", "parent": "Standby", "children": ""},{"name": "VCCS", "parent": "Standby", "children": ""},{"name": "Selector", "parent": "Standby", "children": ""},{"name": "MUX", "parent": "Standby", "children": ""},{"name": "Antenna", "parent": "Standby", "children": ""}]}]}]}]},{"name": "DVR", "parent": "Communication", "children": ""},{"name": "C-ATIS", "parent": "Communication", "children": ""}]},{"name": "Navigation", "parent": "Udonthani", "children": [{"name": "DVOR", "parent": "Navigation", "children": ""},{"name": "DME-DVOR", "parent": "Navigation", "children": ""},{"name": "Glide Slope", "parent": "Navigation", "children": ""},{"name": "LLZ", "parent": "Navigation", "children": ""},{"name": "DME-LLZ", "parent": "Navigation", "children": ""}]},{"name": "Surveillance", "parent": "Udonthani", "children": [{"name": "Radar", "parent": "Surveillance", "_children": [{"name": "Transmitter/Receiver", "parent": "Radar", "children": ""},{"name": "Antenna", "parent": "Radar", "children": ""},]},{"name": "TOPSKY Tower", "parent": "Surveillance", "_children": [{"name": "CPS", "parent": "TOPSKY", "children": ""},{"name": "SDP", "parent": "TOPSKY", "children": ""},{"name": "RPS", "parent": "TOPSKY", "children": ""},{"name": "CDP", "parent": "TOPSKY", "children": ""},{"name": "SUP", "parent": "TOPSKY", "children": ""},{"name": "LCL", "parent": "TOPSKY", "children": ""},{"name": "GND", "parent": "TOPSKY", "children": ""},{"name": "COR", "parent": "TOPSKY", "children": ""}]}]},{"name": "Network", "parent": "Udonthani", "children": [{"name": "Equipments", "parent": "Network", "_children": [{"name": "Satellite RF Terminal", "parent": "Equipments", "children": ""},{"name": "MF-TDMA Satellite Modem", "parent": "Equipments", "children": ""},{"name": "Wireless Link", "parent": "Equipments", "children": ""},{"name": "Multi Access Multiplexer", "parent": "Equipments", "children": ""},{"name": "Core Switch/Router", "parent": "Equipments", "children": ""},{"name": "Access Switch", "parent": "Equipments", "children": ""},{"name": "Firewall", "parent": "Equipments", "children": ""},{"name": "Server", "parent": "Equipments", "children": ""},{"name": "WLAN Controller", "parent": "Equipments", "children": ""},{"name": "WLAN Access Point", "parent": "Equipments", "children": ""},{"name": "UA Terminal", "parent": "Equipments", "children": ""},{"name": "Fibre Optic", "parent": "Equipments", "children": ""},{"name": "NTP", "parent": "Equipments", "children": ""},{"name": "AC / DC Power System", "parent": "Equipments", "children": ""}]}]}]}];










  
// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 1960 - margin.right - margin.left,
	height = 800 - margin.top - margin.bottom;
	
var i = 0,
	duration = 750,
	root;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("#all-Diagram").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
root.x0 = height / 2;
root.y0 = 0;
  
update(root);

d3.select(self.frameElement).style("height", "500px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click);

  nodeEnter.append("circle")
	  .attr("r", 1e-6)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
	  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 10)
	  .style("fill", function(d) { 
        if (d.alarm == "w") return "yellow";
        return d.alarm == "y" ? "red" : "#fff"; });

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  });

  // Transition links to their new position.
  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
	d._children = d.children;
	d.children = null;             
  } 
  else {
	d.children = d._children;
	d._children = null;
    
    if (d.children == null)
    {
      if (d.alarm == "y")
        d.alarm = "";                     
      else 
        d.alarm = "y";        
      
      var par = d.parent;              
      while (par != null)
      {
        var alarmfound = false;
        var warnfound = false;
        var normalfound = false;
        var mainstandby = false;
        for (var i = 0; i < par.children.length; i++)
        {
          if (par.children[i].alarm == "y")
            alarmfound = true;
          else if (par.children[i].alarm == "w")
            warnfound = true;
          else
            normalfound = true;
           
          if (par.children.length > 1 && (par.children[i].name == "Main" || par.children[i].name == "Standby"))
            mainstandby = true;
        }                    
        if (mainstandby)
        {
          if (alarmfound && normalfound) par.alarm = "w";
          else if (alarmfound) par.alarm = "y";
          else par.alarm = "";              
        }          
        else      
        {
          if (alarmfound) par.alarm = "y";
          else if (warnfound) par.alarm = "w";
          else par.alarm = "";
        }            
        update(par);
        par = par.parent;                        
      }                
    }    
  }  
  update(d);
}
  }

}
