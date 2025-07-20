import { Component, OnInit } from '@angular/core';
import { Apartment } from '../../../core/models/apartment.model';
import { ApartmentService } from '../../../core/services/apartment.service';
import { CommonService } from '../../../core/services/common.service';
import { ResidenceService } from '../../../core/services/residence.service';
import { Residence } from '../../../core/models/residence.model';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {
  apartments: Apartment[] = [];
  residences: Residence[] = [];
  sameSurfaceCount: number = 0;
  loading: boolean = true;
  errorMessage: string | null = null;
  searchSurface: number | null = null;

  constructor(
    private apartmentService: ApartmentService,
    private residenceService: ResidenceService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.loadApartments();
    this.loadResidences();
  }

  loadApartments(): void {
    this.loading = true;
    this.errorMessage = null;
    
    this.apartmentService.getAllApartments().subscribe({
      next: (apartments) => {
        this.apartments = apartments;
        this.loading = false;
        
        if (this.apartments.length > 0) {
          this.calculateSameSurface(this.apartments[0].surface);
        }
      },
      error: (err) => {
        console.error('Erreur de chargement:', err);
        this.errorMessage = 'Impossible de charger les appartements. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  loadResidences(): void {
    this.residenceService.getResidences().subscribe({
      next: (residences) => {
        this.residences = residences;
      },
      error: (err) => {
        console.error('Erreur de chargement des résidences:', err);
      }
    });
  }

  calculateSameSurface(surface: number): void {
    this.sameSurfaceCount = this.commonService.getSameValueOf(
      this.apartments,
      'surface',
      surface
    );
  }

  getResidenceName(residenceId: number): string {
    const residence = this.residences.find(r => r.id === residenceId);
    return residence ? residence.name : 'Inconnu';
  }

  filterBySurface(): void {
    if (this.searchSurface !== null && this.searchSurface > 0) {
      this.calculateSameSurface(this.searchSurface);
    }
  }
}