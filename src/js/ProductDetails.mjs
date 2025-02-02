import { setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"><h3>${product.Brand.Name}</h3>
            <h2 class="divider">${product.NameWithoutBrand}</h2>

            <img class="divider"
                src="${product.Images.PrimaryLarge}"
                alt="${product.NameWithoutBrand}" />

            <p class="product-card__price">Original Price: <s>$${product.SuggestedRetailPrice}</s></p>

            <h2 class="product-card__price">Actual Price: $${product.FinalPrice}</h2>

            <p class="product__color">${product.Colors[0].ColorName}</p>

            <p class="product__description">
                ${product.DescriptionHtmlSimple}
            </p>
            <div class="product-detail__add">
                <button id="addToCart" data-id="344YJ">Add to Cart</button>
            </div></section>`;

}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click",this.addToCart.bind(this));
      document
      .getElementById("addToCart")
      .addEventListener("click",()=>{
        const cart = document.querySelector(".cart");
        const growShrink = [
          { transform: "scale(1)" },
          { transform: "scale(2)" },
          { transform: "scale(1)" },
        ];
        const growShrinkTime = {
          duration: 2000,
          iterations: 1,
        };
        window.scrollTo({ top: 0, behavior: 'smooth' });
        cart.animate(growShrink, growShrinkTime);
      });
    }

  addToCart() {
    setLocalStorage("so-cart", this.product)
  }

  addProductToCart(product) {
    setLocalStorage("so-cart", product);
  }
  
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.innerHTML = productDetailsTemplate(this.product);
  }
}


