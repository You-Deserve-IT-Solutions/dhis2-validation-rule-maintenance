import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { CustomFormsRoutingModule } from './custom-forms-routing.module';
import { FormatCustomFormComponent } from './components/format-custom-form/format-custom-form.component';
import { entryComponents } from './components';

@NgModule({
  declarations: [HomeComponent, FormatCustomFormComponent, ...entryComponents],
  imports: [CommonModule, SharedModule, CustomFormsRoutingModule],
  entryComponents: [...entryComponents],
})
export class CustomFormsModule {}
