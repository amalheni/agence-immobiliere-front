import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidenceService } from '../../../core/services/residence.service';
import { Residence } from '../../../core/models/residence.model';
import { Apartment } from '../../../core/models/apartment.model';
import { ApartmentService } from '../../../core/services/apartment.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  residenceForm: FormGroup;
  statusOptions = ['Disponible', 'En Construction', 'Vendu'];
  isUpdateMode = false;
  residenceId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private residenceService: ResidenceService,
    private apartmentService: ApartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.residenceForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: ['', [Validators.required, this.urlValidator]],
      status: ['Disponible', Validators.required],
      apartments: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.residenceId = this.route.snapshot.params['id'];
    
    if (this.residenceId) {
      this.isUpdateMode = true;
      this.residenceService.getResidence(this.residenceId).subscribe({
        next: (residence) => {
          this.residenceForm.patchValue(residence);
        },
        error: (err) => console.error('Erreur de chargement:', err)
      });
    } else {
      this.addApartment();
    }
  }

  urlValidator(control: any): { [key: string]: any } | null {
    const pattern = /^(http|https):\/\/[^ "]+$/;
    return pattern.test(control.value) ? null : { invalidUrl: true };
  }

  get apartments(): FormArray {
    return this.residenceForm.get('apartments') as FormArray;
  }

  newApartment(apartment?: Apartment): FormGroup {
    return this.fb.group({
      apartNum: [apartment?.apartNum || '', [Validators.required]],
      floorNum: [apartment?.floorNum || '', [Validators.required]],
      surface: [apartment?.surface || '', Validators.required],
      terrace: [apartment?.terrace || false],
      surfaceTerrace: [apartment?.surfaceTerrace || ''],
      category: [apartment?.category || '', Validators.required]
    });
  }

  addApartment(apartment?: Apartment): void {
    this.apartments.push(this.newApartment(apartment));
  }

  removeApartment(index: number): void {
    this.apartments.removeAt(index);
  }

  onSubmit(): void {
    if (this.residenceForm.valid) {
      const residence: Residence = {
        id: this.residenceForm.value.id,
        name: this.residenceForm.value.name,
        address: this.residenceForm.value.address,
        image: this.residenceForm.value.image,
        status: this.residenceForm.value.status
      };

      const apartments: Apartment[] = this.apartments.value;

      const operation = this.isUpdateMode
        ? this.residenceService.updateResidence(residence)
        : this.residenceService.addResidence(residence);

      operation.subscribe({
        next: (savedResidence) => {
          // For new residence, save apartments
          if (!this.isUpdateMode) {
            const apartmentRequests = apartments.map(apartment => {
              return this.apartmentService.addApartment({
                ...apartment,
                residenceId: savedResidence.id
              });
            });

            forkJoin(apartmentRequests).subscribe({
              next: () => this.router.navigate(['/residences']),
              error: (err) => {
                console.error('Failed to save apartments', err);
                this.router.navigate(['/residences']);
              }
            });
          } else {
            // For update, we don't handle apartments in this example
            this.router.navigate(['/residences']);
          }
        },
        error: (err) => {
          console.error('Erreur:', err);
        }
      });
    }
  }
}