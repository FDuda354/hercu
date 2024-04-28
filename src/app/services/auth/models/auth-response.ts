import { CustomerDTO } from '../../../components/common/models/customer-dto';

export interface AuthResponse {
  token: string,
  customerDTO: CustomerDTO,
}
