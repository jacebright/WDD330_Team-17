import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


/* const productId = getParam("product");
const dataSource = new ProductData(productId);
const product = new ProductDetails(productId, dataSource); */
loadHeaderFooter();
const dataSour = new ProductData("tents");
const prodId = getParam("product");
const product = new ProductDetails(prodId, dataSour);

product.init();

/* product.init(); */


