// Module 1, Lesson 3: Data Architecture in Production
// Mock data for EventFlow Analytics Dashboard
module.exports = {
    name: "TechConf 2025",
    date: "2025-03-15",
    venue: "San Francisco Convention Center",
    sessions: [
        {
            id: 1,
            title: "Introduction to React",
            speaker: "Sarah Code",
            time: "09:00",
            room: "Room A",
            capacity: 100,
            currentAttendees: 85,
            ratings: [5, 4, 5, 4, 5, 4, 5, 3, 4, 5],
            feedback: [
                { id: 1, comment: "Great introduction to React fundamentals!", rating: 5 },
                { id: 2, comment: "Very clear explanations of components", rating: 4 },
                { id: 3, comment: "Perfect pace for beginners", rating: 5 }
            ]
        },
        {
            id: 2,
            title: "Advanced JavaScript Patterns",
            speaker: "Mike Script",
            time: "10:30",
            room: "Room B",
            capacity: 80,
            currentAttendees: 75,
            ratings: [5, 5, 4, 5, 5, 4, 5, 4, 3, 5],
            feedback: [
                { id: 4, comment: "Excellent deep dive into async/await!", rating: 5 },
                { id: 5, comment: "Complex topics made simple", rating: 5 },
                { id: 6, comment: "Great examples and live coding", rating: 4 }
            ]
        },
        {
            id: 3,
            title: "Web Performance Optimization",
            speaker: "Lisa Fast",
            time: "13:00",
            room: "Room A",
            capacity: 100,
            currentAttendees: 90,
            ratings: [4, 5, 4, 4, 5, 5, 4, 5, 4, 3],
            feedback: [
                { id: 7, comment: "Useful techniques for real-world apps!", rating: 4 },
                { id: 8, comment: "Great examples with actual metrics", rating: 5 },
                { id: 9, comment: "Will definitely use these tips", rating: 5 }
            ]
        },
        {
            id: 4,
            title: "CSS Grid and Flexbox Mastery",
            speaker: "Alex Layout",
            time: "14:30",
            room: "Room C",
            capacity: 60,
            currentAttendees: 45,
            ratings: [5, 4, 5, 3, 4, 5, 4, 5, 3, 4],
            feedback: [
                { id: 10, comment: "Finally understand CSS Grid!", rating: 5 },
                { id: 11, comment: "Good balance of theory and practice", rating: 4 }
            ]
        },
        {
            id: 5,
            title: "Node.js Backend Development",
            speaker: "Dev Server",
            time: "16:00",
            room: "Room B",
            capacity: 80,
            currentAttendees: 68,
            ratings: [4, 5, 4, 5, 4, 3, 5, 4, 5, 4],
            feedback: [
                { id: 12, comment: "Clear explanation of server concepts", rating: 4 },
                { id: 13, comment: "Great API examples", rating: 5 },
                { id: 14, comment: "Helpful for fullstack development", rating: 4 }
            ]
        }
    ]
};
