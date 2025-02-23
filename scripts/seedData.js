
const students = [
  { name: "John Doe", age: 15, grade: "A", marks: 92, attendance: 95, gender: "Male" },
  { name: "Jane Smith", age: 16, grade: "B", marks: 85, attendance: 88, gender: "Female" },
  { name: "Mike Johnson", age: 15, grade: "A", marks: 95, attendance: 92, gender: "Male" },
  { name: "Sarah Williams", age: 16, grade: "C", marks: 75, attendance: 85, gender: "Female" }
];

async function seedData() {
  try {
    const fetch = (await import('node-fetch')).default;
    
    for (const student of students) {
      const response = await fetch('http://0.0.0.0:3000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student)
      });
      
      const data = await response.json();
      console.log('Added student:', data);
    }
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seedData();
