import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// Data Structure

let productsHTML = "";

products.forEach((product) => {
  // vvv Accumulator Pattern vvv
  productsHTML += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
    ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
      ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${formatCurrency(product.priceCents)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-select-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
      product.id
    }">
      Add to Cart
    </button>
  </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

function AddedMessageVisible(productId, addedMessageTimeoutId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add("added-to-cart-visible");

  if (addedMessageTimeoutId) {
    clearTimeout(addedMessageTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove("added-to-cart-visible");
  }, 2000);

  addedMessageTimeoutId = timeoutId;
}

updateCartQuantity();

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  let addedMessageTimeoutId;

  button.addEventListener("click", () => {
    // const productId = button.dataset.productId;
    const { productId } = button.dataset;
    const selectEls = document.querySelector(
      `.js-quantity-select-${productId}`
    );
    const selectValue = Number(selectEls.value);
    addToCart(productId, selectValue);
    updateCartQuantity();
    AddedMessageVisible(productId, addedMessageTimeoutId);
  });
});
const searchInputElm = document.querySelector(".search-bar");
const productsGrid = document.querySelector(".js-products-grid");

function updateSearch() {
  let newProductsHTML = "";
  const searchInputValue = searchInputElm.value;
    products.forEach((product) => {
      product.keywords.forEach((keyword) => {
        if (keyword === searchInputValue) {
          newProductsHTML += `
            <div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src="${product.image}">
              </div>
          
              <div class="product-name limit-text-to-2-lines">
              ${product.name}
              </div>
          
              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
              </div>
          
              <div class="product-price">
                $${formatCurrency(product.priceCents)}
              </div>
          
              <div class="product-quantity-container">
                <select class="js-quantity-select-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
          
              <div class="product-spacer"></div>
          
              <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
              </div>
          
              <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
                product.id
              }">
                Add to Cart
              </button>
            </div>
          `;
          productsGrid.style.display = "grid";
          productsGrid.style.height = "100%";
          document.querySelector(".js-products-grid").innerHTML =
            newProductsHTML;
        }
      });
    });
    if (newProductsHTML === "") {
      productsGrid.style.display = "flex";
      productsGrid.style.height = "70vh";
      productsGrid.style.justifyContent = "center";
      productsGrid.style.alignItems = "center";

      productsGrid.innerHTML = `<h1 style="color: darkred">"${searchInputElm.value}" is not found</h1>`;
    }
}

searchInputElm.addEventListener("keyup", (e) => {
  if (e.key === 'Enter') {
    updateSearch()
  } else if (searchInputElm.value === "") {
    productsGrid.style.display = "grid";
    productsGrid.style.height = "100%";
    productsGrid.innerHTML = productsHTML;
  }
});

document.querySelector('.js-search-button').addEventListener('click', () => {
  updateSearch();
})
