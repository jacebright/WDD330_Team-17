import { alertMessage, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

  

  // listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  const checkoutForm = document.forms[0];
  const methodValid = checkoutForm.checkValidity();

  checkoutForm.reportValidity();

  const cardNumber = document.querySelector('#cardNumber').value;
  const expiration = document.querySelector('#expiration').value;

  const validCardNumber = /^[0-9]{16}$/.test(cardNumber);
  const validExpiration = /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiration);

  // Clear any existing alerts first
  const existingAlerts = document.querySelectorAll('.alert');
  existingAlerts.forEach(alert => alert.remove());


  if (!validCardNumber) {
    alertMessage('Invalid Card Number');    
  }
  if (!validExpiration) {
    alertMessage('Invalid Expiration Date');    
  }

  if(methodValid && validCardNumber && validExpiration) {
    myCheckout.checkout();
  }  

  
});




