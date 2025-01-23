// The purpose of this script will be to generate a list of product cards in HTML from an array.
import ProductData from "./ProductData.mjs";


function productUlElement(element) {
    return `<li class="product-card">
        <a href="product_pages/?product=${element.Id}">
        <img
          src="${element.Image}"
          alt="${element.Name}"
        />
        <h3 class="card__brand">${element.Brand.Name}</h3>
        <h2 class="card__name">${element.Name}</h2>
        <p class="product-card__price">${element.FinalPrice}</p></a>
      </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        try {
            const products = await this.dataSource.getData();

            //Using the category to filter them
/*             const filteredProducts = products.filter((product) => product.category === this.category);
 */            
            this.renderProductList(products);

        } catch (error) {
            console.error("Error initializing product listing:", error);
        }
        
    }



    renderProductList(products) {

        products.forEach(product => {
            
            const productItem = document.createElement("li");
            productItem.className = "product-card";

            productItem.innerHTML = `
                <a href="product_pages/?product=${product.Id}">
                <img
                src="${product.Image}"
                alt="${product.Name}"
                />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.Name}</h2>
                <p class="product-card__price">${product.FinalPrice}</p></a>
            `;

            this.listElement.appendChild(productItem);
        });

    }

    
}