import { Component, OnInit ,Inject,ViewChild,ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


declare var d3:any;  //import * as d3 from '../../../node_modules/d3.v3/d3.v3.min.js';
@Component({
  selector: 'app-d3-dialog',
  templateUrl: './d3-dialog.component.html',
  styleUrls: ['./d3-dialog.component.css']
})
export class D3DialogComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  idService:number;
  idBuilding:number;
  nameService:string;
  dataEquip:any;
  widthModal:number;
  constructor(
    private dialogRef: MatDialogRef<D3DialogComponent>, //For close ,open dialog
              @Inject(MAT_DIALOG_DATA) private data, //For receive data from another component that dialog is opened
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.widthModal=1523;
    var treeData =this.changeDataToTreeData(JSON.parse(this.data.dataEquip));
    this.generate(treeData,this.data.nameService,this.widthModal);
  }
  changeDataToTreeData(data) {
    var dataMap = data.reduce(function (map, node) {
        map[node.name] = node;
        return map;
    }, {});

    var treeData = [];
    data.forEach(function (node) {
        // add to parent
        var parent = dataMap[node.parent];
        if (parent) {
            // create child array if it doesn't exist
            (parent.children || (parent.children = []))
             // add node to child array
             .push(node);
        } else {
            // parent is null or missing
            treeData.push(node);
        }
    });
    return treeData;
  }


  generate(treeData, nameofService, widthModal) {

        
    if (widthModal<=0)
        widthModal = 1523;
    // ************** Generate the tree diagram	 *****************
    var margin = { top: 20, right: 120, bottom: 20, left: 120 },
        width = widthModal - margin.right - margin.left,
        height = 200 - margin.top - margin.bottom;

    var i = 0,
        duration = 750,
        root;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.y, d.x]; });




    var svg = d3.select("#tree-diagram").append("svg")
        .attr("width", width +margin.right+margin.left)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
  .attr("class", "title")
  .text('Service Name : '+ nameofService);


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
        nodes.forEach(function (d) { d.y = d.depth * width / nodes.length; });
        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) { return d.id || (d.id = ++i); });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .on("click", click);

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeEnter.append("text")
            .attr("x", function (d) { return d.children || d._children ? -13 : 13; })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
            .text(function (d) { return d.name; })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 10)
            .style("fill", function (d) {
                if (d.alarm == "w") return "yellow";
                return d.alarm == "y" ? "red" : "#fff";
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = { x: source.x, y: source.y };
                return diagonal({ source: o, target: o });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Toggle children on click.
    function click(d) {
        if (d.alarm == "y"){
            d.alarm = "";
        }
        else {
            d.alarm = "y";
        }
        update(d);
    }
  }
}
