# ngx-currency-mask
Currency Mask for Angular 4

Used the following as inspiration to create my own implementation of an Angular Currency Mask directive: https://github.com/cesarrew/ng2-currency-mask

Requirements I had in mind while implementing:
  1. Currency Mask had to be easy to implement across application. Directive control was used to accomplish that and everything is under one Module that can be easily imported.
  2. Formatted value should be composed of: US dollar currency symbol '$' + value + 2 decimal point precision. Code could be improved to allow for different parameters to control different country's currency as well as different decimal point precision.
  3. When user focus on the input, it should remove all formatting and only keep the decimal amount with the precision. If the input is blank and:
  
    a. The user types "100" then unfocus, it should display $100.00
    b. The user types "100.10" then unfocus, it should display $100.10
    c. The user types ".25" then unfocus, it should display $0.25
  4. User shouldn't be able to type anything that isn't numbers or decimal separator "."
  5. Optional parameter for allowing negative numbers added. On Edit mode the the indicative of negative number is the minus "-" sign, but when formatted we surround the value with parenthesis. So on input -300.12 will display as ($300.12).
