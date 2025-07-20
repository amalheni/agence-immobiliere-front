import { Injectable } from '@angular/core';
import { Residence } from '../models/residence.model';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  private residences: Residence[] = [
    { id: 1, name: "El Felija", address: "Menzah 6", image: "assets/images/R1.jpeg", status: "Disponible" },
    { id: 2, name: "El Yasmina", address: "inconnu", image: "assets/images/R1.jpeg", status: "Vendu" },
    { id: 3, name: "El Amal", address: "Centre Ville", image: "assets/images/R1.jpeg", status: "En Construction" },
    { id: 4, name: "El Manar", address: "Manar 1", image: "assets/images/R1.jpeg", status: "Disponible" }
  ];

  getResidences(): Residence[] {
    return this.residences;
  }

  getResidence(id: number): Residence {
    return this.residences.find(r => r.id === id)!;
  }

  getNextResidenceId(currentId: number): number {
    const index = this.residences.findIndex(r => r.id === currentId);
    return this.residences[(index + 1) % this.residences.length].id;
  }
}