import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apartment } from '../../../core/models/apartment.model';
import { ApartmentService } from '../../../core/services/apartment.service';
import { ResidenceService } from '../../../core/services/residence.service';
import { Residence } from '../../../core/models/residence.model';

@Component({
  selector: 'app-apartments-by-residence',
  templateUrl: './apartments-by-residence.component.html',
  styleUrls: ['./apartments-by-residence.component.css']
})
export class ApartmentsByResidenceComponent implements OnInit {
  apartments: Apartment[] = [];
  residence!: Residence;
  residenceId!: number;

  constructor(
    private route: ActivatedRoute,
    private apartmentService: ApartmentService,
    private residenceService: ResidenceService
  ) { }

  ngOnInit(): void {
    this.residenceId = +this.route.snapshot.paramMap.get('residenceId')!;
    this.apartments = this.apartmentService.getApartmentsByResidence(this.residenceId);
    this.residence = this.residenceService.getResidence(this.residenceId);
  }
}