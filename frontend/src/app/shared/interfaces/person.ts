export interface Person {
  uuid: string;
  firstname: string;
  lastname: string;
  vat: string;
  fathername: string;
  phoneNum: string;
  email: string;
  zipcode: string;
  address: string;
  streetNum: string;
  cityId: number;
}

export interface PersonView {
  uuid: string;
  firstname: string;
  lastname: string;
  entity: 'teacher' | 'student';
}
