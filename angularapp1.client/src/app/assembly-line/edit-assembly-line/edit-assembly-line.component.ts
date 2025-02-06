import { Component, OnInit } from '@angular/core';
import { AssemblyLine, AssemblyLineService } from '../../services/assembly-line.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assembly-line',
  templateUrl: './edit-assembly-line.component.html',
  styleUrl: './edit-assembly-line.component.css'
})
export class EditAssemblyLineComponent implements OnInit {
  assemblyLine: AssemblyLine | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private assemblyLineService: AssemblyLineService
  ) { };

  ngOnInit(): void {
    const lineId = this.route.snapshot.paramMap.get('lineId');
    if (lineId) {
      this.assemblyLineService.getAssemblyLineByID(+lineId).subscribe({
        next: (data) => {
          this.assemblyLine = data;
          console.log('Loaded AssemblyLine:', this.assemblyLine);
        },
        error: (err) => console.error('Error loading AssemblyLine', err),
      });
    }
  }

  updateAssemblyLine(): void {
    if (!this.assemblyLine) return;

    console.log('Updating AssemblyLine:', this.assemblyLine);


    this.assemblyLineService.updateAssemblyLine(this.assemblyLine).subscribe({
      next: () => {
        console.log('AssemblyLines updated successfuly');
        this.router.navigate(['/projects/',this.assemblyLine?.projectID]);
      },
      error: (err) => {
        console.error('Error updating AssemblyLine', err);
      },
    });
  }
}
