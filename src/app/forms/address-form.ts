import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { IAddress } from "./models/address";


export class AddressForm extends FormGroup {
    readonly addressLine1 = this.get('addressLine1') as FormControl;
    readonly city = this.get('city') as FormControl;
    readonly state = this.get('state') as FormControl;
    readonly zip = this.get('zip') as FormControl;

    constructor(readonly model: IAddress, readonly fb: FormBuilder = new FormBuilder()) {
        super(fb.group({
            addressLine1: [model.addressLine1, [Validators.required]],
            city: [model.city,{updateOn: 'blur', validators:[Validators.required], asyncValidators: []}],
            state: [model.state, Validators.required],
            zip: [model.zip, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]]
        }).controls);
    }
}