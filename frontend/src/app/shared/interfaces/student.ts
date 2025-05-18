import {
  Person,
  PersonInsertDTO,
  PersonUpdateDTO,
  PersonViewSchema,
} from './person';

export interface Student extends Person {}
export interface StudentInsertDTO extends PersonInsertDTO {}
export interface StudentUpdateDTO extends PersonUpdateDTO {}
export interface StudentView extends PersonViewSchema {
  entity: 'student';
}
