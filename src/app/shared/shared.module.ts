/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Services Imports
import {
  SACAPIService,
  LocalStorageService,
  CategoryService,
  RequestTypeService,
  UserService,
  FileService,
  AreaService
} from './services';
import { AutoHeightDirective, ScrollToDirective } from './directives';
import { TruncatePipe, CustomDatePipe } from './pipes';
import {
  CustomSelectComponent,
  NotificationToasterComponent,
  DialogComponent,
  TagListSelectComponent
} from './components';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         MODULE DEFINITION             •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

@NgModule({
  imports: [HttpModule, CommonModule, FormsModule],
  declarations: [
    TruncatePipe,
    CustomDatePipe,
    CustomSelectComponent,
    NotificationToasterComponent,
    DialogComponent,
    TagListSelectComponent,
    AutoHeightDirective,
    ScrollToDirective
  ],
  exports: [
    TruncatePipe,
    CustomDatePipe,
    CustomSelectComponent,
    NotificationToasterComponent,
    DialogComponent,
    TagListSelectComponent,
    AutoHeightDirective,
    ScrollToDirective
  ],
  providers: [
    SACAPIService,
    LocalStorageService,
    CategoryService,
    RequestTypeService,
    UserService,
    FileService,
    AreaService
  ]
})
export class SharedModule {}
