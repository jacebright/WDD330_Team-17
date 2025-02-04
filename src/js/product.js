import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter, renderBreadcrumbs } from "./utils.mjs";

const dataSource = new ExternalServices();
const productId = getParam("product");

const prod = new ProductDetails(productId, dataSource);


loadHeaderFooter();

async function init() {
    await prod.init();

    console.log(prod);
    const category = prod.product.Category;
    const prodName = prod.product.Name;
    console.log(`This is the category: ${category}`);
    console.log(`This is the prod name: ${prodName}`);


    const pageCont = "product-page";
    console.log(pageCont);
    renderBreadcrumbs(pageCont, category, prodName);

}
init();


