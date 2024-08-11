const addBtns = document.getElementsByClassName("plus");
const minusBtns = document.getElementsByClassName("minus");
const inputBoxes = document.getElementsByClassName("input-box");
const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

const products = [
  { id: 1, name: "Yellow Banana Bunch", price: 40 },
  { id: 2, name: "Yellow Banana", price: 62 },
  { id: 3, name: "Yellow Banana (sexy)", price: 69 },
  { id: 4, name: "Dark Banana Bunch", price: 100 },
  { id: 5, name: "Yellow Banana Taped To Wall", price: 1000 },
  { id: 6, name: "Green Banana Bunch", price: 23 },
  { id: 7, name: "Red Banana Bunch", price: 658 },
  { id: 8, name: "Blue Banana", price: 3 },
];

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((banana) => {
      totalCountPerProduct[banana.id] = (totalCountPerProduct[banana.id] || 0) + 1;
    });

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    if (currentProductCount > 1) {
      currentProductCountSpan.textContent = `${currentProductCount}x`;
    } else {
      productsContainer.innerHTML += `
      <div id="banana${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>${name}:
        </p>
        <p>$${price}</p>
      </div>
      `;
    }
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    const isCartCleared = confirm("Are you sure you want to clear all items from your shopping cart?");

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
}

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart");

[...addToCartBtns].forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const productId = products[index].id;
    const quantity = parseInt(inputBoxes[index].value) || 1;
    for (let i = 0; i < quantity; i++) {
      cart.addItem(productId, products);
    }
    totalNumberOfItems.textContent = cart.getCounts();
    cart.calculateTotal();
  });
});

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));

[...addBtns].forEach((btn, index) => {
  btn.addEventListener("click", () => {
    inputBoxes[index].value = parseInt(inputBoxes[index].value) + 1;
  });
});

[...minusBtns].forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (inputBoxes[index].value > 1) {
      inputBoxes[index].value = parseInt(inputBoxes[index].value) - 1;
    }
  });
});
