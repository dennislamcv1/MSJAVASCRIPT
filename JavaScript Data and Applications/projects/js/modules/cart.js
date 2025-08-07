// @ts-check

/**
 * @file Manages shopping cart functionality: adding items, updating quantities,
 * calculating totals, displaying the cart, applying discounts, and validating orders.
 * It uses JSDoc type annotations referencing types from 'types/order-types.ts'.
 */

/**
 * Represents the current state of the shopping cart.
 * Each item in the array should conform to the CartItem interface.
 * @type {Array<CartItem>}
 */
let cart = []

/**
 * Configuration for the "Deal of the Day" - though not actively used for alerts after M1.
 * Kept for potential future use or if other logic depends on it.
 * @const {string}
 */
const dealOfTheDayConfigJSON = `{
    "dealItemId": 1,
    "message": "Burger is our Deal of the Day! Enjoy this special offer!"
}`

/**
 * Creates the HTML string for a single item to be displayed in the cart.
 * This is a helper function called by `updateCartDisplay`.
 * @param {CartItem} cartItem - The cart item object (expected to have id, name, price, quantity).
 * @returns {string} The HTML string representing the cart item for display.
 */
function createCartItemHTML(cartItem) {
  const itemSubtotal = (cartItem.price * cartItem.quantity).toFixed(2)
  return `
        <div class="cart-item">
            <span>${cartItem.name} (x${cartItem.quantity})</span>
            <div class="quantity-control">
                <button class="quantity-btn" onclick="updateItemQuantity(${cartItem.id}, -1)">-</button>
                <span class="quantity-display">${cartItem.quantity}</span>
                <button class="quantity-btn" onclick="updateItemQuantity(${cartItem.id}, 1)">+</button>
            </div>
            <span>$${itemSubtotal}</span>
        </div>
    `
}

/**
 * Updates the shopping cart display in the UI.
 * Clears existing cart items and re-renders based on the current state of the global `cart` array.
 * Also updates the total amount displayed.
 * @returns {void}
 */
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items')
  const totalAmountSpan = document.getElementById('total-amount')

  if (!cartItemsContainer || !totalAmountSpan) {
    console.error('Cart display elements (#cart-items or #total-amount) not found in DOM.')
    return
  }

  cartItemsContainer.innerHTML = ''

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is currently empty.</p>'
  } else {
    cart.forEach(cartItem => {
      cartItemsContainer.innerHTML += createCartItemHTML(cartItem)
    })
  }
  // Pass the global cart to the refactored calculateTotal
  totalAmountSpan.textContent = calculateTotal(cart).toFixed(2)
}

/**
 * Adds a menu item to the global `cart` array or increments its quantity if it's already present.
 * Displays an error if the menu item is not found.
 * @param {number|string} itemId - The ID of the menu item to add. Will be parsed to a number.
 * @returns {void}
 */
function addToCart(itemId) {
  try {
    const numericItemId = parseInt(String(itemId))
    // 'menu' is a global array from js/data/menu-data.js
    const menuItem = menu.find(item => item.id === numericItemId)

    if (!menuItem) {
      throw new OrderError('Sorry, this menu item could not be found. Please try another.')
    }

    const cartItem = cart.find(item => item.id === numericItemId)

    if (cartItem) {
      cartItem.quantity += 1
    } else {
      cart.push({ ...menuItem, quantity: 1 })
    }

    // Deal of the day check (from M1, can be kept or removed if not a core feature)
    try {
      const dealConfig = JSON.parse(dealOfTheDayConfigJSON)
      if (numericItemId === dealConfig.dealItemId) {
        // In M1 this was an alert. For M2, we might not want alerts during testing.
        // For now, let's keep it as a console log if it was an alert before.
        console.log(dealConfig.message)
      }
    } catch (e) {
      console.error('Error parsing dealOfTheDayConfigJSON:', e)
    }

    updateCartDisplay()
  } catch (error) {
    handleError(error) // 'handleError' is a global function from js/modules/errors.js
  }
}

/**
 * Calculates the total price of items in a given cart.
 * Refactored in M2L3 to accept cartToCalculate as a parameter.
 * @param {Array<CartItem>} cartToCalculate - The cart array to calculate the total for.
 * @returns {number} The calculated total price.
 */
function calculateTotal(cartToCalculate) {
  if (!Array.isArray(cartToCalculate) || cartToCalculate.length === 0) {
    return 0
  }
  // BUG FIXED: Initial value for reduce is 0
  return cartToCalculate.reduce((total, item) => total + item.price * item.quantity, 0)
}

/**
 * Updates the quantity of an item in the global `cart` or removes it if quantity becomes zero or less.
 * Displays an error if the item is not found in the cart.
 * @param {number|string} itemId - The ID of the cart item to update. Will be parsed to a number.
 * @param {number} change - The amount to change the quantity by (e.g., 1 for increment, -1 for decrement).
 * @returns {void}
 */
function updateItemQuantity(itemId, change) {
  try {
    const numericItemId = parseInt(String(itemId))
    const cartItemIndex = cart.findIndex(item => item.id === numericItemId)

    if (cartItemIndex === -1) {
      throw new OrderError('Item not found in cart. Cannot update quantity.')
    }

    cart[cartItemIndex].quantity += change

    if (cart[cartItemIndex].quantity < 1) {
      cart.splice(cartItemIndex, 1)
    }

    updateCartDisplay()
  } catch (error) {
    handleError(error)
  }
}

/**
 * Applies a discount percentage to a total amount.
 * Returns the original amount if the discount percentage is invalid.
 * Developed via TDD in M2L3.
 * @param {number} totalAmount - The original total amount.
 * @param {number} discountPercentage - The discount percentage (e.g., 10 for 10%).
 * @returns {number} The amount after applying the discount, formatted to two decimal places.
 */
function applyDiscount(totalAmount, discountPercentage) {
  if (typeof totalAmount !== 'number' || typeof discountPercentage !== 'number') {
    console.error(
      'Invalid input for applyDiscount: totalAmount and discountPercentage must be numbers.'
    )
    return parseFloat(totalAmount.toFixed(2))
  }
  if (discountPercentage < 0 || discountPercentage > 100) {
    return parseFloat(totalAmount.toFixed(2))
  }
  const discountFactor = discountPercentage / 100
  const discountAmount = totalAmount * discountFactor
  return parseFloat((totalAmount - discountAmount).toFixed(2))
}

/**
 * Checks if the order meets validation criteria (e.g., minimum order value).
 * Developed via TDD in M2L3. Uses the refactored calculateTotal.
 * @param {Array<CartItem>} currentCart - The cart to validate.
 * @param {number} minimumValue - The minimum order value required.
 * @returns {boolean} True if the order is valid, false otherwise.
 */
function isOrderValid(currentCart, minimumValue) {
  if (!currentCart || currentCart.length === 0) {
    return false
  }
  const total = calculateTotal(currentCart)
  return total >= minimumValue
}

/**
 * Handles an attempt to place an order, checking validation first.
 * Logs messages or calls handleError based on validation.
 * Developed via TDD in M2L3.
 * @param {Array<CartItem>} currentCart - The cart for the order attempt.
 * @param {number} minimumValue - The minimum order value.
 * @returns {void}
 */
function handleOrderAttempt(currentCart, minimumValue) {
  if (isOrderValid(currentCart, minimumValue)) {
    console.log(
      'Order attempt is valid. Proceeding to next step (actual submission not implemented in this module).'
    )
    // In Module 3, this will call submitOrderToAPI
  } else {
    let message = 'Order cannot be processed due to validation errors.'
    if (!currentCart || currentCart.length === 0) {
      message = 'Cannot place an order with an empty cart.'
    } else if (calculateTotal(currentCart) < minimumValue) {
      // Recalculate for specific message
      message = `Order total is below the minimum value of $${minimumValue.toFixed(2)}.`
    }
    handleError(new OrderError(message)) // 'handleError' and 'OrderError' are global
  }
}
