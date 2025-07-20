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
    this.residences = this.residenceService.getResidences();
    this.featuredResidences = this.getFeaturedResidences();
  }

  getFeaturedResidences(): Residence[] {
    // Sélectionne 4 résidences au hasard (ou selon une logique métier)
    return [...this.residences].sort(() => 0.5 - Math.random()).slice(0, 4);
  }
}