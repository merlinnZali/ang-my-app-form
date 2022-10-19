import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormStartComponent } from './form-start/form-start.component';

const routes: Routes = [
  {
    path: '', component: FormStartComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
