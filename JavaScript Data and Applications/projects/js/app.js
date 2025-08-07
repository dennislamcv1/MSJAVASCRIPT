// @ts-check

/**
 * @file Initializes the application, sets up event listeners and initial UI state.
 */

/**
 * Sets up the category filter buttons in the UI.
 * Creates an "All" button and then a button for each unique category.
 * @returns {void}
 */
function setupCategoryButtons() {
  const categoryContainer = document.getElementById('category-buttons')
  if (!categoryContainer) {
    console.error('Category buttons container (#category-buttons) not found in DOM.')
    return
  }

  // Create and add the "All" button
  let allButton = document.createElement('button')
  allButton.className = 'category-btn active' // "All" is active by default
  allButton.textContent = 'All'
  allButton.dataset.category = 'all'
  allButton.onclick = () => filterByCategory('all')
  categoryContainer.appendChild(allButton)

  // Create and add a button for each category from the global 'categories' array
  categories.forEach(category => {
    // 'categories' is globally available from menu-data.js
    const button = document.createElement('button')
    button.className = 'category-btn'
    button.textContent = category
    button.dataset.category = category
    button.onclick = () => filterByCategory(category)
    categoryContainer.appendChild(button)
  })
}

/**
 * Main application initializer.
 * This function is called once the DOM is fully loaded.
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
  setupCategoryButtons() // Set up the category filter buttons

  filterByCategory('all') // Display the initial menu (all items)

  updateCartDisplay() // Ensure the cart displays its initial state (e.g., "empty")
})
