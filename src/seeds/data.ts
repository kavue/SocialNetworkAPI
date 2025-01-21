const names = [
    'Aaran', 
    'Aaren', 
    'Aarez', 
    'Aarman', 
    'Aaron', 
    'Aaron-James', 
    'Aarron', 
    'Aaryan', 
    'Aaryn', 
    'Aayan', 
    'Aazaan', 
    'Abaan', 
    'Abbas', 
    'Abdallah', 
    'Abdalroof', 
    'Abdihakim', 
    'Abdirahman', 
    'Abdisalam', 
    'Abdul', 
    'Abdul-Aziz', 
    'Smith', 
    'Jones', 
    'Coollastname', 
    'Zechariah', 
    'Zeeshan', 
    'Zenith', 
    'Zennon', 
    'Zhen', 
    'Zion', 
    'Ziya', 
    'Zubair', 
    'Zuriel', 
    'Xander', 
    'Jared', 
    'Courtney', 
    'Clark', 
    'Grace', 
    'Nathaniel', 
    'Parker'
  ];
  
  const thoughts = [
    'This is a random thought.',
    'I love coding!',
    'JavaScript is awesome.',
    'TypeScript makes things better!',
    'MongoDB is a great NoSQL database.',
    'Let’s build something amazing.',
    'I enjoy creating APIs.',
    'Backend development is fun!',
    'Frontend development is creative!',
    'Node.js is powerful.',
    'Express simplifies routing.',
    'Social media apps are intriguing.',
    'I wonder what the future holds.',
    'Learning never stops!',
    'Debugging is an adventure.',
    'Keep pushing forward!',
    'Every day is a new opportunity.',
    'Teamwork makes the dream work.',
    'Space exploration is fascinating.',
    'The universe is vast.',
  ];
  
  // Get a random item from an array
  export const getRandomArrItem = (arr: any) => arr[Math.floor(Math.random() * arr.length)];
  
  // Generate a random username
  export const getRandomUsername = () => `${getRandomArrItem(names)}${Math.floor(Math.random() * 1000)}`;
  
  // Generate random thoughts
  export const getRandomThoughts = (int: number) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughts),
        username: getRandomUsername(),
        createdAt: new Date(),
      });
    }
    return results;
  };
  
  // Generate random users
  export const getRandomUsers = (int: number) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        username: getRandomUsername(),
        email: `${getRandomArrItem(names).toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`,
        thoughts: [], // Will be populated later
        friends: [], // Will be populated later
      });
    }
    return results;
  };
  
  // Example data generation
  const seedUsers = getRandomUsers(10); // Generate 10 random users
  const seedThoughts = getRandomThoughts(20); // Generate 20 random thoughts
  
  // Export the data
  export default { seedUsers, seedThoughts };
  