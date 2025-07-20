import { Injectable } from '@angular/core';
import { Apartment } from '../models/apartment.model';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apartments: Apartment[] = [
    { apartNum: 101, floorNum: 1, surface: 120, terrace: true, surfaceTerrace: 30, category: "S+3", residenceId: 1 },
    { apartNum: 202, floorNum: 2, surface: 90, terrace: false, surfaceTerrace: 0, category: "S+2", residenceId: 4 },
    { apartNum: 303, floorNum: 3, surface: 150, terrace: true, surfaceTerrace: 40, category: "S+3", residenceId: 2 },
    { apartNum: 101, floorNum: 1, surface: 80, terrace: true, surfaceTerrace: 20, category: "S+1", residenceId: 3 }
  ];

  getAllApartments(): Apartment[] {
    return this.apartments;
  }

  getApartmentsByResidence(residenceId: number): Apartment[] {
    return this.apartments.filter(a => a.residenceId === residenceId);
  }
}