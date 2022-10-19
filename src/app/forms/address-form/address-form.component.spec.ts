import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormPComponent } from './address-form.component';

describe('AddressFormPComponent', () => {
  let component: AddressFormPComponent;
  let fixture: ComponentFixture<AddressFormPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressFormPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressFormPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
