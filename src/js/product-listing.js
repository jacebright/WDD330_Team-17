import ProductData from "./ProductData.mjs";
import ProductList from "./ProductListing.mjs";
import { getParam } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const cat = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(cat, dataSource, element);

listing.init();