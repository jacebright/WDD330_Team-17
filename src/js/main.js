import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const product1 = new ProductData("tents");
const topProducts = document.querySelector(".product-list");
const products1 = new ProductList("Tents", product1, topProducts);

products1.init();
