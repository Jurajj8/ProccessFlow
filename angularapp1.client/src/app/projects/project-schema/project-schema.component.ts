import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as go from 'gojs';
import { AssemblyLineService } from '../../services/assembly-line.service';
import { Diagram } from 'gojs';

@Component({
  selector: 'app-project-schema',
  templateUrl: './project-schema.component.html',
  styleUrls: ['./project-schema.component.css']
})
export class ProjectSchemaComponent implements AfterViewInit, OnInit {
  private diagram: go.Diagram = new Diagram;

  constructor(private assemblyLineService: AssemblyLineService) { }

  ngOnInit() {
    this.assemblyLineService.getAssemblyLines().subscribe(data => {
      console.log('Data received:', data);
      const transformedData = this.transformData(data);
      this.updateDiagram(transformedData);
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  ngAfterViewInit() {
    const $ = go.GraphObject.make;

    this.diagram = $(go.Diagram, 'myDiagramDiv', {
      'undoManager.isEnabled': true,
    });

    this.diagram.nodeTemplate =
      $(go.Node, 'Auto',
        $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 },
          new go.Binding('fill', 'color')),
        $(go.TextBlock, { margin: 8 },
          new go.Binding('text', 'name')),
        $(go.Panel, 'Spot',
          $(go.Shape, 'Circle', {
            portId: 'T', fromSpot: go.Spot.Top, toSpot: go.Spot.Top,
            fromLinkable: true, toLinkable: true, cursor: 'pointer',
            fill: 'transparent', stroke: null, desiredSize: new go.Size(8, 8)
          }),
          $(go.Shape, 'Circle', {
            portId: 'B', fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom,
            fromLinkable: true, toLinkable: true, cursor: 'pointer',
            fill: 'transparent', stroke: null, desiredSize: new go.Size(8, 8)
          }),
          $(go.Shape, 'Circle', {
            portId: 'L', fromSpot: go.Spot.Left, toSpot: go.Spot.Left,
            fromLinkable: true, toLinkable: true, cursor: 'pointer',
            fill: 'transparent', stroke: null, desiredSize: new go.Size(8, 8)
          }),
          $(go.Shape, 'Circle', {
            portId: 'R', fromSpot: go.Spot.Right, toSpot: go.Spot.Right,
            fromLinkable: true, toLinkable: true, cursor: 'pointer',
            fill: 'transparent', stroke: null, desiredSize: new go.Size(8, 8)
          })
        )
      );

    this.diagram.linkTemplate =
      $(go.Link, {
        relinkableFrom: true,
        relinkableTo: true,
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 5,
        toShortLength: 4
      },
        $(go.Shape),
        $(go.Shape, { toArrow: 'Standard' })
      );
  }

  transformData(data: any) {
    const nodes = data.map((item: any) => ({
      key: item.lineID,
      name: item.name,
      color: 'lightblue' 
    }));

    const links = nodes.map((node: any, index: number) => {
      if (index < nodes.length - 1) {
        return { from: node.key, to: nodes[index + 1].key };
      }
      return null;
    }).filter((link: { from: number, to: number } | null): link is { from: number, to: number } => link !== null);

    return { nodes, links };
  }

  updateDiagram(data: any) {
    if (data && data.nodes && data.links) {
      this.diagram.model = new go.GraphLinksModel(data.nodes, data.links);
    } else {
      console.error('Invalid data format:', data);
    }
  }
}
