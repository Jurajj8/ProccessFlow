import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as go from 'gojs';
import { AssemblyLine, AssemblyLineService } from '../../../services/assembly-line.service';
import { Diagram } from 'gojs';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectService } from '../../../services/project.service';
import { DiagramService } from '../../../services/diagram.service';
import { Station, StationService } from '../../../services/station.service';

@Component({
  selector: 'app-project-schema',
  templateUrl: './project-schema.component.html',
  styleUrls: ['./project-schema.component.css']
})
export class ProjectSchemaComponent implements AfterViewInit, OnInit {
  private diagram: go.Diagram = new Diagram;
  private file: string | undefined;
  assemblyLines: AssemblyLine[] = [];
  project: Project | undefined;
  stations: Station[] = [];
  constructor(
    private assemblyLineService: AssemblyLineService,
    private stationService: StationService,
    private projectService: ProjectService,
    private diagramService: DiagramService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const projectID = Number(this.route.snapshot.paramMap.get('projectID'));
    this.loadProject(projectID);
    this.loadAssemblyLinesAndStations(projectID);
  }

  loadAssemblyLinesAndStations(projectID: number) {
    this.assemblyLineService.getAssemblyLineByProject(projectID).subscribe((assemblyLines) => {
      this.assemblyLines = assemblyLines;
      this.stations = []; 

      assemblyLines.forEach(al => {
        this.stationService.getStationByAssemblyLine(al.lineID).subscribe((stations) => {
          this.stations.push(...stations);
          console.log('Stations loaded for assembly line', al.lineID, ':', stations);
        }, error => {
          console.error('Error loading stations for assembly line', al.lineID, ':', error);
        });
      });
    }, error => {
      console.error('Error loading assembly lines:', error);
    });
  }

  loadProject(projectID: number): void {
    this.projectService.getProjectById(projectID).subscribe((project) => {
      this.project = project;
      this.loadDiagram(projectID);
    }, error => {
      console.error('Error loading project', error);
    });
  }

  ngAfterViewInit() {
    const $ = go.GraphObject.make;

    this.diagram = $(go.Diagram, 'myDiagramDiv', {
      'undoManager.isEnabled': true,
    });

    this.diagram.nodeTemplate =
      this.diagram.nodeTemplate =
      $(go.Node, 'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle', {
          stroke: null,
          portId: '',
          cursor: 'pointer',
          fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
          toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
          parameter1: 10
        },
          new go.Binding('fill', 'color')),
        $(go.TextBlock, { margin: 6, font: '18px sans-serif' },
          new go.Binding('text', 'name'))
      );

    this.diagram.linkTemplate =
      $(go.Link, {
        relinkableFrom: true, relinkableTo: true,
        toShortLength: 2
      },
        $(go.Shape, { strokeWidth: 2 }),
        $(go.Shape, { toArrow: 'Standard', stroke: null })
      );

    this.setupDragAndDrop();
  }

  setupDragAndDrop() {
    const assemblyLinesDiv = document.getElementById('assemblyLinesDiv');
    const stationsDiv = document.getElementById('stationsDiv');
    const diagramDiv = document.getElementById('myDiagramDiv');

    if (assemblyLinesDiv && diagramDiv) {
      assemblyLinesDiv.addEventListener('dragstart', (event: DragEvent) => {
        if (event.target && (event.target as HTMLElement).classList.contains('assemblyLine')) {
          event.dataTransfer?.setData('text', (event.target as HTMLElement).dataset['name'] || '');
          event.dataTransfer?.setData('type', 'assemblyLine');
          console.log('Drag started for assembly line:', (event.target as HTMLElement).dataset['name']);
        }
      });

      diagramDiv.addEventListener('dragover', (event: DragEvent) => {
        event.preventDefault();
      });

      diagramDiv.addEventListener('drop', (event: DragEvent) => {
        event.preventDefault();
        const name = event.dataTransfer?.getData('text');
        const type = event.dataTransfer?.getData('type');
        console.log('Drop event:', { name, type });
        if (name && type) {
          const point = this.diagram.transformViewToDoc(new go.Point(event.offsetX, event.offsetY));
          console.log('Point:', point);
          this.diagram.startTransaction('add node');
          if (!this.diagram.model.findNodeDataForKey(name)) {
            const color = type === 'assemblyLine' ? 'lightblue' : 'green';
            console.log('Adding node:', { key: name, name: name, color: color, loc: go.Point.stringify(point) });
            this.diagram.model.addNodeData({ key: name, name: name, color: color, loc: go.Point.stringify(point) });
          } else {
            console.log('Node already exists:', name);
          }
          this.diagram.commitTransaction('add node');
        }
      });
    }

    if (stationsDiv && diagramDiv) {
      stationsDiv.addEventListener('dragstart', (event: DragEvent) => {
        if (event.target && (event.target as HTMLElement).classList.contains('station')) {
          event.dataTransfer?.setData('text', (event.target as HTMLElement).dataset['name'] || '');
          event.dataTransfer?.setData('type', 'station');
          console.log('Drag started for station:', (event.target as HTMLElement).dataset['name']);
        }
      });

      diagramDiv.addEventListener('dragover', (event: DragEvent) => {
        event.preventDefault();
      });

      diagramDiv.addEventListener('drop', (event: DragEvent) => {
        event.preventDefault();
        const name = event.dataTransfer?.getData('text');
        const type = event.dataTransfer?.getData('type');
        console.log('Drop event:', { name, type });
        if (name && type) {
          const point = this.diagram.transformViewToDoc(new go.Point(event.offsetX, event.offsetY));
          console.log('Point:', point);
          this.diagram.startTransaction('add node');
          if (!this.diagram.model.findNodeDataForKey(name)) {
            const color = type === 'assemblyLine' ? 'lightblue' : 'green';
            console.log('Adding node:', { key: name, name: name, color: color, loc: go.Point.stringify(point) });
            this.diagram.model.addNodeData({ key: name, name: name, color: color, loc: go.Point.stringify(point) });
          } else {
            console.log('Node already exists:', name);
          }
          this.diagram.commitTransaction('add node');
        }
      });
    }
  }

  save(): void {
    this.file = this.diagram.model.toJson();
    if (this.project) {
      const diagramData = { name: 'MyDiagram', jsonData: this.file, projectID: this.project.projectID };
      console.log('Saving diagram with data:', diagramData);

      if (this.project.diagramId) {
        this.diagramService.updateDiagram(this.project.diagramId, diagramData).subscribe(response => {
          console.log('Diagram updated:', response);
        }, error => {
          console.error('Error updating diagram:', error);
        });
      } else {
        this.diagramService.saveDiagram(diagramData).subscribe(response => {
          console.log('Diagram saved:', response);
          if (this.project) { 
            this.project.diagramId = response.id; 
          }
        }, error => {
          console.error('Error saving diagram:', error);
        });
      }
    } else {
      console.error('Project not loaded');
    }
  }

  loadDiagram(projectID: number): void {
    this.diagramService.getDiagram(projectID).subscribe(response => {
      this.file = response.jsonData;
      if (this.file != null) {
        this.diagram.model = go.Model.fromJson(this.file);
      } else {
        console.log("Nothing saved to load.");
      }
    }, error => {
      if (error.status === 404) {
        console.log("Diagram not found for projectID:", projectID);
      } else {
        console.error('Error loading diagram:', error);
      }
    });
  }
}
