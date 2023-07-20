import products from "../../Models/Products/products.js";
import carts from "../../Models/Carts/carts.js";


class Actions {

  static async getAll() {
    const data = await products.getAllProducts()
    return data;
  }
  static getOne(id) {
    return products.getProduct(id);
  }
  static add(product) {
    return products.addProduct(product);
  }
  static update(id, newContent) {
    return products.updateProduct(id, newContent);
  }
  static delete(id) {
    return products.deleteProduct(id);
  }

  static createCart(prods) {
    return carts.createCart(prods).id;
  }

  static deleteCart(id) {
    return carts.deleteCart(id);
  }

  static async getCartProducts(id) {
    const carrito = await cart.getCart(id);

    const array = carrito.products
    return array;
  }

  static async addToCart(id, productId) {
    const product = await this.getOne(productId);
    console.log(product);
    return carts.addToCart(id, product);
  }

  static deleteFromCart(id, productId) {
    return carts.deleteFromCart(id, productId);
  }
}

export default Actions;

