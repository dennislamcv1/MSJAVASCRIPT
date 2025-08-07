// @ts-check

describe('Initial Test Setup', function () {
  test('should pass this basic truthy test', function () {
    expect(true).toBe(true)
  })

  test('calculateTotal function should be defined', function () {
    expect(typeof calculateTotal).toBe('function')
  })
})

describe('Cart Calculations - calculateTotal', function () {
  test('should return 0 for an empty cart', function () {
    const testCart = [] // Arrange
    const total = calculateTotal(testCart) // Act - Pass the cart
    expect(total).toBe(0) // Assert
  })

  test('should return the correct total for a single item', function () {
    const testCart = [{ id: 1, name: 'Burger', price: 8.99, category: 'Mains', quantity: 1 }] // Arrange
    const total = calculateTotal(testCart) // Act - Pass the cart
    expect(total).toBe(8.99) // Assert
  })

  test('should return the correct total for multiple items with varying quantities', function () {
    const testCart = [
      // Arrange
      { id: 1, name: 'Burger', price: 10.0, category: 'Mains', quantity: 2 }, // 20.00
      { id: 2, name: 'Fries', price: 5.0, category: 'Sides', quantity: 1 }, // 5.00
      { id: 3, name: 'Soda', price: 2.5, category: 'Drinks', quantity: 3 } // 7.50
    ]
    const total = calculateTotal(testCart) // Act - Pass the cart
    expect(total).toBe(32.5) // Assert
  })

  test('should handle items with zero price correctly', function () {
    const testCart = [
      // Arrange
      { id: 1, name: 'Free Item', price: 0.0, category: 'Promo', quantity: 1 },
      { id: 2, name: 'Burger', price: 10.0, category: 'Mains', quantity: 1 }
    ]
    const total = calculateTotal(testCart) // Act - Pass the cart
    expect(total).toBe(10.0) // Assert
  })
})
