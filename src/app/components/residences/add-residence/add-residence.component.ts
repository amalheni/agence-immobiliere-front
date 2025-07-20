import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { Residence } from '../../../core/models/residence.model';
import { Apartment } from '../../../core/models/apartment.model';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  residenceForm: FormGroup;
  statusOptions = ['Disponible', 'En Construction', 'Vendu'];

  constructor(private fb: FormBuilder) {
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
    // Ajouter un appartement vide par défaut
    this.addApartment();
  }

  // Validateur pour les URLs
  urlValidator(control: AbstractControl): ValidationErrors | null {
    const pattern = /^(http|https):\/\/[^ "]+$/;
    return pattern.test(control.value) ? null : { invalidUrl: true };
  }

  // Validateur pour les nombres
  numberValidator(control: AbstractControl): ValidationErrors | null {
    return isNaN(control.value) ? { notNumber: true } : null;
  }

  // Getter pour le FormArray des appartements
  get apartments(): FormArray {
    return this.residenceForm.get('apartments') as FormArray;
  }

  // Créer un groupe pour un nouvel appartement
  newApartment(): FormGroup {
    return this.fb.group({
      apartNum: ['', [Validators.required, this.numberValidator]],
      floorNum: ['', [Validators.required, this.numberValidator]],
      surface: ['', Validators.required],
      terrace: [false],
      surfaceTerrace: [''],
      category: ['', Validators.required]
    });
  }

  // Ajouter un nouvel appartement
  addApartment(): void {
    this.apartments.push(this.newApartment());
  }

  // Supprimer un appartement
  removeApartment(index: number): void {
    this.apartments.removeAt(index);
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.residenceForm.valid) {
      const residence: Residence = this.residenceForm.value;
      console.log('Nouvelle résidence:', residence);
      // Ici vous enverrez les données au backend
    }
  }
}