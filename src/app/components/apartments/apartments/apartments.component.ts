import { Component } from '@angular/core';
import { Apartment } from '../../../core/models/apartment.model';
import { ApartmentService } from '../../../core/services/apartment.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent {
  apartments: Apartment[] = [];

  constructor(private apartmentService: ApartmentService) {
    this.apartments = this.apartmentService.getAllApartments();
  }
}