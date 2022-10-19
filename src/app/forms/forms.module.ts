import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsRoutingModule } from './forms-routing.module';

import { FormStartComponent } from './form-start/form-start.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { AddressFormPComponent } from './address-form-p/address-form-p.component';

@NgModule({
  declarations: [
    FormStartComponent,
    AddressFormComponent,
    AddressFormPComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsRoutingModule
  ]
})
export class FormsModule { }
