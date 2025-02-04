import { loadHeaderFooter, renderBreadcrumbs } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cart = new ShoppingCart("so-cart", ".product-list");

cart.renderCartContents();

const prodUl = document.querySelector("ul");

if (prodUl.children.length > 0) {
  document.querySelector("div").classList.remove("hide");
  document.getElementsByClassName("cart-total")[0].innerHTML =
    `Total: $${cart.total}`;
}

loadHeaderFooter();

const pageCont = "cart";
renderBreadcrumbs(pageCont);
