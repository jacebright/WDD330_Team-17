import { renderListWithTemplate } from "./utils.mjs";

export function productCardTemplate(product){
    return `
        <li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
                <img src="${product.Image}" alt="Image of ${product.Name}">
                <h3 class="card_brand">${product.Brand.Name}</h3>
                <h2 class="card_name">${product.Name}</h2>
                <p class="product-card__price">$${product.ListPrice}</p>
            </a>
        </li>
    `
}

export function filterProductList(productList, field, values){
    return productList.filter((product)=>values.includes(product[field]))
}

export default class ProductListing{

    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.data = undefined
    }

    async init(){
        this.data = await this.dataSource.getData();
        this.renderList(filterProductList(this.data,"Id",["880RR","985RF","985PR", "344YJ"]))
    }

    renderList(productList){
        renderListWithTemplate(productCardTemplate,this.listElement,productList,'afterbegin',true)
    }
}