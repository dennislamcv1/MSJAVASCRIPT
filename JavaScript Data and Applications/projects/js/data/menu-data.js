// @ts-check

/**
 * @file Defines the menu data and derives available categories.
 */

/**
 * Array of menu item objects.
 * Each item should conform to the MenuItem interface.
 * @type {Array<MenuItem>}
 */
const menu = [
  { id: 1, name: 'Burger', price: 8.99, category: 'Mains' },
  { id: 2, name: 'Pizza', price: 10.99, category: 'Mains' },
  { id: 3, name: 'Salad', price: 6.99, category: 'Sides' },
  { id: 4, name: 'Fries', price: 3.99, category: 'Sides' },
  { id: 5, name: 'Soda', price: 1.99, category: 'Drinks' }
]

/**
 * Array of unique category names derived from the menu.
 * @type {Array<string>}
 */
const categories = [...new Set(menu.map(item => item.category))]
