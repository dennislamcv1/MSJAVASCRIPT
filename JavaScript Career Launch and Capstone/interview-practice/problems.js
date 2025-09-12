/**
 * INSTRUCTIONS:
 *
 * 1. Read the problem description for each function.
 * 2. Implement the function to solve the problem.
 * 3. Add a comment explaining your approach and the time/space complexity.
 * 4. Run `node problems.js` in your terminal to see the test case results.
 *    Your solutions are correct if all test cases print `true`.
 */

const { sessions } = require('./mockData'); // Mock data is provided for you

// ===================================================================
//                           Problem 1
// ===================================================================

/**
 * @problem   Calculate Total Attendance by Speaker
 * @param   {Array<Object>} sessions - An array of session objects.
 * @returns {Object} An object where keys are speaker names and values are their total attendance.
 *
 * @example
 * const result = calculateSpeakerAttendance(sessions);
 * console.log(result);
 * // Expected output:
 * // {
 * //   "Sarah Code": 85,
 * //   "Mike Script": 75,
 * //   "Lisa Fast": 90,
 * //   "Alex Layout": 45,
 * //   "Dev Server": 68
 * // }
 */
const calculateSpeakerAttendance = (sessions) => {
  return sessions.reduce((accumulator, session) => {
    const speaker = session.speaker;
    const attendance = session.currentAttendees;
    
    // Check if speaker already exists in our accumulator
    if (accumulator[speaker]) {
      // Add to existing total
      accumulator[speaker] += attendance;
    } else {
      // Create new entry for this speaker
      accumulator[speaker] = attendance;
    }
    
    return accumulator;
  }, {});

  // **Your Explanation Here:**
  // Approach: I used the reduce() method to iterate through the sessions array once,
  // building an accumulator object that maps speaker names to their total attendance.
  // For each session, I extract the speaker name and current attendance, then either
  // add to an existing speaker's total or create a new entry if it's their first session.
  //
  // Time Complexity: O(n) - We iterate through the sessions array exactly once, where n is the number of sessions.
  // Space Complexity: O(m) - We create a new object with one key-value pair per unique speaker, where m is the number of unique speakers.
};

// ===================================================================
//                           Problem 2
// ===================================================================

/**
 * @problem   Find Sessions with High Ratings
 * @param   {Array<Object>} sessions - An array of session objects.
 * @param   {number} minAverageRating - The minimum average rating to include.
 * @returns {Array<string>} An array of the titles of sessions that meet the rating threshold.
 *
 * @example
 * const result = findHighRatedSessions(sessions, 4.5);
 * console.log(result);
 * // Expected output (order may vary):
 * // [ "Advanced JavaScript Patterns" ]
 */
const findHighRatedSessions = (sessions, minAverageRating) => {
  return sessions
    .filter(session => {
      // Calculate average rating for this session
      const sum = session.ratings.reduce((total, rating) => total + rating, 0);
      const averageRating = sum / session.ratings.length;
      
      // Return true if average meets or exceeds the minimum threshold
      return averageRating >= minAverageRating;
    })
    .map(session => session.title);

  // **Your Explanation Here:**
  // Approach: I used a "filter then map" approach by chaining .filter() and .map() methods.
  // First, I filter sessions by calculating each session's average rating using reduce() to sum
  // all ratings and dividing by the length. Sessions with averages >= minAverageRating pass the filter.
  // Then, I map the filtered sessions to extract only their titles, returning an array of strings.
  //
  // Time Complexity: O(n) - We iterate through the sessions array once for filtering, and the filtered
  // results once for mapping. The inner reduce for calculating averages operates on small, fixed-size
  // rating arrays, so it doesn't change the overall linear time complexity.
  // Space Complexity: O(n) - In the worst case where all sessions pass the filter, we create a new
  // array containing all session titles, requiring space proportional to the input size.
};


// ===================================================================
//                           TEST CASES
// ===================================================================
// You can run `node problems.js` in the terminal to run these tests.
// All tests should print `true` if your solutions are correct.
//
// DO NOT MODIFY THE TEST CASES
// ===================================================================

console.log('--- Running Tests ---');

// Test Case 1: calculateSpeakerAttendance
let attendanceResult = calculateSpeakerAttendance(sessions);
let attendanceCorrect =
  attendanceResult["Sarah Code"] === 85 &&
  attendanceResult["Mike Script"] === 75 &&
  attendanceResult["Lisa Fast"] === 90;
console.log('Test Case 1 Passed:', attendanceResult);
console.log('Test Case 1 Passed:', attendanceCorrect);

// Test Case 2: findHighRatedSessions
let highRatedResult = findHighRatedSessions(sessions, 4.5);
let highRatedCorrect =
  highRatedResult.length === 1 &&
  highRatedResult[0] === "Advanced JavaScript Patterns";
console.log('Test Case 2 Passed:', highRatedCorrect);

console.log('--- Tests Complete ---');