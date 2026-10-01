import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Experience from './models/Experience.js';
import Education from './models/Education.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany(),
      Project.deleteMany(),
      Skill.deleteMany(),
      Experience.deleteMany(),
      Education.deleteMany()
    ]);

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

    const adminUser = await User.create({
      name: 'Ayush Karale',
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.local',
      password: hashedPassword,
      role: 'admin'
    });

    const skills = await Skill.insertMany([
      { name: 'HTML5', category: 'Frontend', icon: 'HTML', order: 1 },
      { name: 'CSS3', category: 'Frontend', icon: 'CSS', order: 2 },
      { name: 'JavaScript', category: 'Frontend', icon: 'JS', order: 3 },
      { name: 'React.js', category: 'Frontend', icon: 'React', order: 4 },
      { name: 'Tailwind CSS', category: 'Frontend', icon: 'Tailwind', order: 5 },
      { name: 'Node.js', category: 'Backend', icon: 'Node', order: 6 },
      { name: 'Express.js', category: 'Backend', icon: 'Express', order: 7 },
      { name: 'MongoDB', category: 'Database', icon: 'Mongo', order: 8 },
      { name: 'MySQL', category: 'Database', icon: 'SQL', order: 9 },
      { name: 'Java', category: 'Programming', icon: 'Java', order: 10 },
      { name: 'JWT', category: 'Auth', icon: 'JWT', order: 11 },
      { name: 'REST API', category: 'API', icon: 'API', order: 12 },
      { name: 'Git', category: 'Tools', icon: 'Git', order: 13 },
      { name: 'GitHub', category: 'Tools', icon: 'GitHub', order: 14 },
      { name: 'VS Code', category: 'Tools', icon: 'VS', order: 15 },
      { name: 'Postman', category: 'Tools', icon: 'Postman', order: 16 },
      { name: 'Figma', category: 'Design', icon: 'Figma', order: 17 }
    ]);

    const projects = await Project.insertMany([
      {
        title: 'MediTrack',
        description: 'A healthcare management platform designed to manage patient records, appointments and prescriptions with secure authentication.',
        image: '',
        technologies: ['MERN', 'JWT', 'REST API', 'MongoDB'],
        githubUrl: '#',
        liveUrl: '#',
        featured: true
      },
      {
        title: 'E-Commerce Platform',
        description: 'A full-featured online store with product management, cart, checkout flow, and secure user authentication.',
        image: '',
        technologies: ['React', 'Node', 'MongoDB'],
        githubUrl: '#',
        liveUrl: '#',
        featured: false
      }
    ]);

    await Experience.insertMany([
      {
        company: 'Softtonix Solution Pvt. Ltd.',
        position: 'Full Stack Developer Intern',
        duration: '8 Months',
        description: [
          'Worked on 4 live projects using MERN stack',
          'Participated in one-on-one client meetings',
          'Understood requirements and project updates',
          'Helped clarify client issues',
          'Worked on real-world web development',
          'Collaborated with team members'
        ],
        technologies: ['MERN', 'MongoDB', 'Express.js', 'React.js'],
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-08-31')
      }
    ]);

    await Education.insertMany([
      {
        degree: 'Bachelor of Engineering',
        branch: 'Computer Science and Engineering',
        institution: 'Computer Science and Engineering',
        year: '2026',
        description: 'Graduated with a focus on software engineering and modern product development.'
      }
    ]);

    console.log('Database seeded successfully');
    console.log('Admin user:', adminUser.email);
    console.log('Sample skills:', skills.length);
    console.log('Sample projects:', projects.length);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
