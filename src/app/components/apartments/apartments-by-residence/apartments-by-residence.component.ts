import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apartment } from '../../../core/models/apartment.model';
import { ApartmentService } from '../../../core/services/apartment.service';
import { ResidenceService } from '../../../core/services/residence.service';
import { Residence } from '../../../core/models/residence.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-apartments-by-residence',
  templateUrl: './apartments-by-residence.component.html',
  styleUrls: ['./apartments-by-residence.component.css']
})
export class ApartmentsByResidenceComponent implements OnInit {
  apartments: Apartment[] = [];
  residence: Residence | null = null;
  residenceId!: number;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apartmentService: ApartmentService,
    private residenceService: ResidenceService
  ) { }

  ngOnInit(): void {
    this.residenceId = +this.route.snapshot.paramMap.get('residenceId')!;
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      residence: this.residenceService.getResidence(this.residenceId),
      apartments: this.apartmentService.getApartmentsByResidence(this.residenceId)
    }).subscribe({
      next: (data) => {
        this.residence = data.residence;
        this.apartments = data.apartments;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement:', err);
        this.error = 'Impossible de charger les données. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }
}