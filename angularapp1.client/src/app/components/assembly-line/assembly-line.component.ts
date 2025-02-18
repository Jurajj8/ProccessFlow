import { Component } from '@angular/core';
import { AssemblyLineService, AssemblyLine } from '../../services/assembly-line.service';

@Component({
  selector: 'app-assembly-line',
  templateUrl: './assembly-line.component.html',
  styleUrl: './assembly-line.component.css'
})
export class AssemblyLineComponent {
  assemblyLines: AssemblyLine[] = [];
  selectedAssemblyLine: AssemblyLine | null = null;

  constructor(private assemblyLineService: AssemblyLineService) { }

  ngOnInit(): void {
    this.loadAssemblyLines();
  }

  loadAssemblyLines(): void {
    this.assemblyLineService.getAssemblyLines().subscribe((assemblyLines) => {
      this.assemblyLines = assemblyLines;
    }, error => {
      console.error('Error loading AssemblyLines', error);
    });
  }

  viewAssemblyLine(id: number): void {
    if (id !== undefined) {
      this.assemblyLineService.getAssemblyLineByID(id).subscribe((assemblyLines) => {
        this.selectedAssemblyLine = assemblyLines;
      }, error => {
        console.error('Error loading AsemblyLine', error);
      });
    }
  }

  addAssemblyLine(newAssemblyLine: AssemblyLine): void {
    this.assemblyLineService.addAssemblyLine(newAssemblyLine).subscribe((assemblyLines) => {
      this.assemblyLines.push(assemblyLines);
    }, error => {
      console.error('Error adding AssemblyLine', error);
    });
  }

  updateAssemblyLine(assemblyLine: AssemblyLine): void {
    if (!assemblyLine.lineID) {
      console.log('Not updating AssemblyLine:', assemblyLine);
      return;
    }
    console.log('Updating AssemblyLine:', assemblyLine);
    
    this.assemblyLineService.updateAssemblyLine(assemblyLine).subscribe(() => {
      this.loadAssemblyLines();
    }, error => {
      console.error('Error updating AssemblyLine', error);
    });
  }

  deleteAssemblyLine(id: number): void {
    if (id !== undefined && confirm("Are you sure to delete " + name)) {
      this.assemblyLineService.deleteAssemblyLine(id).subscribe(() => {
        this.assemblyLines = this.assemblyLines.filter(p => p.lineID !== id);
      }, error => {
        console.error('Error deleting AssemblyLine', error);
      });
    }
  }

  editAssemblyLine(assemblyLine: AssemblyLine): void {
    this.assemblyLineService.updateAssemblyLine(assemblyLine).subscribe({
      next: () => {
        console.log('AssemblyLine updated successfuly');
        this.loadAssemblyLines();
      },
      error: (err) => {
        console.error('Error updating AssemblyLine', err);
      },
    });
  }
}

