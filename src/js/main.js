import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";


const prodData = new ProductData("tents");

const productListElement = document.querySelector(".product-list");

const prodList = new ProductListing("tents", prodData, productListElement);

prodList.init();