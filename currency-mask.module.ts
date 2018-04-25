import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyMaskDirective } from './currency-mask.directive';
import { CurrencyMaskService } from './currency-mask.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CurrencyMaskDirective],
  declarations: [CurrencyMaskDirective],
  providers: [CurrencyMaskService]
})
export class CurrencyMaskModule {}
