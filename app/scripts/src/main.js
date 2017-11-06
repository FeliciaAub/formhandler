import {FormHandler} from './app';

let data = {}
var FORM_SELECTOR = '[data-coffee-order="form"]';
var myForm = new FormHandler(FORM_SELECTOR);

myForm.addSubmitHandler(data);
console.log(data);
