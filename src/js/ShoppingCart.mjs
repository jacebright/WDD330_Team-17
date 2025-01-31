import { getLocalStorage } from "./utils.mjs";


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <span class="cart-card__remove" data-id="${item.Id}">❌</span>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
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
  renderCartContents() {
    const cartItems = getLocalStorage(this.storageKey);
    let htmlItems = [];
    this.total = 0;
    if (cartItems !== null) {
      htmlItems = cartItems.map((item) => cartItemTemplate(item));
      cartItems.forEach(element => {
        this.total += element.FinalPrice;
      });
    }
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

    const removeBtns = document.querySelectorAll(".cart-card__remove");
    removeBtns.forEach((btn)=>{
      btn.addEventListener("click",()=>{
        
        const productId = btn.getAttribute("data-id");
        const items = getLocalStorage(this.storageKey);
        
        //Find index of item in list
        const ids = items.map((item)=>item.Id)
        const index = ids.indexOf(productId);

        //remove item from list and save list
        items.splice(index,1);
        localStorage.setItem(this.storageKey,JSON.stringify(items))
        
        //Rerender List
        this.renderCartContents();
        
        //Update Cart Total
        if (items.length > 0) 
          document.getElementsByClassName("cart-total")[0].innerHTML = `Total: $${this.total}`;
        else
          document.querySelector(".cart-footer").classList.add("hide");
      })
    })
}
}
