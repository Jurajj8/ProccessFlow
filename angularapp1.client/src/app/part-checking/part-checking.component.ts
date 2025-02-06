import { Component } from '@angular/core';
import { PartChecking, PartCheckingService } from '../services/part-checking.service';

@Component({
  selector: 'app-part-checking',
  templateUrl: './part-checking.component.html',
  styleUrl: './part-checking.component.css'
})
export class PartCheckingComponent {
  partCheckings: PartChecking[] = [];
  selectedPartChecking: PartChecking | null = null;

  constructor(private partCheckingsService: PartCheckingService) { }

  ngOnInit(): void {
    this.loadpartCheckings();
  }

  loadpartCheckings(): void {
    this.partCheckingsService.getPartCheckings().subscribe((partCheckings) => {
      this.partCheckings = partCheckings;
    }, error => {
      console.error('Error loading PartCheckings', error);
    });
  }

  viewPartChecking(id: number): void {
    if (id !== undefined) {
      this.partCheckingsService.getPartCheckingById(id).subscribe((partCheckings) => {
        this.selectedPartChecking = partCheckings;
      }, error => {
        console.error('Error loading PartCheckings', error);
      });
    }
  }

  addpartChecking(newPartChecking: PartChecking): void {
    this.partCheckingsService.addPartChecking(newPartChecking).subscribe((partCheckings) => {
      this.partCheckings.push(partCheckings);
    }, error => {
      console.error('Error adding PartChecking', error);
    });
  }

  updatePartChecking(partChecking: PartChecking): void {
    if (!partChecking.partCheckID) return;

    this.partCheckingsService.updatePartChecking(partChecking).subscribe(() => {
      this.loadpartCheckings();
    }, error => {
      console.error('Error updating PartChecking', error);
    });
  }

  deletePartChecking(id: number): void {
    if (id !== undefined && confirm("Are you sure to delete "+ name)) {
      this.partCheckingsService.deletePartChecking(id).subscribe(() => {
        this.partCheckings = this.partCheckings.filter(p => p.partCheckID !== id);
      }, error => {
        console.error('Error deleting PartChecking', error);
      });
    }
  }

  editPartChecking(partChecking: PartChecking): void {
    this.partCheckingsService.updatePartChecking(partChecking).subscribe({
      next: () => {
        console.log('PartChecking updated successfuly');
        this.loadpartCheckings();
      },
      error: (err) => {
        console.error('Error updating PartChecking', err);
      },
    });
  }
}
