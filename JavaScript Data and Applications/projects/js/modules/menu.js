// @ts-check

/**
 * @file Manages the display of menu items and category filtering logic.
 * It uses JSDoc type annotations referencing types from 'types/order-types.ts'.
 */

/**
 * Creates the HTML string for a single menu item to be displayed.
 * This is a helper function called by `displayMenuItems`.
 * @param {MenuItem} menuItem - The menu item object.
 * @returns {string} The HTML string representing the menu item for display.
 */
function createMenuItemHTML(menuItem) {
  // This function was refactored in M1L3 to return the full item HTML string
  return `
        <div class="menu-item">
            <div class="menu-item-details">
                <span>${menuItem.name} - $${menuItem.price.toFixed(2)}</span>
                <span class="menu-item-category">${menuItem.category}</span>
            </div>
            <button onclick="addToCart(${menuItem.id})">Add to Cart</button>
        </div>
    `
}

/**
 * Displays an array of menu items in the UI.
 * Optimized in M1L4 (Performance Lab) to build an HTML string and update DOM once.
 * Includes performance timing.
 * @param {Array<MenuItem>} menuItemsToDisplay - Array of menu item objects to display.
 * @returns {void}
 */
function displayMenuItems(menuItemsToDisplay) {
  const startTime = performance.now() // For measuring

  const menuItemsContainer = document.getElementById('menu-items')
  if (!menuItemsContainer) {
    console.error('Menu items container (#menu-items) not found in DOM.')
    const endTimeOnError = performance.now()
    console.log(
      `displayMenuItems (error finding container) took ${endTimeOnError - startTime} milliseconds.`
    )
    return
  }

  menuItemsContainer.innerHTML = ''

  if (!menuItemsToDisplay || menuItemsToDisplay.length === 0) {
    menuItemsContainer.innerHTML = '<p>No menu items match your selection.</p>'
    const endTimeEmpty = performance.now()
    console.log(`displayMenuItems (empty list) took ${endTimeEmpty - startTime} milliseconds.`)
    return
  }

  let allItemsHTML = ''
  menuItemsToDisplay.forEach(item => {
    allItemsHTML += createMenuItemHTML(item) // Use the helper that returns full item HTML
  })

  menuItemsContainer.innerHTML = allItemsHTML

  const endTime = performance.now()
  console.log(
    `displayMenuItems (rendered ${menuItemsToDisplay.length} items) took ${
      endTime - startTime
    } milliseconds.`
  )
}

/**
 * Filters the main menu based on the selected category and updates the display.
 * @param {string} category - The category to filter by. Use "all" to show all items.
 * @returns {void}
 */
function filterByCategory(category) {
  let filteredMenu
  if (category === 'all') {
    filteredMenu = menu // 'menu' is global
  } else {
    // BUG FIXED: Only filter by the passed 'category'
    filteredMenu = menu.filter(item => item.category === category)
  }
  displayMenuItems(filteredMenu)

  const buttons = document.querySelectorAll('.category-btn')
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category)
  })

  // do not remove the line below this - it is needed for the grader in this lab
  return filteredMenu
}

// addToCart is defined in js/modules/cart.js
