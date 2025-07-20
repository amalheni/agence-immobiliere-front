import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Apartment } from '../../../core/models/apartment.model';
import { Residence } from '../../../core/models/residence.model';
import { ResidenceService } from '../../../core/services/residence.service';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent implements OnInit {
  apartForm: FormGroup;
  residences: Residence[] = [];
  newApart: Apartment | null = null;

  constructor(
    private fb: FormBuilder,
    private residenceService: ResidenceService
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
    this.residences = this.residenceService.getResidences();
    
    // Activer/désactiver la validation pour surfaceTerrace
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

  // Validateur personnalisé pour vérifier les nombres
  numberValidator(control: AbstractControl): ValidationErrors | null {
    return isNaN(control.value) ? { notNumber: true } : null;
  }

  onSubmit(): void {
    if (this.apartForm.valid) {
      this.newApart = this.apartForm.value;
      console.log('Nouvel appartement:', this.newApart);
      // Ici vous enverrez les données au backend
    }
  }
}