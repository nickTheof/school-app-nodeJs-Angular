import { Person } from '../../../shared/interfaces/person';

export const INPUT_FORM_FIELDS: {
  labelId: keyof Person;
  text: string;
  type: string;
}[] = [
  { labelId: 'firstname', text: 'Όνομα', type: 'text' },
  { labelId: 'lastname', text: 'Επώνυμο', type: 'text' },
  { labelId: 'vat', text: 'ΑΦΜ', type: 'text' },
  { labelId: 'fathername', text: 'Πατρώνυμο', type: 'text' },
  { labelId: 'phoneNum', text: 'Τηλέφωνο', type: 'text' },
  { labelId: 'email', text: 'Email', type: 'email' },
  { labelId: 'address', text: 'Διεύθυνση', type: 'text' },
  { labelId: 'streetNum', text: 'Αριθμός', type: 'text' },
  { labelId: 'zipcode', text: 'ΤΚ', type: 'text' },
];
