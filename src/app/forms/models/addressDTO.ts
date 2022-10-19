import { IAddress } from './address'

export class AddressDTO {
    addressLine1: string
    city: string
    state: string
    zip: string
  
    constructor(formValue: IAddress) {
      this.addressLine1 = formValue.addressLine1;
      this.city = formValue.city;
      this.state = formValue.state;
      this.zip = formValue.zip;
    }
}