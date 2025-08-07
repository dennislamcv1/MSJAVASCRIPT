// @ts-check
/**
 * @file Simple Test Framework Setup
 * Provides basic describe, test, expect, and runTests functions for in-browser testing.
 */
;(function () {
  const TestFramework = {
    suites: [], // To hold describe blocks
    currentSuite: null, // To track the current describe block
    totalTests: 0,
    passed: 0,
    failed: 0,

    describe: function (description, suiteFn) {
      console.log(`\n%cSuite: ${description}`, 'color: blue; font-weight: bold;')
      const suite = { description, tests: [], passed: 0, failed: 0 }
      this.suites.push(suite)
      this.currentSuite = suite
      try {
        suiteFn()
      } catch (e) {
        console.error(`Error in describe block "${description}":`, e)
        // Optionally mark the whole suite as failed or handle differently
      }
      this.currentSuite = null // Reset current suite
    },

    test: function (description, testFn) {
      if (!this.currentSuite) {
        // If test is called outside a describe, create a default suite
        this.describe('Default Test Suite', () => {})
        // this.currentSuite should now be set to the default suite
      }
      this.totalTests++
      const testCase = { description, fn: testFn, passed: false, error: null }
      this.currentSuite.tests.push(testCase)

      try {
        testFn()
        testCase.passed = true
        this.passed++
        this.currentSuite.passed++
        console.log(`  %c✓ ${description}`, 'color: green;')
      } catch (assertionError) {
        testCase.passed = false
        testCase.error = assertionError
        this.failed++
        this.currentSuite.failed++
        console.error(`  %c✗ ${description}`, 'color: red;')
        console.error('    Error:', assertionError.message || assertionError)
        if (assertionError.stack) {
          // Clean up stack trace a bit for readability
          const stackLines = assertionError.stack.split('\n')
          const relevantStack = stackLines.slice(0, 5).join('\n') // Show first few lines
          console.error('    Stack:', relevantStack)
        }
      }
    },

    expect: function (actual) {
      return {
        toBe: function (expected) {
          if (actual === expected) {
            // This specific expect doesn't log success itself, test() function does.
            return true
          } else {
            throw new Error(`Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`)
          }
        },
        toEqual: function (expected) {
          // Simple deep equal for objects/arrays (can be more robust)
          if (JSON.stringify(actual) === JSON.stringify(expected)) {
            return true
          } else {
            throw new Error(
              `Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`
            )
          }
        },
        toContain: function (expectedSubstring) {
          if (typeof actual === 'string' && actual.includes(expectedSubstring)) {
            return true
          } else if (
            Array.isArray(actual) &&
            actual.some(item => JSON.stringify(item) === JSON.stringify(expectedSubstring))
          ) {
            return true // Simple check for array containment
          } else {
            throw new Error(
              `Expected ${JSON.stringify(actual)} to contain ${JSON.stringify(expectedSubstring)}`
            )
          }
        },
        toThrow: function (expectedErrorMessageSubstring) {
          let didThrow = false
          let actualError = null
          try {
            actual() // Call the function that is expected to throw
          } catch (e) {
            didThrow = true
            actualError = e
          }

          if (!didThrow) {
            throw new Error('Expected function to throw an error, but it did not.')
          }

          if (expectedErrorMessageSubstring) {
            const errorMessage = actualError.message || String(actualError)
            if (!errorMessage.includes(expectedErrorMessageSubstring)) {
              throw new Error(
                `Expected error message to include "${expectedErrorMessageSubstring}", but got "${errorMessage}"`
              )
            }
          }
          // If we reach here, it threw, and if message was expected, it matched.
          return true
        }
        // Add more matchers like toBeTruthy, toBeFalsy, toHaveLength etc. as needed
      }
    },

    runTests: function () {
      console.log(
        '%c\n--- Running All Test Suites ---',
        'color: purple; font-size: 1.2em; font-weight: bold;'
      )
      this.totalTests = 0
      this.passed = 0
      this.failed = 0

      // Re-run all collected tests
      // This is a simplified re-run; ideally, tests are executed as they are defined.
      // For this structure, we'll just log a summary based on prior execution.
      // To truly re-run, we'd need to store testFn and call them again.
      // Let's modify `test` to not auto-increment global passed/failed, and `runTests` to actually run them.

      // Reset counters for a fresh run
      this.suites.forEach(suite => {
        suite.passed = 0
        suite.failed = 0
        suite.tests.forEach(testCase => {
          this.totalTests++ // Count total tests defined
          try {
            testCase.fn() // Execute the test function again
            testCase.passed = true
            suite.passed++
            this.passed++
            console.log(`  %c✓ ${testCase.description}`, 'color: green;')
          } catch (assertionError) {
            testCase.passed = false
            testCase.error = assertionError
            suite.failed++
            this.failed++
            console.error(`  %c✗ ${testCase.description}`, 'color: red;')
            console.error('    Error:', assertionError.message || assertionError)
          }
        })
      })

      console.log('%c\n--- Test Summary ---', 'color: purple; font-size: 1.2em; font-weight: bold;')
      this.suites.forEach(suite => {
        const color = suite.failed > 0 ? 'red' : 'green'
        console.log(
          `%cSuite: ${suite.description} - Passed: ${suite.passed}, Failed: ${suite.failed}, Total: ${suite.tests.length}`,
          `color: ${color};`
        )
      })
      const overallColor = this.failed > 0 ? 'red' : 'green'
      console.log(
        `%c\nOverall: Passed: ${this.passed}, Failed: ${this.failed}, Total Tests: ${this.totalTests}`,
        `color: ${overallColor}; font-weight: bold;`
      )
      console.log('%c----------------------', 'color: purple;')

      // Clear suites for next potential manual run, or adjust logic if tests are only run once.
      // For this lab, we'll clear them so runTests() can be called multiple times with a fresh execution.
      this.suites = []
      this.currentSuite = null
    }
  }

  window.describe = TestFramework.describe.bind(TestFramework)
  window.test = TestFramework.test.bind(TestFramework) // test will collect tests
  window.it = TestFramework.test.bind(TestFramework) // Alias for test
  window.expect = TestFramework.expect.bind(TestFramework)
  window.runTests = TestFramework.runTests.bind(TestFramework) // runTests will execute collected tests

  console.log('Simple Test Framework Loaded. Call runTests() to execute.')
})()
