import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResidencesComponent } from './components/residences/residences.component';
import { ResidenceDetailsComponent } from './components/residences/residence-details/residence-details.component';
import { AddResidenceComponent } from './components/residences/add-residence/add-residence.component';
import { ApartmentsComponent } from './components/apartments/apartments/apartments.component';
import { ApartmentsByResidenceComponent } from './components/apartments/apartments-by-residence/apartments-by-residence.component';
import { AddApartmentComponent } from './components/apartments/add-apartment/add-apartment.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'residences', component: ResidencesComponent },
  { 
    path: 'residences/:id', 
    component: ResidenceDetailsComponent 
  },
  { 
    path: 'add-residence', 
    component: AddResidenceComponent 
  },
  { 
    path: 'update-residence/:id', 
    component: AddResidenceComponent 
  },
  { path: 'apartments', component: ApartmentsComponent },
  { 
    path: 'apartments/:residenceId', 
    component: ApartmentsByResidenceComponent 
  },
  { 
    path: 'add-apartment', 
    component: AddApartmentComponent 
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }