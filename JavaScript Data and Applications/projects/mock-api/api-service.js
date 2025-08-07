// @ts-check

/**
 * @file Mock API service that intercepts fetch calls to simulate a backend.
 * Handles /api/menu (GET) and /api/orders (POST).
 */

console.log('Mock API service initializing...')

// Store the original fetch function to call it for unhandled routes, if necessary.
const originalFetch = window.fetch

const mockMenuData = [
  { id: 1, name: 'Burger (API)', price: 9.5, category: 'Mains' },
  { id: 2, name: 'Pizza (API)', price: 11.5, category: 'Mains' },
  { id: 3, name: 'Salad (API)', price: 7.5, category: 'Sides' },
  { id: 4, name: 'Fries (API)', price: 4.5, category: 'Sides' },
  { id: 5, name: 'Soda (API)', price: 2.5, category: 'Drinks' },
  { id: 6, name: 'Ice Cream (API)', price: 3.75, category: 'Desserts' }
]

// Simple in-memory store for submitted orders for potential future use by mock API
const submittedOrders = []

window.fetch = async (url, options) => {
  console.log(`[Mock API] Intercepted fetch to: ${url}`, 'Options:', options)

  // Log X-API-Key if present
  if (options && options.headers && options.headers['X-API-Key']) {
    console.log(`[Mock API] Request included X-API-Key: ${options.headers['X-API-Key']}`)
  } else if (options && options.headers) {
    console.log(`[Mock API] Request headers:`, options.headers)
  }

  if (url === '/api/menu' && (!options || options.method === 'GET' || !options.method)) {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    console.log('[Mock API] Responding to /api/menu with mockMenuData.')
    return {
      ok: true,
      status: 200,
      json: async () => JSON.parse(JSON.stringify(mockMenuData)) // Return a copy
    }
  } else if (url === '/api/orders' && options && options.method === 'POST') {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
    try {
      if (!options.body) {
        throw new Error('Request body is missing for POST /api/orders.')
      }
      const orderData = JSON.parse(String(options.body)) // Ensure body is treated as string before parsing

      if (!orderData.items || orderData.items.length === 0) {
        console.error('[Mock API] Invalid order data: No items in order.', orderData)
        return {
          ok: false,
          status: 400, // Bad Request
          json: async () => ({ success: false, error: 'Invalid order data: No items in order.' })
        }
      }

      const orderId = `BBO-${Math.floor(Math.random() * 10000) + 1000}`
      const newOrder = { ...orderData, orderId, submittedAt: new Date().toISOString() }
      submittedOrders.push(newOrder)

      console.log('[Mock API] Processed order for /api/orders. New order:', newOrder)
      return {
        ok: true,
        status: 201, // Created
        json: async () => ({
          success: true,
          orderId: orderId,
          estimatedTime: '25 minutes',
          orderDetails: newOrder
        })
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error processing order.'
      console.error(
        '[Mock API] Error processing order for /api/orders:',
        errorMessage,
        'Original body:',
        options.body
      )
      return {
        ok: false,
        status: 400, // Bad Request due to parsing or validation
        json: async () => ({ success: false, error: errorMessage })
      }
    }
  }

  // Fallback for unhandled routes
  console.warn(`[Mock API] Unhandled endpoint: ${url}. Attempting to use original fetch.`)
  if (originalFetch) {
    return originalFetch.call(window, url, options)
  } else {
    const errorMessage = `Mock API endpoint not handled: ${url}`
    console.error(errorMessage)
    return Promise.resolve({
      ok: false,
      status: 404,
      json: async () => ({ success: false, error: errorMessage })
    })
  }
}

console.log(
  'Mock API service (with /api/menu and /api/orders) initialized and patched window.fetch.'
)
