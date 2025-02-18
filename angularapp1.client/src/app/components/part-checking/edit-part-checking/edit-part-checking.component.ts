import { Component, OnInit } from '@angular/core';
import { PartChecking, PartCheckingService } from '../../../services/part-checking.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-part-checking',
  templateUrl: './edit-part-checking.component.html',
  styleUrl: './edit-part-checking.component.css'
})
export class EditPartCheckingComponent implements OnInit{
  partChecking: PartChecking | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private partCheckingService: PartCheckingService
  ) {};

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.partCheckingService.getPartCheckingById(+id).subscribe({
          next: (data) => (this.partChecking = data),
          error: (err) => console.error('Error loading partChecking', err),
        });
      }
  }

  updatePartChecking(): void {
    if (!this.partChecking) return;

    this.partCheckingService.updatePartChecking(this.partChecking).subscribe({
      next: () => {
        console.log('PartChecking updated successfuly');
        this.router.navigate(['/partCheckings']);
      },
      error: (err) => {
        console.error('Error updating PartChecking', err);
      },
    });
  }
}
