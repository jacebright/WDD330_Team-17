import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="../product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.list;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    this.list = await this.dataSource.getData(this.category);

    const filteredList = this.list.filter((tent) => tent.Id != "989CG" && tent.Id != "880RT");
    // render the list
    this.renderList(filteredList);
  }
  // render after doing the first stretch
  renderList(sampleList) {
    renderListWithTemplate(productCardTemplate, this.listElement, sampleList);
  }
  compareByPrice(a,b) {
    // A helper function to sort the elements of a list of json objects
    if (a.FinalPrice < b.FinalPrice) {
      return -1;
    }
    if (a.FinalPrice > b.FinalPrice) {
      return 1;
    }
    return 0;
  }
  sortByPrice(){
    // Call the helper function and sort by price
    this.listElement.innerHTML = "";
    this.renderList(this.list.sort(this.compareByPrice));
  }
  compareByName(a,b) {
   // A helper function to sort the elements of a list of json objects
    if (a.Name < b.Name) {
      return -1;
    }
    if (a.Name > b.Name) {
      return 1;
    }
    return 0;
  }
  sortByName(){
    // Call the helper function and sort by name
    this.listElement.innerHTML = "";
    this.renderList(this.list.sort(this.compareByName));
    
  }

  
}
