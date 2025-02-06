import { getLocalStorage, updateCartSuperscript } from "./utils.mjs";


function cartItemTemplate(item, x) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <span class="cart-card__add" data-id="${item.Id}">➕</span>
  <span class="cart-card__remove" data-id="${item.Id}">➖</span>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty:${x}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}
export default class ShoppingCart {
  constructor(storageKey, parentSelector) {
    this.storageKey = storageKey;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  init() {

    const cartItems = getLocalStorage(this.storageKey);
    // let htmlItems = [];
    this.total = 0;
    if (cartItems !== null) {
      // htmlItems = cartItems.map((item) => cartItemTemplate(item));
      cartItems.forEach(element => {
        this.total += element.FinalPrice;
      });
    }

  }


  renderCartContents() {
    const cartItems = getLocalStorage(this.storageKey);
    let htmlItems = [];
    this.total = 0;

    if (cartItems !== null) {
      const countOfEachArrayValue = {};
      cartItems.forEach((value) => {
        const currentCountForValue = countOfEachArrayValue[value.Id] ?? 0;
        countOfEachArrayValue[value.Id] = currentCountForValue + 1;
      });
      const key = "Id";
      const unique = [...new Map(cartItems.map(item => [item[key], item])).values()];
      htmlItems = unique.map((item) => cartItemTemplate(item, countOfEachArrayValue[item.Id]));
      cartItems.forEach(element => {
        this.total += element.FinalPrice;
      });
    }
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

    const removeBtns = document.querySelectorAll(".cart-card__remove");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {

        const productId = btn.getAttribute("data-id");
        const items = getLocalStorage(this.storageKey);

        //Find index of item in list
        const ids = items.map((item) => item.Id)
        const index = ids.indexOf(productId);

        //remove item from list and save list
        items.splice(index, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(items))

        //Rerender List
        this.renderCartContents();
        updateCartSuperscript();

        //Update Cart Total
        if (items.length > 0)
          document.getElementsByClassName("cart-total")[0].innerHTML = `Total: $${this.total.toFixed(2)}`;
        else {
          document.querySelector(".cart-footer").classList.add("hide");
          document.querySelector(".empty").classList.remove("hide");
        }
      })
    })

    const addBtns = document.querySelectorAll(".cart-card__add");
    addBtns.forEach((btn) => {
      btn.addEventListener("click", () => {

        const productId = btn.getAttribute("data-id");
        const items = getLocalStorage(this.storageKey);

        //Find index of item in list
        const ids = items.map((item) => item.Id)
        const index = ids.indexOf(productId);

        //add item to list and save list
        items.splice(index, 0, items[0]);
        localStorage.setItem(this.storageKey, JSON.stringify(items))

        //Rerender List
        this.renderCartContents();
        updateCartSuperscript();

        //Update Cart Total
        if (items.length > 0)
          document.getElementsByClassName("cart-total")[0].innerHTML = `Total: $${this.total.toFixed(2)}`;
        else {
          document.querySelector(".cart-footer").classList.add("hide");
          document.querySelector(".empty").classList.remove("hide");
        }
      })
    })
  }

  tax() {
    return (this.total * 0.06).toFixed(2);
  }

  estimate() {
    const items = getLocalStorage(this.storageKey);
    const numberItems = items.length;

    return 10 + (numberItems - 1) * 2;
  }

  orderTotal() {

    const cartTax = this.tax();
    const cartEstim = this.estimate();

    return (this.total + cartTax + cartEstim).toFixed(2);

  }




}
