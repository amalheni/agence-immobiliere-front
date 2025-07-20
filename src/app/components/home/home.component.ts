import { Component } from '@angular/core';
import { Residence } from '../../core/models/residence.model';
import { ResidenceService } from '../../core/services/residence.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  residences: Residence[] = [];
  featuredResidences: Residence[] = [];

  constructor(private residenceService: ResidenceService) {
    this.residenceService.getResidences().subscribe(residences => {
      this.residences = residences;
      this.featuredResidences = this.getFeaturedResidences();
    });
  }

  getFeaturedResidences(): Residence[] {
    return [...this.residences].sort(() => 0.5 - Math.random()).slice(0, 4);
  }
}