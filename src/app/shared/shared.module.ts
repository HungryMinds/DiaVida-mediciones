import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { NavBarComponent } from './navbar/navbar.component';
import { NgcFloatButtonModule } from './fab-button/ngc-float-button.module';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [NavBarComponent],
  exports: [NavBarComponent, NgcFloatButtonModule]
})
export class SharedModule {}
