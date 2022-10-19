import { Component, forwardRef, Host, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormStartComponent } from '../form-start/form-start.component';

import { IAddress } from '../models/address';
import { AddressDTO } from '../models/addressDTO';

/**
 TIP: Such an interface can be implemented in the core module 
 to make it available for the whole application
 type FormGroupConfig<T> = {
  [P in keyof T]: [T[P], any?];
 }
 */
 type FormGroupConfig<T> = {
  [P in keyof T]: [
    T[P] | {value: T[P]; disabled: boolean}, 
    (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
  ];
}


@Component({
  selector: 'app-address-form-p',
  templateUrl: './address-form-p.component.html',
  styleUrls: ['./address-form-p.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormPComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressFormPComponent),
      multi: true
    }
  ]
})
export class AddressFormPComponent implements ControlValueAccessor, OnDestroy , OnInit {

/*   form: FormGroup<{
        addressLine1: FormControl<string>;
        city: FormControl<string | {
          updateOn: string, 
          validators:((control: AbstractControl<any, any>) => ValidationErrors | null)[], 
          asyncValidators: never[]
        }>;
        state: FormControl<string>;
        zip: FormControl<string>;
    }>;
    get stateControl() {
      return this.form.controls.state;
    }
 */

  // value = {} as IAddress

  form: FormGroup

  subscriptions: Subscription[] = [];

  states = ['Ohio', 'rtf'];

  get value(): any {
    return this.form.value;
  }

  set value(value: IAddress) {
    this.form.setValue(value);
    this.hasBeenUpdated(value);
  }

  // called each time we update the form
  private hasBeenUpdated(value: IAddress) {
    this.onChange(value);
    this.onTouched();
  }

  get zipControl() {
    return this.form.controls['zip'];
  }

  get stateControl() {
    return this.form.controls['state'];
  }

  constructor(private fb: NonNullableFormBuilder,
    @Host() public formStartComponent: FormStartComponent) { 
    // create the inner form
    const config: FormGroupConfig<IAddress> = {
      addressLine1: ['', [Validators.required]],
      city: ['',{updateOn: 'blur', validators:[Validators.required], asyncValidators: []}],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]]
    };
    this.form = this.fb.group(config);

    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form.valueChanges.subscribe(value => {
        this.hasBeenUpdated(value);
      })
    );
    console.log(this.formStartComponent.states)
  }

  ngOnInit(): void {
    console.log(this.formStartComponent.states)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange = (value: IAddress) => {};
  onTouched = () => {};

  registerOnChange(fn: (value: IAddress) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  
  // Allow angular to set value on the component
  writeValue(value: IAddress) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  // communicate the inner form validation to the parent form
  validate(_: FormControl) {
    return this.form.valid ? null : { profile: { valid: false } };
  }

  changeState(e: any) {
    this.stateControl.setValue(e.target.value, {
       onlySelf: true
    })
  }
  selectedState(state: string): boolean {
    return state == this.value.state
  }

}
