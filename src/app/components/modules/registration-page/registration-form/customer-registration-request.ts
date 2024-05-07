import { Gender } from '../../../common/models/customer-dto';

export interface CustomerRegistrationRequest{
  firstName: string,
  surname: string,
  email: string,
  age: number,
  gender: Gender,
  password: string
}
