export interface CustomerDTO {
  id?: number,
  name?: string,
  email?: string,
  age?: number,
  role?: Role
}

export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}
