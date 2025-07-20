import { Component, Input, OnInit } from '@angular/core';
import { Residence } from '../../core/models/residence.model';
import { ResidenceService } from '../../core/services/residence.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent implements OnInit {
  @Input() residences: Residence[] = [];
  searchText: string = '';
  favorites: Residence[] = [];
  isStandalone: boolean = false;

  constructor(private residenceService: ResidenceService) { }

  ngOnInit(): void {
    // Si aucune résidence n'est passée en entrée, charger depuis le service
    if (!this.residences || this.residences.length === 0) {
      this.residences = this.residenceService.getResidences();
      this.isStandalone = true;
    }
  }

  get filteredResidences(): Residence[] {
    return this.residences.filter(res => 
      res.address.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  showLocation(residence: Residence) {
    if (residence.address.toLowerCase() === "inconnu") {
      alert("L'adresse de cette résidence est inconnue !");
    } else {
      alert(`Adresse: ${residence.address}`);
    }
  }

  isFavorite(residence: Residence): boolean {
    return this.favorites.some(f => f.id === residence.id);
  }

  toggleFavorite(residence: Residence) {
    if (this.isFavorite(residence)) {
      this.favorites = this.favorites.filter(f => f.id !== residence.id);
    } else {
      this.favorites.push({...residence});
    }
  }
}