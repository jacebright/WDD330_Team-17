import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let discountBool = false;
  let flag = "";
  

  if (product.FinalPrice < product.SuggestedRetailPrice) {
    discountBool = true;
    flag = "Item discounted";
  } else {
    discountBool = false;
    
  };

  return `<div class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice} <span class="discount-flag">${flag}</span></p></a>
</div>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    /* const list = await this.dataSource.getData(); */
    const list = await this.dataSource.getData(this.category);
    

    /* getData() {
      return fetch(this.path)
        .then(convertToJson)
        .then((data) => data);
    } */

    /* const filteredList = list.filter((tent) => tent.Id != "989CG" && tent.Id != "880RT"); */
    // render the list
    this.renderList(list);
    document.querySelector("title").innerHTML = this.category;
  }
  // render after doing the first stretch
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
    
  }
}
