let quantity = 1;
function addToCart(product) {
    quantity = parseInt(
        document.getElementById(`${product._id}`).textContent
    );
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(
        (item) => item.product._id === product._id
    );
    if (existingItem) {
        existingItem.quantity += quantity;
        toast(`${product.name} quantity updated in cart!`, "success");
    } else {
        cart.push({ product: product, quantity: quantity });
        toast(`${product.name} added to cart!`, "success");
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}
function removeFromCart(productId) {
    quantity = parseInt(
        document.getElementById(`${productId}`).textContent
    );
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter(
        (item) => item.product._id !== productId
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast(`Item removed from cart!`, "error");
}
function increaseQuantity(id) {
    quantity = parseInt(document.getElementById(`${id}`).textContent);
    let quantity_text = document.getElementById(`${id}`);
    quantity++;
    quantity_text.textContent = quantity;
}
function decreaseQuantity(id) {
    quantity = parseInt(document.getElementById(`${id}`).textContent);
    let quantity_text = document.getElementById(`${id}`);
    if (quantity > 1) {
        quantity--;
        quantity_text.textContent = quantity;
    }
}