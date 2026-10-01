import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowRight, Briefcase, Code2, GraduationCap, Mail, MapPin, Phone, Github, Linkedin, Send, Menu, X, SunMedium, MoonStar, CheckCircle2 } from 'lucide-react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { contactService } from './services/contactService';
import { projectService } from './services/projectService';
import { skillService } from './services/skillService';

const navItems = [
  { label: 'Home', path: '/', type: 'route' },
  { label: 'About', path: '/about', type: 'route' },
  { label: 'Skills', path: '/skills', type: 'route' },
  { label: 'Projects', path: '/Portfolio/#projects', type: 'hash' },
  { label: 'Experience', path: '/Portfolio/#experience', type: 'hash' },
  { label: 'Education', path: '/Portfolio/#education', type: 'hash' },
  { label: 'Contact', path: '/Portfolio/#contact', type: 'hash' }
];

const defaultSkills = [
  { name: 'HTML5', category: 'Frontend', icon: '5', accent: 'from-sky-400 to-cyan-500' },
  { name: 'CSS3', category: 'Frontend', icon: '3', accent: 'from-cyan-500 to-blue-500' },
  { name: 'JavaScript', category: 'Frontend', icon: 'JS', accent: 'from-yellow-400 to-orange-500' },
  { name: 'React.js', category: 'Frontend', icon: 'R', accent: 'from-sky-500 to-indigo-500' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'T', accent: 'from-cyan-400 to-teal-500' },
  { name: 'Node.js', category: 'Backend', icon: 'N', accent: 'from-green-500 to-emerald-500' },
  { name: 'Express.js', category: 'Backend', icon: 'E', accent: 'from-slate-500 to-slate-700' },
  { name: 'MongoDB', category: 'Database', icon: 'M', accent: 'from-emerald-500 to-green-600' },
  { name: 'MySQL', category: 'Database', icon: 'SQL', accent: 'from-blue-500 to-indigo-600' },
  { name: 'Java', category: 'Programming', icon: 'J', accent: 'from-orange-500 to-red-500' },
  { name: 'JWT', category: 'Auth', icon: 'JWT', accent: 'from-purple-500 to-violet-500' },
  { name: 'REST API', category: 'API', icon: 'API', accent: 'from-pink-500 to-rose-500' },
  { name: 'Git', category: 'Tools', icon: 'G', accent: 'from-orange-500 to-red-500' },
  { name: 'GitHub', category: 'Tools', icon: 'GH', accent: 'from-slate-600 to-slate-800' },
  { name: 'VS Code', category: 'Tools', icon: 'VS', accent: 'from-blue-500 to-cyan-500' },
  { name: 'Postman', category: 'Tools', icon: 'P', accent: 'from-orange-500 to-yellow-500' },
  { name: 'Figma', category: 'Design', icon: 'F', accent: 'from-pink-500 to-violet-500' }
];

const skillGroups = [
  {
    title: 'Frontend',
    items: [
      { name: 'HTML5', icon: '5' },
      { name: 'CSS3', icon: '3' },
      { name: 'JavaScript', icon: 'JS' },
      { name: 'React.js', icon: 'R' },
      { name: 'Tailwind CSS', icon: 'T' }
    ]
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: 'N' },
      { name: 'Express.js', icon: 'E' }
    ]
  },
  {
    title: 'Database',
    items: [
      { name: 'MongoDB', icon: 'M' },
      { name: 'MySQL', icon: 'SQL' }
    ]
  },
  {
    title: 'Languages',
    items: [
      { name: 'Java', icon: 'J' }
    ]
  },
  {
    title: 'Authentication & API',
    items: [
      { name: 'JWT', icon: 'JWT' },
      { name: 'REST API', icon: 'API' }
    ]
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', icon: 'G' },
      { name: 'GitHub', icon: 'GH' },
      { name: 'VS Code', icon: 'VS' },
      { name: 'Postman', icon: 'P' },
      { name: 'Figma', icon: 'F' }
    ]
  }
];

const defaultProjects = [
  {
    title: 'MediTrack',
    description: 'A healthcare management platform designed to manage patient records, appointments and prescriptions with secure authentication.',
    technologies: ['MERN', 'JWT', 'REST API', 'MongoDB'],
    theme: 'from-cyan-500 to-blue-500',
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with product management, cart, checkout flow, and secure user authentication.',
    technologies: ['React', 'Node', 'MongoDB'],
    theme: 'from-violet-500 to-indigo-600',
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    title: 'SiteSarthi',
    description: 'A construction site inventory management system for tracking materials, site stock, and operational needs with a clean dashboard.',
    technologies: ['Node.js', 'MongoDB', 'React.js'],
    theme: 'from-emerald-500 to-cyan-500',
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    title: 'Task Manager',
    description: 'A simple and effective task management app with daily planning, project categorization, and priority tracking.',
    technologies: ['React', 'LocalStorage', 'CSS'],
    theme: 'from-amber-500 to-orange-500',
    githubUrl: '#',
    liveUrl: '#'
  }
];

const experienceItems = [
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
    ]
  }
];

const contactLinks = [
  { label: 'Email', value: 'ayushkarale2003@gmail.com', icon: Mail },
  { label: 'Phone', value: '+91 9822747351', icon: Phone },
  { label: 'Location', value: 'Pune, Maharashtra', icon: MapPin },
  { label: 'GitHub', value: 'github.com/ayushkarale', icon: Github },
  { label: 'LinkedIn', value: 'linkedin.com/in/ayushkarale', icon: Linkedin }
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
      {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
    </button>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button type="button" className={`scroll-top ${visible ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">
      <ArrowUp size={18} />
    </button>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="topbar container">
        <NavLink to="/" className="brand-wrap" onClick={() => setMobileOpen(false)}>
          <div className="brand-mark">AK</div>
          <span>Ayush Karale</span>
        </NavLink>

        <div className={`nav-panel ${mobileOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.type === 'hash' ? (
                  <a href={item.path} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                ) : (
                  <NavLink to={item.path} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          <button type="button" className="menu-button" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle navigation">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section container">
      <div className="hero-copy">
        <p className="eyebrow">Hello, I&apos;m</p>
        <h1>Ayush <span>Karale</span></h1>
        <h2>Full Stack Developer | MERN Stack</h2>
        <p className="lead">
          I build responsive and scalable web applications with clean code and a problem-solving mindset. Passionate about turning ideas into real-world solutions.
        </p>
        <div className="hero-actions">
          <a href="/Portfolio/#projects" className="primary-button">View My Projects</a>
          <a href="/Portfolio/Ayush-Karale-Resume.pdf" className="secondary-button" download>Download Resume</a>
        </div>
        <div className="social-row">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
          <a href="mailto:ayushkarale2003@gmail.com" aria-label="Email"><Mail size={16} /></a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="portrait-wrap">
          <div className="portrait-glow" />
          <img src={`${import.meta.env.BASE_URL}profile-photo.jpeg`} alt="Ayush Karale portrait" />
        </div>
        <div className="signature">Better<br />Code<br /><span>Bigger Dreams</span></div>
      </div>
    </section>
  );
}

function About() {
  const [skills, setSkills] = useState(defaultSkills);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await skillService.getAll().catch(() => ({ data: { data: defaultSkills } }));
        if (response?.data?.data?.length) {
          setSkills(response.data.data.map((skill) => ({ ...skill, accent: defaultSkills[0].accent })));
        }
      } catch (error) {
        console.error('Unable to load skills', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <section id="about" className="section container two-column">
      <div className="about-copy">
        <div className="section-heading-inline">
          <span className="mini-line" />
          <span>ABOUT ME</span>
        </div>
        <div className="headline-row">
          <span className="big-index">01</span>
          <h3>About Me</h3>
        </div>
        <div className="mini-tag-row">
          <span>FULL STACK DEVELOPER</span>
          <span>|</span>
          <span>MERN STACK</span>
        </div>
        <p>
          I am a Computer Science &amp; Engineering graduate with 8 months of internship experience as a Full Stack Developer at Softtonix Solution Pvt. Ltd. I worked on 4 live projects and had one-on-one client meetings to understand requirements, discuss updates and clarify issues.
        </p>
        <p>
          I am a problem solver with a strong learning mindset, effective communication, and a collaborative approach to teamwork. I enjoy learning new technologies and taking on challenges with confidence.
        </p>
        <div className="badge-row">
          <span><CheckCircle2 size={14} /> Problem Solver</span>
          <span><CheckCircle2 size={14} /> Team Player</span>
          <span><CheckCircle2 size={14} /> Quick Learner</span>
        </div>
      </div>

      <div className="skills-panel">
        <div className="section-heading-inline right-aligned">
          <span className="mini-line" />
          <span>MY SKILLS</span>
        </div>
        <div className="skills-grid">
          {(skills || defaultSkills).slice(0, 16).map((skill, index) => (
            <div key={skill.name || index} className="skill-card">
              <div className={`skill-icon ${skill.accent || 'from-sky-400 to-cyan-500'}`}>{skill.icon || skill.name?.slice(0, 2).toUpperCase()}</div>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <div className="page-shell">
      <div className="page-panel about-panel">
        <div className="page-fixture">
          <div className="section-heading-inline">
            <span className="mini-line" />
            <span>ABOUT ME</span>
          </div>
          <div className="headline-row">
            <span className="big-index">01</span>
            <h3>About Me</h3>
          </div>
          <div className="mini-tag-row">
            <span>FULL STACK DEVELOPER</span>
            <span>|</span>
            <span>MERN STACK</span>
          </div>
        </div>

        <div className="about-layout">
          <div className="about-story">
            <p>
              I am a Computer Science &amp; Engineering graduate with 8 months of internship experience as a Full Stack Developer at Softtonix Solution Pvt. Ltd. I worked on 4 live projects and had one-on-one client meetings to understand requirements, discuss updates and clarify issues.
            </p>
            <p>
              I am a problem solver with a strong learning mindset, effective communication, and a collaborative approach to teamwork. I enjoy learning new technologies and taking on challenges with confidence.
            </p>
            <div className="badge-row">
              <span><CheckCircle2 size={14} /> Problem Solver</span>
              <span><CheckCircle2 size={14} /> Team Player</span>
              <span><CheckCircle2 size={14} /> Quick Learner</span>
            </div>
          </div>

          <div className="laptop-scene">
            <div className="laptop-screen">
              <div className="code-window">
                <span>const developer = {'{'}</span>
                <span>  problemSolving: true,</span>
                <span>  creativity: true,</span>
                <span>  teamwork: true,</span>
                <span>  growth: true</span>
                <span>{'};'} </span>
              </div>
            </div>
            <div className="laptop-base" />
          </div>
        </div>

        <div className="handwritten-tag">Better Code<br />Bigger Dreams</div>
      </div>
    </div>
  );
}

function SkillsPage() {
  return (
    <div className="page-shell">
      <div className="page-panel skills-panel-page">
        <div className="page-fixture skills-fixture">
          <div className="section-heading-inline right-aligned">
            <span className="mini-line" />
            <span>MY SKILLS</span>
          </div>
          <h1>Technologies I Work With</h1>
          <p>I work with a modern tech stack to build scalable, secure and high-performance web applications.</p>
        </div>

        <div className="skill-page-groups">
          {skillGroups.map((group) => (
            <div key={group.title} className="skill-group-row">
              <div className="skill-group-title">{group.title}</div>
              <div className="skill-items-grid">
                {group.items.map((item) => (
                  <div key={item.name} className="skill-page-item">
                    <div className="skill-icon big-icon from-sky-400 to-cyan-500">{item.icon}</div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="script-tag">Code<br />Build<br /><span>Improve</span><br />Repeat</div>
      </div>
    </div>
  );
}

function Projects({ projects }) {
  const items = projects && projects.length ? projects : defaultProjects;

  return (
    <section id="projects" className="section container">
      <div className="section-head">
        <h3>My Projects</h3>
        <a href="/#projects">View All Projects <ArrowRight size={16} /></a>
      </div>

      <div className="project-grid">
        {items.map((project, index) => (
          <motion.article key={project.title || index} className="project-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.1 }}>
            <div className={`project-visual ${project.theme || 'from-cyan-500 to-blue-500'}`}>
              {index === 0 ? <Code2 size={48} /> : <Briefcase size={48} />}
            </div>
            <div className="project-body">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="tech-list">
                {(project.technologies || project.tech || []).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="card-actions">
                <a href={project.githubUrl || '#'} target="_blank" rel="noreferrer">GitHub</a>
                <a href={project.liveUrl || '#'} target="_blank" rel="noreferrer">Live Demo</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section container timeline-section">
      <h3>Work Experience</h3>
      <div className="timeline-wrap">
        {experienceItems.map((item) => (
          <div key={item.company} className="timeline-card">
            <div className="timeline-icon"><Briefcase size={20} /></div>
            <div className="timeline-content">
              <div className="company-row">
                <h4>{item.company}</h4>
                <span>{item.duration}</span>
              </div>
              <p className="job-title">{item.position}</p>
              <ul>
                {item.description.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section container education-section">
      <div className="info-card">
        <div className="info-title-row">
          <div className="icon-circle"><GraduationCap size={20} /></div>
          <h3>Education</h3>
        </div>

        <div className="edu-card">
          <div className="edu-row">
            <strong>Bachelor of Engineering</strong>
            <span>2022 - 2026</span>
          </div>
          <p>Computer Science and Engineering</p>
          <small>PR. Pote (Patil) College of Engineering and Management, Amravati</small>
          <div className="edu-meta">
            <span>CGPA: 8.09</span>
          </div>
        </div>

        <div className="edu-card">
          <div className="edu-row">
            <strong>Higher Secondary Certificate (HSC)</strong>
            <span>2020 - 2022</span>
          </div>
          <p>Akola Arts, Commerce and Science Jr. College, Akola</p>
          <div className="edu-meta">
            <span>Percentage: 78.17%</span>
          </div>
        </div>

        <div className="edu-card">
          <div className="edu-row">
            <strong>Secondary School Certificate (SSC)</strong>
            <span>2019 - 2020</span>
          </div>
          <p>Jubilee English High School, Akola</p>
          <div className="edu-meta">
            <span>Percentage: 75.40%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, success: '', error: '' });

    try {
      await contactService.send(formData);
      setStatus({ loading: false, success: 'Your message has been sent successfully.', error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        loading: false,
        success: '',
        error: error.response?.data?.message || 'Something went wrong while sending your message.'
      });
    }
  };

  return (
    <section id="contact" className="section container contact-section">
      <div className="contact-info">
        <h3>Contact</h3>
        <div className="info-list">
          {contactLinks.map(({ label, value, icon: Icon }) => (
            <div key={label} className="info-item">
              <div className="icon-circle small"><Icon size={16} /></div>
              <div>
                <strong>{label}</strong>
                <span>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            <span>Name</span>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          </label>
        </div>
        <label>
          <span>Subject</span>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project inquiry" required />
        </label>
        <label>
          <span>Message</span>
          <textarea rows="5" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." required />
        </label>
        {status.error ? <div className="form-status error">{status.error}</div> : null}
        {status.success ? <div className="form-status success">{status.success}</div> : null}
        <button type="submit" className="primary-button submit-button" disabled={status.loading}>
          <Send size={16} /> {status.loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© 2025 Ayush Karale. All rights reserved.</p>
      </div>
    </footer>
  );
}

function AppContent() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
