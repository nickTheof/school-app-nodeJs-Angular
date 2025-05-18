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
  city: string;
}

export interface Student extends Person {}

export interface PersonView {
  uuid: string;
  firstname: string;
  lastname: string;
  entity: string;
}

export interface PersonViewSchema {
  uuid: string;
  firstname: string;
  lastname: string;
}

export interface PersonInsertDTO {
  firstname: string;
  lastname: string;
  vat: string;
  fathername: string;
  phoneNum: string;
  email: string;
  zipcode: string;
  address: string;
  streetNum: string;
  city: string;
}

export interface StudentInsertDTO extends PersonInsertDTO {}

export interface PersonUpdateDTO {
  firstname: string;
  lastname: string;
  vat: string;
  fathername: string;
  phoneNum: string;
  email: string;
  zipcode: string;
  address: string;
  streetNum: string;
  city: string;
}

export interface StudentUpdateDTO extends PersonUpdateDTO {}
