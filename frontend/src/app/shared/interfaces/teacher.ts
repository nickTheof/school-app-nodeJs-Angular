import {
  Person,
  PersonInsertDTO,
  PersonUpdateDTO,
  PersonViewSchema,
} from './person';

export interface Teacher extends Person {}
export interface TeacherInsertDTO extends PersonInsertDTO {}
export interface TeacherUpdateDTO extends PersonUpdateDTO {}
export interface TeacherView extends PersonViewSchema {
  entity: 'teacher';
}
