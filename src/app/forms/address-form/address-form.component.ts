import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IAddress } from '../models/address';


@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnDestroy , OnInit {

  form!: FormGroup<{
      addressLine1: FormControl<string>;
      city: FormControl<string | {
        updateOn: string, 
        validators:((control: AbstractControl<any, any>) => ValidationErrors | null)[], 
        asyncValidators: never[]
      }>;
      state: FormControl<string>;
      zip: FormControl<string>;
  }>;

  subscriptions: Subscription[] = [];

  states = ['Ohio', 'rtf'];

  get zipControl() {
    return this.form?.controls.zip;
  }

  get stateControl() {
    return this.form?.controls.state;
  }

  constructor(private fb: NonNullableFormBuilder) { 
  }

  createGroup() { 
    // create the inner form
    this.form = this.fb.group({
        addressLine1: ['', [Validators.required]],
        city: ['',{updateOn: 'blur', validators:[Validators.required], asyncValidators: []}],
        state: ['', Validators.required],
        zip: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]]
    },{
      updateOn: 'blur'
    });

    return this.form
  }

  ngOnInit(): void {
    this.createGroup()


    this.form.get('addressLine1')?.valueChanges.subscribe(value => {
      console.log('profile.addressLine1: ', value)
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  changeState(e: any) {
    this.stateControl.setValue(e.target.value, {
       onlySelf: true
    })
  }

}
