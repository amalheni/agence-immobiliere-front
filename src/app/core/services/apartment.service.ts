import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from '../models/apartment.model';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apartmentUrl = '/api/apartments';

  constructor(private http: HttpClient) { }

  getAllApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.apartmentUrl);
  }

  getApartmentsByResidence(residenceId: number): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.apartmentUrl}?residenceId=${residenceId}`);
  }

 addApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.post<Apartment>(this.apartmentUrl, apartment);
  }
}