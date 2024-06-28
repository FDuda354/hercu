export interface CustomerDTO {
  id: number,
  firstName: string,
  surname: string,
  email: string,
  age: number,
  role: Role,
  gender?: Gender,
  profileImage?: string,
}

export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  HELICOPTER = 'HELICOPTER'
}
