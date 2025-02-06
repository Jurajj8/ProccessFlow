import { Component } from '@angular/core';
import { PartChecking, PartCheckingService } from '../../services/part-checking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-part-checking',
  templateUrl: './add-part-checking.component.html',
  styleUrl: './add-part-checking.component.css'
})
export class AddPartCheckingComponent {
  newPartChecking: PartChecking = {
    name: '',
    type: ''
  };

  constructor(private partCheckingService: PartCheckingService, public router: Router) {}

  addPartChecking(): void {
    if(this.newPartChecking.name.length > 1 && this.newPartChecking.type.length > 1){
    this.partCheckingService.addPartChecking(this.newPartChecking).subscribe((partChecking) => {
      this.router.navigate(['/partCheckings']);
    }, error => {
      console.error('Error adding partChecking', error);
    });
  }
  }
}
