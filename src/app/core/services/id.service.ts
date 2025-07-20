import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdService {
  private lastResidenceId = 0;
  private lastApartmentId = 0;

  constructor() {
    // Initialiser à partir du localStorage ou de la base de données
    this.loadLastIds();
  }

  private loadLastIds(): void {
    try {
      const data = localStorage.getItem('lastIds');
      const lastIds = data ? JSON.parse(data) : {};
      this.lastResidenceId = Number(lastIds.residence) || 0;
      this.lastApartmentId = Number(lastIds.apartment) || 0;
    } catch {
      this.lastResidenceId = 0;
      this.lastApartmentId = 0;
    }
  }
  private saveLastIds(): void {
    localStorage.setItem(
      'lastIds',
      JSON.stringify({
        residence: this.lastResidenceId,
        apartment: this.lastApartmentId,
      })
    );
  }

  getNextResidenceId(): number {
    this.lastResidenceId++;
    this.saveLastIds();
    return this.lastResidenceId;
  }

  getNextApartmentId(): number {
    this.lastApartmentId++;
    this.saveLastIds();
    return this.lastApartmentId;
  }

  updateLastIds(residences: any[], apartments: any[]): void {
    const maxResidenceId = Math.max(...residences.map((r) => r.id), 0);
    const maxApartmentId = Math.max(...apartments.map((a) => a.id), 0);

    if (maxResidenceId > this.lastResidenceId)
      this.lastResidenceId = maxResidenceId;
    if (maxApartmentId > this.lastApartmentId)
      this.lastApartmentId = maxApartmentId;

    this.saveLastIds();
  }
}
