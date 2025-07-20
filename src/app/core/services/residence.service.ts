import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Residence } from '../models/residence.model';
import { Apartment } from '../models/apartment.model';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  private residenceUrl = '/api/residences';
  private apartmentUrl = '/api/apartments';

  constructor(private http: HttpClient) { }

  getResidences(): Observable<Residence[]> {
    return this.http.get<Residence[]>(this.residenceUrl);
  }

  getResidence(id: number): Observable<Residence> {
    return this.http.get<Residence>(`${this.residenceUrl}/${id}`);
  }

  addResidence(residence: Residence): Observable<Residence> {
    return this.http.post<Residence>(this.residenceUrl, residence);
  }

  updateResidence(residence: Residence): Observable<Residence> {
    return this.http.put<Residence>(`${this.residenceUrl}/${residence.id}`, residence);
  }

  deleteResidence(id: number): Observable<void> {
    return this.http.get<Apartment[]>(`${this.apartmentUrl}?residenceId=${id}`).pipe(
      switchMap(apartments => {
        const deleteRequests = apartments.map(apartment => 
          this.http.delete(`${this.apartmentUrl}/${apartment.id}`)
        );
        return forkJoin(deleteRequests).pipe(
          switchMap(() => this.http.delete<void>(`${this.residenceUrl}/${id}`))
        );
      })
    );
  }
}