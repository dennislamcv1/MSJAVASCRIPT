// @ts-check

/**
 * @file Defines custom error types and error handling utility for the application.
 */

/**
 * Custom error class for order-related issues.
 * @class OrderError
 * @extends {Error}
 */
class OrderError extends Error {
  /**
   * Creates an instance of OrderError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message)
    this.name = 'OrderError'
  }
}

/**
 * Handles and displays error messages in the UI.
 * @param {Error|OrderError} error - The error object to handle.
 * @returns {void}
 */
function handleError(error) {
  const errorContainer = document.getElementById('error-container')
  if (!errorContainer) {
    // Fallback if the error container isn't in the DOM for some reason
    console.error(
      'Error container (#error-container) not found in DOM. Original error message:',
      error.message
    )
    return
  }

  const errorDiv = document.createElement('div')
  errorDiv.className = 'error-message' // Styled in styles.css
  errorDiv.textContent = error.message

  errorContainer.appendChild(errorDiv)

  // Automatically remove the error message after 3 seconds
  setTimeout(() => {
    errorDiv.remove()
  }, 3000)
}
