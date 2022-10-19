import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AddressForm } from '../address-form';
import { AddressFormComponent } from '../address-form/address-form.component';
import { IAddress } from '../models/address';
import { AddressDTO } from '../models/addressDTO';

/*
there are several things we can do to make our lives easier.
1:
Limit your use of FormGroup.get usage when referring to nested controls in a FormGroup.
Instead, store the references to the nested controls in component properties.
controls = {
    addressLine1: this.form.get('addressLine1'),
    ...,
  }
2:
Use DTO pattern when changing the data model of the form to the one required by a data service.
3:
Abstract away harder form controls to custom components implementing ControlValueAccessor.
 */
@Component({
  selector: 'app-form-start',
  templateUrl: './form-start.component.html',
  styleUrls: ['./form-start.component.scss']
})
export class FormStartComponent implements OnInit {

  form: FormGroup = this.fb.group({
          addressLine1: [''],
          city: [''],
          state: [''],
          zip: ['']
        });
  form1: FormGroup = this.fb.group({
    addressLine1: [''],
    city: [''],
    state: [''],
    zip: ['']
  });

  controls = {
    addressLine1: this.form.get('addressLine1') as FormControl,
    city: this.form.get('city') as FormControl,
    state: this.form.get('state') as FormControl,
    zip: this.form.get('zip') as FormControl,
  }

  addressForm!: AddressForm;
  address!: IAddress;

  states = ['Ohio', 'rtf'];
  submitted = false;

  //---- nested form -----//
  // signupForm will use ControlValueAccessor
  // best choice for nested or customer component form
  signupForm: FormGroup;

  // signupForm1 will use @ViewChild(AddressFormComponent)
  // Les ecoutes doivent etre gerer dans le composant enfant
  // Pas la bonne approche car demande d ecrire beaucoup de code pour gerer les ecouteurs
  // et faire remonter l info au parent
  signupForm1!: FormGroup;
  /**
   using { static: true } option to make sure that our property has value already inside of the ngOnInit life-cycle hook 
   which is where we’re creating our form definition using FormBuilder
   * 
   */
  @ViewChild(AddressFormComponent, {static: true}) addressFormComponent!: AddressFormComponent

  constructor(private formBuilder: FormBuilder, private fb: NonNullableFormBuilder) {
    this.address = {
      addressLine1: '123 Main St',
      city: 'Your City',
      state: 'Ohio',
      zip: '123'
    };

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profile: [this.address]
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      addressLine1: [this.address.addressLine1, [Validators.required]],
      city: [this.address.city,{updateOn: 'blur', validators:[Validators.required], asyncValidators: []}],
      state: [this.address.state, Validators.required],
      zip: [this.address.zip, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]]
    });

    // Using an external class
     this.form1 = new AddressForm(this.address);

    // nested
    this.signupForm1 = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profile: this.addressFormComponent.createGroup()
    });

    // this wont work
    this.signupForm1.get('profile')?.get('addressLine1')?.valueChanges.subscribe(value => {
      console.log('profile.addressLine1: ', value)
    })

    this.signupForm1.get('firstName')?.valueChanges.subscribe(value => {
      console.log('firstName: ', value)
    })
    
  }


  changeState(e: any) {
    this.form.get('state')?.setValue(e.target.value, {
       onlySelf: true
    })
  }

  /* Select Dropdown error handling */
  public handleError (controlName: string, errorName: string) : boolean{
    return this.form.controls[controlName]?.hasError(errorName);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      const address = new AddressDTO(this.form.value as IAddress);
      // now send the article DTO to the backend using one of your services
      console.log('address', address)
    }

    console.log(JSON.stringify(this.form.value));
  }

  submit() {
    console.log(this.signupForm?.value);
  }

  submit1() {
    if (this.signupForm1.valid) {
      console.log(JSON.stringify(this.signupForm1.value));
    }

    console.log('signupForm1 INVALID');
  }

}
