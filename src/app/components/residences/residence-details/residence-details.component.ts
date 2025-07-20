import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from '../../../core/models/residence.model';
import { ResidenceService } from '../../../core/services/residence.service';
import { ApartmentService } from '../../../core/services/apartment.service';
import { Apartment } from '../../../core/models/apartment.model';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent implements OnInit {
  residence: Residence | null = null;
  apartments: Apartment[] = [];
  nextId: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService,
    private apartmentService: ApartmentService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadResidenceDetails(id);
  }

  loadResidenceDetails(id: number): void {
    this.loading = true;
    this.error = null;

    this.residenceService.getResidence(id).subscribe({
      next: (residence) => {
        this.residence = residence;
        this.loadApartments(id);
        this.findNextId(id);
      },
      error: (err) => {
        console.error('Erreur de chargement:', err);
        this.error = 'Impossible de charger les détails de la résidence.';
        this.loading = false;
      }
    });
  }

  loadApartments(residenceId: number): void {
    this.apartmentService.getApartmentsByResidence(residenceId).subscribe({
      next: (apartments) => {
        this.apartments = apartments;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement des appartements:', err);
        this.error = 'Impossible de charger les appartements.';
        this.loading = false;
      }
    });
  }

  findNextId(currentId: number): void {
    this.residenceService.getResidences().subscribe(residences => {
      const index = residences.findIndex(r => r.id === currentId);
      if (index !== -1 && index < residences.length - 1) {
        this.nextId = residences[index + 1].id;
      } else {
        this.nextId = null;
      }
    });
  }
  deleteResidence(id: number): void {
  if (confirm('Voulez-vous vraiment supprimer cette résidence ?')) {
    this.residenceService.deleteResidence(id).subscribe({
      next: () => {
        this.router.navigate(['/residences']);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
        alert('Échec de la suppression. Veuillez réessayer.');
      }
    });
  }
}

  next(): void {
    if (this.nextId) {
      this.router.navigate(['/residences', this.nextId]);
    }
  }
}