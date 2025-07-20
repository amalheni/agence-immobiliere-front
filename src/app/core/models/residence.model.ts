import { Apartment } from './apartment.model';

export class Residence {
  id!: number;
  name!: string;
  address!: string;
  image!: string;
  status!: string;
  apartments?: Apartment[]; // Ajout pour supporter les appartements imbriqués
}