import { Component, OnInit } from '@angular/core';
import { Residence } from '../../core/models/residence.model';
import { ResidenceService } from '../../core/services/residence.service';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent implements OnInit {
  residences: Residence[] = [];
  searchText: string = '';
  favorites: Residence[] = [];
  isStandalone: boolean = true;
  sameAddressCount: number = 0;
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private residenceService: ResidenceService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.loadResidences();
  }

  loadResidences(): void {
    this.loading = true;
    this.errorMessage = null;
    
    this.residenceService.getResidences().subscribe({
      next: (residences) => {
        this.residences = residences;
        this.loading = false;
        
        if (this.residences.length > 0) {
          this.calculateSameAddress(this.residences[0].address);
        }
      },
      error: (err) => {
        console.error('Erreur de chargement:', err);
        this.errorMessage = 'Impossible de charger les résidences. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  calculateSameAddress(address: string): void {
    this.sameAddressCount = this.commonService.getSameValueOf(
      this.residences,
      'address',
      address
    );
  }

  get filteredResidences(): Residence[] {
    return this.residences.filter(res => 
      res.address.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  showLocation(residence: Residence): void {
    if (residence.address.toLowerCase() === "inconnu") {
      alert("L'adresse de cette résidence est inconnue !");
    } else {
      alert(`Adresse: ${residence.address}`);
    }
  }

  isFavorite(residence: Residence): boolean {
    return this.favorites.some(f => f.id === residence.id);
  }

  toggleFavorite(residence: Residence): void {
    if (this.isFavorite(residence)) {
      this.favorites = this.favorites.filter(f => f.id !== residence.id);
    } else {
      this.favorites.push({...residence});
    }
  }

  deleteResidence(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette résidence ?')) {
      this.residenceService.deleteResidence(id).subscribe({
        next: () => {
          this.residences = this.residences.filter(r => r.id !== id);
          this.favorites = this.favorites.filter(f => f.id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          alert('Échec de la suppression. Veuillez réessayer.');
        }
      });
    }
  }
}