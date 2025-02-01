import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();

function shoppingCartSummary (cart) {

    return `<p>Subtotal: ${cart.total}</p>
        <p>Shipping Estimate: ${cart.estimate()}</p>
        <p>Tax: ${cart.tax()}</p>
        <p>Order Total: ${cart.orderTotal()}</p>`;
}

const summaryElement = document.querySelector(".summary");
summaryElement.innerHTML = shoppingCartSummary(cart);


loadHeaderFooter();

