import { Directive, ElementRef, HostListener, AfterViewInit, Input, forwardRef } from '@angular/core';
import { CurrencyMaskService } from './currency-mask.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CurrencyMaskDirective),
  multi: true
};

@Directive({
  selector: '[appCurrencyMask]',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CurrencyMaskDirective implements AfterViewInit, ControlValueAccessor {
  private el: HTMLInputElement;
  // Keeps track of the value without formatting
  private innerValue: any;
  // Optional Parameter to allow for negative number interaction
  @Input('allowNegative') allowNegative: boolean;
  constructor(private elementRef: ElementRef, private currencyMaskService: CurrencyMaskService) {
    this.el = elementRef.nativeElement;
  }

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (a: any) => void = noop;

  // set getter
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.el.value = this.currencyMaskService.transform(value, this.allowNegative);
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngAfterViewInit() {
    this.el.style.textAlign = 'right';
  }

  // On Focus remove all non-digit or decimal separator values
  @HostListener('focus', ['$event.target.value'])
  onfocus(value) {
    this.el.value = this.currencyMaskService.parse(value, this.allowNegative);
  }

  // On Blue remove all symbols except last . and set to currency format
  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    this.onTouchedCallback();
    this.el.value = this.currencyMaskService.transform(value, this.allowNegative);
    this.onChangeCallback(this.currencyMaskService.parse(this.el.value, this.allowNegative));
  }

  // On Change remove all symbols except last . and set to currency format
  @HostListener('change', ['$event.target.value'])
  onChange(value) {
    this.el.value = this.currencyMaskService.transform(value, this.allowNegative);
    this.onChangeCallback(this.currencyMaskService.parse(this.el.value, this.allowNegative));
  }

  // Prevent user to enter anything but digits and decimal separator
  @HostListener('keypress', ['$event'])
  onKeyPress(event) {
    const key = event.which || event.keyCode || 0;
    if (key === 45 && !this.allowNegative) {
      event.preventDefault();
    } else if (key === 45 && this.allowNegative) {
      // allow negative numbers
    } else if (key !== 46 && key > 31 && (key < 48 || key > 57)) {
      event.preventDefault();
    }
  }
}
