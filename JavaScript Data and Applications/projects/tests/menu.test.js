// @ts-check

describe('Menu Filtering Logic - filterByCategory', function () {
  // This testMenuData is used to make tests independent of the actual app's data
  const testMenuData = [
    { id: 1, name: 'Burger', price: 8.99, category: 'Mains' },
    { id: 2, name: 'Salad', price: 6.99, category: 'Sides' },
    { id: 3, name: 'Pizza', price: 10.99, category: 'Mains' },
    { id: 4, name: 'Fries', price: 3.99, category: 'Sides' },
    { id: 5, name: 'Soda', price: 1.99, category: 'Drinks' }
  ]

  // Store original menu and displayMenuItems to restore them after tests
  let originalGlobalMenu
  let originalDisplayMenuItems

  function setupMenuForTest() {
    originalGlobalMenu = window.menu // Save global menu
    window.menu = [...testMenuData] // Use a copy of test data for the global menu

    originalDisplayMenuItems = window.displayMenuItems // Save original
    // Mock displayMenuItems to prevent DOM manipulation during these logic tests
    window.displayMenuItems = function (items) {
      // console.log("Mocked displayMenuItems called with:", items);
    }
    // Also mock the part that updates button active states
    const originalQuerySelectorAll = document.querySelectorAll
    document.querySelectorAll = function (selector) {
      if (selector === '.category-btn') return [] // Return empty array to prevent errors
      return originalQuerySelectorAll.call(document, selector)
    }
  }

  function teardownMenuForTest() {
    window.menu = originalGlobalMenu // Restore global menu
    window.displayMenuItems = originalDisplayMenuItems // Restore original
    document.querySelectorAll = Node.prototype.querySelectorAll // Restore original
  }

  test('should return only "Mains" items when filtering by "Mains"', function () {
    setupMenuForTest()
    // TEMPORARILY MODIFY filterByCategory in menu.js to return filteredMenu for this test
    // And comment out its calls to displayMenuItems and the button active state updates.
    const result = filterByCategory('Mains') // Assuming filterByCategory now returns the array

    expect(result.length).toBe(2)
    result.forEach(item => expect(item.category).toBe('Mains'))
    teardownMenuForTest()
  })

  test('should return all items when filtering by "all"', function () {
    setupMenuForTest()
    // TEMPORARILY MODIFY filterByCategory as above
    const result = filterByCategory('all')

    expect(result.length).toBe(testMenuData.length)
    // Optionally, a more robust check that all original items are present
    testMenuData.forEach(originalItem => {
      expect(result.some(filteredItem => filteredItem.id === originalItem.id)).toBe(true)
    })
    teardownMenuForTest()
  })

  test('should return only "Drinks" items when filtering by "Drinks"', function () {
    setupMenuForTest()
    // TEMPORARILY MODIFY filterByCategory as above
    const result = filterByCategory('Drinks')

    expect(result.length).toBe(1)
    expect(result[0].category).toBe('Drinks')
    teardownMenuForTest()
  })

  test('should return an empty array when filtering by a non-existent category', function () {
    setupMenuForTest()
    // TEMPORARILY MODIFY filterByCategory as above
    const result = filterByCategory('NonExistentCategory')

    expect(result.length).toBe(0)
    teardownMenuForTest()
  })

  // REMEMBER TO INSTRUCT LEARNER TO REVERT TEMPORARY CHANGES TO filterByCategory in menu.js
})
