import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductListing.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
// first create an instance of our ExternalServices class.
const dataSource = new ExternalServices();
// then get the element we want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show our products
myList.init();

document.getElementsByClassName("title")[0].innerHTML = category;

document.getElementById("sortPrice").addEventListener("click", () => {
  myList.sortByPrice();
});
document.getElementById("sortName").addEventListener("click", () => {
  myList.sortByName();
});
