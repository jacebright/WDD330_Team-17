import ProductData from "./ProductData.mjs";
import ProductList from "./ProductListing.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();
