import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Apartment } from '../../../core/models/apartment.model';
import { Residence } from '../../../core/models/residence.model';
import { ResidenceService } from '../../../core/services/residence.service';
import { ApartmentService } from '../../../core/services/apartment.service'; // ADDED IMPORT

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent implements OnInit {
  apartForm: FormGroup;
  residences: Residence[] = [];
  newApart: Apartment | null = null;
  successMessage: string | null = null; // ADDED SUCCESS MESSAGE
  errorMessage: string | null = null;   // ADDED ERROR MESSAGE

  constructor(
    private fb: FormBuilder,
    private residenceService: ResidenceService,
    private apartmentService: ApartmentService // INJECTED SERVICE
  ) {
    this.apartForm = this.fb.group({
      apartNum: ['', [Validators.required, this.numberValidator]],
      floorNum: ['', [Validators.required, this.numberValidator]],
      surface: ['', Validators.required],
      terrace: [false],
      surfaceTerrace: [''],
      category: ['', Validators.required],
      residenceId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.residenceService.getResidences().subscribe(residences => {
      this.residences = residences;
    });
    
    this.apartForm.get('terrace')?.valueChanges.subscribe(terrace => {
      const surfaceTerraceControl = this.apartForm.get('surfaceTerrace');
      if (terrace) {
        surfaceTerraceControl?.setValidators([Validators.required]);
      } else {
        surfaceTerraceControl?.clearValidators();
        surfaceTerraceControl?.reset('');
      }
      surfaceTerraceControl?.updateValueAndValidity();
    });
  }

  numberValidator(control: AbstractControl): { [key: string]: any } | null {
    return isNaN(control.value) ? { notNumber: true } : null;
  }

  onSubmit(): void {
  if (this.apartForm.valid) {
    // Create a new Apartment object from form values
    const newApartment: Apartment = {
      ...this.apartForm.value,
      surfaceTerrace: this.apartForm.value.terrace 
        ? this.apartForm.value.surfaceTerrace 
        : null
    };

    this.apartmentService.addApartment(newApartment).subscribe({
      next: (addedApartment) => {
        console.log('Apartment added:', addedApartment);
        this.successMessage = 'Apartment added successfully!';
        this.errorMessage = null;
        this.apartForm.reset();
        this.newApart = null;
      },
      error: (err) => {
        console.error('Error adding apartment:', err);
        this.errorMessage = 'Failed to add apartment. Please try again.';
        this.successMessage = null;
      }
    });
  }
}
}