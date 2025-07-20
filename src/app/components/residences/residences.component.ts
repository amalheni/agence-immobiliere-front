import { Component } from '@angular/core';
import { Residence } from '../../core/models/residence.model';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent {
  searchText: string = '';
  favorites: Residence[] = [];

  // Liste des résidences
  listResidences: Residence[] = [
    { 
      id: 1, 
      name: "El Felija", 
      address: "Menzah 6", 
      image: "assets/images/R1.jpeg", 
      status: "Disponible" 
    },
    { 
      id: 2, 
      name: "El Yasmina", 
      address: "inconnu", 
      image: "assets/images/R1.jpeg", 
      status: "Vendu" 
    },
    { 
      id: 3, 
      name: "El Amal", 
      address: "Centre Ville", 
      image: "assets/images/R1.jpeg", 
      status: "En Construction" 
    }
  ];

  get filteredResidences(): Residence[] {
    return this.listResidences.filter(res => 
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

  // Nouvelle méthode pour vérifier les favoris
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