import { ReportMetadata, Chapter, LogbookWeek, DefenseSlide, OrganogramNode } from '../types';

export const reportMetadata: ReportMetadata = {
  title: 'STUDENTS INDUSTRIAL WORK EXPERIENCE SCHEME (SIWES) REPORT',
  reportType: 'A TECHNICAL REPORT ON THE STUDENTS INDUSTRIAL WORK EXPERIENCE SCHEME (SIWES) UNDERTAKEN AT',
  establishment: 'ZAMFARA INFORMATION TECHNOLOGY DEVELOPMENT AGENCY (ZITDA)',
  location: 'GUSAU',
  state: 'ZAMFARA STATE',
  studentName: 'HASSAN BIN BELLO',
  matricNumber: '2310308098',
  department: 'DEPARTMENT OF COMPUTER SCIENCE',
  institution: 'FEDERAL UNIVERSITY GUSAU (FUG)',
  institutionShort: 'FUG',
  submissionTarget: 'THE DEPARTMENT OF COMPUTER SCIENCE, FEDERAL UNIVERSITY GUSAU (FUG)',
  purpose: 'IN PARTIAL FULFILMENT OF THE REQUIREMENTS FOR THE STUDENTS INDUSTRIAL WORK EXPERIENCE SCHEME (SIWES)',
  startDate: '10TH MAY, 2026',
  endDate: '11TH AUGUST, 2026',
  duration: 'SIX WEEKS',
  siwesSupervisorName: 'Engr. M. A. Gusau (Lead IT Infrastructure, ZITDA)',
  institutionalSupervisorName: 'Dr. A. B. Umar (SIWES Coordinator, Dept. of Computer Science, FUG)',
  academicYear: '2025/2026 Academic Session',
};

export const preliminarySections = {
  declaration: {
    title: 'DECLARATION',
    text: 'I, Hassan Bin Bello, with matriculation number 2310308098, a student of the Department of Computer Science, Federal University Gusau (FUG), hereby declare that this SIWES report is a true record of the practical training and industrial experience I acquired during my SIWES at Zamfara Information Technology Development Agency (ZITDA), Gusau, Zamfara State.',
    subtext: 'The training commenced on 10th May, 2026 and ended on 11th August, 2026.',
    closing: 'This report was prepared by me based on the activities, knowledge and practical experience acquired during the training.',
  },
  certification: {
    title: 'CERTIFICATION',
    text: 'This is to certify that Hassan Bin Bello, with matriculation number 2310308098, of the Department of Computer Science, Federal University Gusau (FUG), successfully undertook his Students Industrial Work Experience Scheme (SIWES) at Zamfara Information Technology Development Agency (ZITDA), Gusau, Zamfara State.',
    subtext: 'The training commenced on 10th May, 2026 and ended on 11th August, 2026.',
  },
  acknowledgement: {
    title: 'ACKNOWLEDGEMENT',
    paragraphs: [
      'I give thanks and praise to Almighty God for giving me the strength, good health, knowledge and opportunity to successfully undertake and complete my Students Industrial Work Experience Scheme.',
      'I sincerely appreciate the management and staff of Zamfara Information Technology Development Agency (ZITDA) for accepting me as a SIWES student and providing me with the opportunity to acquire practical knowledge and experience in Information and Communication Technology.',
      'My special appreciation goes to my SIWES supervisors and all the members of staff who guided me throughout the training. Their instructions, corrections, advice and encouragement contributed greatly to the knowledge and skills I acquired.',
      'I also appreciate the management and lecturers of the Department of Computer Science, Federal University Gusau, especially the SIWES coordinator, for their guidance and support.',
      'Finally, I appreciate my parents, family members, friends and everyone who supported and encouraged me throughout the SIWES programme.',
    ],
  },
};

export const reportChapters: Chapter[] = [
  {
    id: 'chapter-1',
    chapterNumber: 'CHAPTER ONE',
    title: 'INTRODUCTION AND BACKGROUND OF ESTABLISHMENT',
    sections: [
      {
        id: 'sec-1-1',
        number: '1.1',
        title: 'BRIEF HISTORY OF SIWES',
        paragraphs: [
          'The Students Industrial Work Experience Scheme (SIWES) is a practical training programme designed to expose students of higher institutions to real industrial and working environments.',
          'The scheme was introduced by the Industrial Training Fund (ITF) in 1973 to help bridge the gap between theoretical knowledge acquired in institutions and practical skills required in the workplace.',
          'SIWES gives students the opportunity to gain practical experience, become familiar with industrial equipment and working procedures, develop professional skills and understand how knowledge acquired in the classroom can be applied in real-life situations.',
          'The programme therefore serves as an important link between academic learning and future employment.',
        ],
      },
      {
        id: 'sec-1-2',
        number: '1.2',
        title: 'BRIEF HISTORY OF THE ESTABLISHMENT WHERE SIWES WAS UNDERTAKEN',
        paragraphs: [
          'Zamfara Information Technology Development Agency (ZITDA) is a government agency of Zamfara State established to promote Information and Communication Technology and digital development within the state.',
          'The agency focuses on the use of ICT to improve public services, promote digital literacy, support e-government, develop ICT infrastructure and encourage technological innovation.',
          'ZITDA also supports digital skills development and initiatives aimed at helping students, young people, entrepreneurs and other citizens acquire relevant technological knowledge and skills.',
          'My SIWES training was undertaken at ZITDA in Gusau, Zamfara State, where I was exposed to practical ICT-related activities relevant to my course of study, Computer Science.',
        ],
      },
      {
        id: 'sec-1-3',
        number: '1.3',
        title: 'OBJECTIVES OF SIWES',
        paragraphs: [
          'The major objectives of the Students Industrial Work Experience Scheme include the following:',
        ],
        bulletPoints: [
          'To provide students with practical industrial skills related to their course of study.',
          'To expose students to real working environments.',
          'To bridge the gap between theoretical knowledge and practical application.',
          'To familiarize students with modern ICT equipment and technology.',
          'To develop students’ professional and communication skills.',
          'To prepare students for future employment.',
          'To develop problem-solving and teamwork abilities.',
          'To enable students to acquire practical experience outside the classroom.',
        ],
      },
      {
        id: 'sec-1-4',
        number: '1.4',
        title: 'MANDATE, MISSION, VISION AND OBJECTIVES OF ZITDA',
        subsections: [
          {
            id: 'sec-1-4-1',
            title: 'Mandate',
            paragraphs: [
              'The mandate of ZITDA is to promote the development and effective use of Information and Communication Technology in Zamfara State.',
            ],
          },
          {
            id: 'sec-1-4-2',
            title: 'Mission',
            paragraphs: [
              'The mission of ZITDA is to promote digital transformation, digital skills development, e-government and ICT infrastructure for the benefit of the people of Zamfara State.',
            ],
          },
          {
            id: 'sec-1-4-3',
            title: 'Vision',
            paragraphs: [
              'The vision of ZITDA is to promote Zamfara State as a technologically developed and digitally empowered state through ICT education, innovation and digital transformation.',
            ],
          },
          {
            id: 'sec-1-4-4',
            title: 'Objectives of ZITDA',
            paragraphs: [
              'The core objectives of ZITDA encompass strategic initiatives across the state:',
            ],
            bulletPoints: [
              'Promoting digital literacy and ICT skills.',
              'Supporting digital transformation in government.',
              'Developing ICT infrastructure.',
              'Encouraging technological innovation.',
              'Promoting cybersecurity awareness.',
              'Supporting e-government services.',
              'Empowering young people and citizens through digital skills.',
              'Encouraging the use of technology for economic and social development.',
            ],
          },
        ],
      },
      {
        id: 'sec-1-5',
        number: '1.5',
        title: 'ORGANOGRAM OF THE ESTABLISHMENT',
        paragraphs: [
          'The organizational structure of Zamfara Information Technology Development Agency (ZITDA) is designed to coordinate administrative, technical, and digital development functions under the leadership of the Executive Secretary.',
        ],
        specialComponent: 'organogram',
      },
    ],
  },
  {
    id: 'chapter-2',
    chapterNumber: 'CHAPTER TWO',
    title: 'ACTIVITIES AND INDUSTRIAL EXPERIENCE ENGAGED IN',
    sections: [
      {
        id: 'sec-2-1',
        number: '2.1',
        title: 'DIFFERENT ACTIVITIES ENGAGED IN DURING THE SIWES EXERCISE',
        paragraphs: [
          'During my SIWES training at ZITDA, I was systematically exposed to several ICT-related activities encompassing hardware, networking, software systems, and modern digital security. These included:',
        ],
        bulletPoints: [
          'Computer hardware identification.',
          'Computer software installation.',
          'Computer maintenance.',
          'File and folder management.',
          'Basic computer troubleshooting.',
          'Computer networking.',
          'Identification and use of networking devices.',
          'Basic web development.',
          'HTML and CSS.',
          'Database concepts.',
          'Cybersecurity awareness.',
          'Practical computer operations.',
          'Teamwork and office procedures.',
        ],
        specialComponent: 'activity_cards',
      },
      {
        id: 'sec-2-2',
        number: '2.2',
        title: 'IN-DEPTH DESCRIPTION OF THE ACTIVITIES CARRIED OUT',
        subsections: [
          {
            id: 'sec-2-2-1',
            title: 'Computer Hardware',
            paragraphs: [
              'I learned about computer hardware components such as the motherboard, RAM, hard disk/SSD, processor, power supply unit (PSU), keyboard, mouse, and monitor. I also learned the specific functions, operational parameters, and physical handling procedures of the different components.',
            ],
          },
          {
            id: 'sec-2-2-2',
            title: 'Software Installation',
            paragraphs: [
              'I learned how to install, configure, and uninstall computer applications across various operating systems. I also learned the critical importance of keeping computer software updated, managing software licenses, and ensuring application compatibility with system architectures.',
            ],
          },
          {
            id: 'sec-2-2-3',
            title: 'Computer Maintenance',
            paragraphs: [
              'I was introduced to basic preventive and corrective computer maintenance procedures. This included cleaning computer components to prevent thermal throttling, checking physical connections, managing storage space and disk defragmentation/cleanup, and maintaining proper overall system performance.',
            ],
          },
          {
            id: 'sec-2-2-4',
            title: 'Troubleshooting',
            paragraphs: [
              'I learned basic methods of identifying and solving common computer problems. I learned how to check network and power cables, perform diagnostic system restarts, inspect software settings, utilize built-in OS diagnostics, and systematically isolate root causes of system failures.',
            ],
          },
          {
            id: 'sec-2-2-5',
            title: 'Networking',
            paragraphs: [
              'I learned the fundamental concepts of computer networking and the operational functions of devices such as routers, managed switches, access points, and RJ-45 network cables. I also learned about Local Area Network (LAN) architecture, IP address allocation, and basic network connectivity testing.',
            ],
          },
          {
            id: 'sec-2-2-6',
            title: 'Web Development',
            paragraphs: [
              'I was introduced to HyperText Markup Language (HTML) and Cascading Style Sheets (CSS). I learned how HTML is utilized to construct the semantic structure of webpages while CSS is used to enhance layout styling, color schemes, typography, and responsive presentation.',
            ],
          },
          {
            id: 'sec-2-2-7',
            title: 'Cybersecurity',
            paragraphs: [
              'I learned basic cybersecurity practices such as formulating robust passwords, identifying phishing and avoiding suspicious web links, safeguarding sensitive organizational data, enforcing secure authentication, and using public computer systems responsibly.',
            ],
          },
        ],
      },
      {
        id: 'sec-2-3',
        number: '2.3',
        title: 'RELEVANCE OF THE ACTIVITIES TO MY COURSE OF STUDY',
        paragraphs: [
          'The activities carried out during my SIWES training were highly relevant to my course of study, Computer Science.',
          'The training helped me connect the theoretical knowledge acquired in the classroom with practical applications. I significantly improved my understanding of computer systems, networking protocols, software engineering principles, web development pipelines, and cybersecurity protocols.',
          'The experience also improved my problem-solving abilities, communication skills, teamwork dynamics, and technical confidence, which are critical foundations for my future academic and professional career as a Computer Science graduate.',
        ],
      },
    ],
  },
  {
    id: 'chapter-3',
    chapterNumber: 'CHAPTER THREE',
    title: 'SPECIAL PROJECT: NETWORKING AND WEBPAGE DEVELOPMENT',
    sections: [
      {
        id: 'sec-3-1',
        number: '3.1',
        title: 'SPECIAL PROJECT/EXPERIMENT CARRIED OUT DURING THE SIWES',
        paragraphs: [
          'During my SIWES programme, I carried out practical activities involving basic computer networking configuration and practical web development under the supervision of the ZITDA technical team.',
        ],
      },
      {
        id: 'sec-3-2',
        number: '3.2',
        title: 'TITLE OF PROJECT',
        paragraphs: [
          'BASIC COMPUTER NETWORKING AND DEVELOPMENT OF A SIMPLE INFORMATION WEBPAGE',
        ],
      },
      {
        id: 'sec-3-3',
        number: '3.3',
        title: 'OBJECTIVES OF THE PROJECT',
        paragraphs: [
          'The specific objectives of the project were designed to cover practical hands-on competencies:',
        ],
        bulletPoints: [
          'To understand the basic principles of computer networking.',
          'To identify common networking devices and cable types.',
          'To understand how computers communicate through a Local Area Network (LAN).',
          'To develop a simple, responsive webpage using HTML and CSS.',
          'To apply theoretical Computer Science knowledge to real-world technical tasks.',
          'To improve practical technical troubleshooting and problem-solving skills.',
        ],
      },
      {
        id: 'sec-3-4',
        number: '3.4',
        title: 'INTRODUCTION',
        paragraphs: [
          'Computer networking involves connecting computers and other peripheral devices so that they can communicate, exchange data packets, and share digital resources such as internet connections, printers, and servers.',
          'Web development involves creating, structuring, and designing websites or digital webpages. HTML is used to provide the semantic structure and content hierarchy of a webpage, while CSS is used to style, align, and organize its visual presentation.',
          'The practical project helped me understand how networking infrastructure and web technologies interlink and can be applied in a professional ICT government environment.',
        ],
      },
      {
        id: 'sec-3-5',
        number: '3.5',
        title: 'PRINCIPLE',
        paragraphs: [
          'The principle of networking is based on communication between connected devices using appropriate hardware, software, and communication protocols (such as TCP/IP, Ethernet, and DHCP) to route data packets between nodes.',
          'In web development, HTML defines the Document Object Model (DOM) to establish headings, paragraphs, navigation lists, and media elements, while CSS controls the visual rendering properties (colors, typography, grid layouts, and spacing) in client web browsers.',
        ],
      },
      {
        id: 'sec-3-6',
        number: '3.6',
        title: 'REQUIREMENTS / MATERIALS NEEDED',
        paragraphs: [
          'The materials and tools utilized during the execution of the project included:',
        ],
        bulletPoints: [
          'Computer workstation (Desktop / Laptop)',
          'Standard Keyboard and Optical Mouse',
          'Cat5e / Cat6 UTP Network Patch Cables with RJ-45 connectors',
          'Wireless / Broadband Network Router',
          '8-Port / 16-Port Fast Ethernet Network Switch',
          'High-speed Internet Connectivity',
          'Standard Web Browsers (Google Chrome / Mozilla Firefox)',
          'Text / Code Editor (VS Code / Sublime Text / Notepad++)',
          'HTML5 markup specification',
          'CSS3 stylesheet rules',
          'Uninterruptible Power Supply (UPS) and Mains Power',
        ],
      },
      {
        id: 'sec-3-7',
        number: '3.7',
        title: 'PROCEDURES',
        subsections: [
          {
            id: 'sec-3-7-1',
            title: 'Networking Procedure',
            bulletPoints: [
              '1. The networking devices (router, switch, network cards) were inspected and identified.',
              '2. Network cables (Cat5e/Cat6) were tested for physical continuity and pin termination.',
              '3. Workstation computers were connected to the network switch ports via Ethernet cables.',
              '4. Dynamic/Static IP configuration was verified and the network connection was tested using ping commands.',
              '5. Basic troubleshooting was carried out where packet loss or link failure was detected.',
            ],
          },
          {
            id: 'sec-3-7-2',
            title: 'Web Development Procedure',
            bulletPoints: [
              '1. A dedicated project folder and code editor environment were initialized.',
              '2. A basic HTML document structure (<!DOCTYPE html>, <html>, <head>, <body>) was created.',
              '3. Semantic elements, headings (h1, h2), paragraphs, and lists were integrated.',
              '4. Interactive navigation links, informative banner sections, and agency overview elements were included.',
              '5. An external CSS stylesheet was linked to define typography, color palettes, card layouts, and button styles.',
              '6. The webpage files were saved and validated.',
              '7. The webpage was launched and tested in different web browsers for layout consistency.',
              '8. Responsive bugs and styling issues were identified and corrected.',
            ],
          },
        ],
        specialComponent: 'project_demo',
      },
      {
        id: 'sec-3-8',
        number: '3.8',
        title: 'RESULTS AND OBSERVATIONS',
        paragraphs: [
          'The practical activities were successfully carried out to completion. I was able to understand the operational architecture of a local computer network and confidently identify and connect common networking equipment.',
          'I also created and successfully tested a clean, responsive information webpage using HTML and CSS that presented public ICT service information. The practical exercise dramatically improved my understanding of how ICT principles are implemented in live organizational settings.',
        ],
      },
      {
        id: 'sec-3-9',
        number: '3.9',
        title: 'CONCLUSION AND RECOMMENDATIONS',
        paragraphs: [
          'The project provided me with invaluable practical knowledge of basic networking infrastructure and modern web development workflows. It also sharpened my ability to identify technical bottlenecks, follow standard engineering procedures, and translate theoretical Computer Science concepts into functional deliverables.',
          'I recommend that students should be given more continuous hands-on laboratory sessions during SIWES to enable them to build strong technical competencies before graduation.',
        ],
      },
    ],
  },
  {
    id: 'chapter-4',
    chapterNumber: 'CHAPTER FOUR',
    title: 'SUMMARY, CONCLUSION AND RECOMMENDATIONS',
    sections: [
      {
        id: 'sec-4-1',
        number: '4.1',
        title: 'SUMMARY',
        paragraphs: [
          'My SIWES training at Zamfara Information Technology Development Agency (ZITDA) was an exceptionally valuable practical learning experience.',
          'During the training, I was systematically exposed to computer hardware diagnostics, application software deployment, computer preventive maintenance, system troubleshooting, local area networking, web development with HTML and CSS, relational database concepts, and workplace cybersecurity protocols.',
          'The training enabled me to understand how Computer Science and ICT knowledge are applied in a professional government agency environment to solve real-world problems.',
          'It also helped me significantly improve my communication, teamwork, technical documentation, and critical problem-solving skills.',
        ],
      },
      {
        id: 'sec-4-2',
        number: '4.2',
        title: 'CONCLUSION WITH EMPHASIS ON SIGNIFICANT KNOWLEDGE ACQUIRED AND CHALLENGES ENCOUNTERED',
        paragraphs: [
          'The SIWES programme was very useful in developing my practical knowledge, technical proficiency, and professional understanding of Computer Science and Information Technology.',
          'Some of the significant knowledge and skills I acquired include hardware component diagnostics, computer preventive maintenance, LAN setup and network device configuration, application software installation, systematic troubleshooting methodologies, web authoring using HTML and CSS, workplace cybersecurity awareness, and professional office culture.',
          'During the training, I encountered some initial challenges such as difficulty understanding complex technical networking topologies at the beginning, time constraints in balancing multiple lab tasks, and occasional equipment or local network disruptions.',
          'However, with the dedicated guidance of my industry supervisors, continuous self-practice, and a high willingness to learn, I was able to successfully overcome these challenges and acquire lasting technical competence.',
        ],
      },
      {
        id: 'sec-4-3',
        number: '4.3',
        title: 'SUGGESTIONS AND RECOMMENDATIONS',
        paragraphs: [
          'Based on my firsthand experience during the SIWES programme, I respectfully offer the following recommendations:',
        ],
        bulletPoints: [
          'Students should be given more practical and hands-on laboratory opportunities during SIWES.',
          'SIWES host organizations should provide adequate, modern ICT equipment and tools for industrial trainees.',
          'Students should participate actively, punctually, and inquisitively in all assigned technical activities.',
          'Higher institutions and departmental coordinators should monitor students regularly through scheduled on-site inspections.',
          'More practical training modules should be incorporated in emerging fields such as cybersecurity, cloud computing, advanced computer networking, full-stack software development, and artificial intelligence.',
          'Students should maintain meticulous, day-to-day records of their industrial activities in their SIWES logbooks.',
          'Supervisors should continue to mentor, instruct, and provide constructive feedback to students throughout their industrial training.',
        ],
      },
    ],
  },
];

export const referencesList = [
  {
    author: 'Industrial Training Fund (ITF)',
    year: '2023',
    title: 'Students Industrial Work Experience Scheme (SIWES) Information and Guidelines',
    publisher: 'Industrial Training Fund Headquarters, Jos, Nigeria.',
  },
  {
    author: 'Zamfara Information Technology Development Agency (ZITDA)',
    year: '2026',
    title: 'Vision, Mission, Mandate and Functions of ZITDA',
    publisher: 'ZITDA Publications, Gusau, Zamfara State.',
  },
  {
    author: 'Zamfara Information Technology Development Agency (ZITDA)',
    year: '2026',
    title: 'Organizational Structure and Operational Framework of ZITDA',
    publisher: 'ZITDA Directorate of Administration, Gusau.',
  },
  {
    author: 'Zamfara Information Technology Development Agency (ZITDA)',
    year: '2026',
    title: 'Zamfara Information Technology Development Agency Official Portal and Digital Services Guide',
    publisher: 'Government of Zamfara State, Nigeria.',
  },
  {
    author: 'Department of Computer Science',
    year: '2026',
    title: 'SIWES Technical Report Format and Guidelines for Undergraduate Students',
    publisher: 'Faculty of Science, Federal University Gusau (FUG), Zamfara State.',
  },
];

export const zitdaOrganogram: OrganogramNode = {
  title: 'EXECUTIVE SECRETARY',
  role: 'Chief Executive & Strategic Head of ZITDA',
  color: 'emerald',
  tag: 'Executive Directorate',
  children: [
    {
      title: 'ADMINISTRATION & HUMAN RESOURCES',
      role: 'Staff Welfare, Operations, Office Administration & Trainee Coordination',
      color: 'slate',
      tag: 'Core Admin',
    },
    {
      title: 'FINANCE & ACCOUNTS',
      role: 'Budgeting, Financial Management, Audited Accounts & Disbursements',
      color: 'amber',
      tag: 'Finance',
    },
    {
      title: 'PROCUREMENT & AUDIT',
      role: 'ICT Hardware Acquisition, Vendor Auditing & Internal Quality Compliance',
      color: 'indigo',
      tag: 'Compliance',
    },
    {
      title: 'INFORMATION & COMMUNICATION TECHNOLOGY (ICT)',
      role: 'Core Technical Directorate: Infrastructure, Networks & Security',
      color: 'blue',
      tag: 'Technical Directorate',
      children: [
        {
          title: 'IT & Infrastructure Solutions',
          role: 'Data Centers, Server Administration, Workstation Maintenance & LAN/WAN Management',
          color: 'blue',
          tag: 'Technical Unit',
        },
        {
          title: 'Cybersecurity Unit',
          role: 'State Network Defense, Threat Monitoring, Access Control & Security Awareness',
          color: 'rose',
          tag: 'Security Unit',
        },
      ],
    },
    {
      title: 'DIGITAL ECONOMY',
      role: 'Capacity Development, Public Digital Literacy & State E-Services',
      color: 'teal',
      tag: 'Development Directorate',
      children: [
        {
          title: 'Digital Literacy & Capacity Building',
          role: 'Youth Empowerment, Student Bootcamps & Community IT Training',
          color: 'teal',
          tag: 'Training Unit',
        },
        {
          title: 'E-Government Services',
          role: 'Government Portals, Digital Payment Integration & Inter-Agency ICT Support',
          color: 'cyan',
          tag: 'Public Services Unit',
        },
      ],
    },
    {
      title: 'MEDIA, CORRESPONDENCE & STRATEGY',
      role: 'Public Communications, Press, Strategic ICT Planning & Intergovernmental Relations',
      color: 'purple',
      tag: 'Strategic Unit',
    },
  ],
};

export const sampleWebpageProjectCode = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ZITDA - Zamfara IT Development Agency</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Header & Navigation -->
  <header class="header">
    <div class="container">
      <div class="logo">
        <span class="badge">ZAMFARA STATE</span>
        <h2>ZITDA</h2>
      </div>
      <nav class="nav">
        <a href="#about" class="active">About</a>
        <a href="#services">Services</a>
        <a href="#initiatives">Digital Skills</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <h1>Driving Digital Transformation in Zamfara State</h1>
      <p>Empowering citizens with modern ICT infrastructure, digital literacy, and e-government solutions.</p>
      <button class="btn btn-primary">Explore Initiatives</button>
    </div>
  </section>

  <!-- Key Pillars / Services -->
  <section id="services" class="services">
    <div class="container">
      <h2>Core Agency Focus Areas</h2>
      <div class="grid">
        <div class="card">
          <div class="icon">💻</div>
          <h3>ICT Infrastructure</h3>
          <p>Deploying secure high-speed local networks and modern computing hardware across public institutions.</p>
        </div>
        <div class="card">
          <div class="icon">🎓</div>
          <h3>Digital Literacy</h3>
          <p>Conducting youth capacity-building bootcamps and SIWES industrial training in modern technologies.</p>
        </div>
        <div class="card">
          <div class="icon">🔒</div>
          <h3>Cybersecurity</h3>
          <p>Protecting state digital assets and educating workers on information protection protocols.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p>&copy; 2026 Zamfara Information Technology Development Agency (ZITDA), Gusau.</p>
  </footer>
</body>
</html>`,
  css: `/* Reset & Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f8fafc;
  color: #1e293b;
  line-height: 1.6;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  background-color: #065f46; /* Emerald Theme */
  color: white;
  padding: 16px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  font-size: 24px;
  letter-spacing: 1px;
}

.logo .badge {
  font-size: 10px;
  background: #047857;
  padding: 2px 6px;
  border-radius: 4px;
  display: block;
}

.nav a {
  color: #d1fae5;
  text-decoration: none;
  margin-left: 20px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav a:hover, .nav a.active {
  color: white;
  border-bottom: 2px solid #34d399;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #064e3b, #047857);
  color: white;
  text-align: center;
  padding: 50px 20px;
}

.hero h1 {
  font-size: 32px;
  margin-bottom: 12px;
}

.hero p {
  font-size: 16px;
  max-width: 650px;
  margin: 0 auto 24px;
  opacity: 0.9;
}

.btn-primary {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 10px 24px;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary:hover {
  background-color: #059669;
}

/* Services Grid */
.services {
  padding: 40px 0;
}

.services h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #0f172a;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
}

.card .icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.card h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #065f46;
}

.card p {
  font-size: 14px;
  color: #64748b;
}

/* Footer */
.footer {
  background: #0f172a;
  color: #94a3b8;
  text-align: center;
  padding: 20px;
  font-size: 13px;
  margin-top: 40px;
}`,
};

export const weeklyLogbookData: LogbookWeek[] = [
  {
    weekNumber: 1,
    startDate: '10th May, 2026',
    endDate: '16th May, 2026',
    title: 'Orientation, Agency Tour & Computer Hardware Identification',
    objectives: 'Orientation on ZITDA organizational guidelines and hands-on identification of motherboard, RAM, storage, and peripheral components.',
    activities: [
      'Reporting and formal registration at ZITDA Headquarters, Gusau.',
      'Orientation session with the Directorate of Administration and ICT Directorate.',
      'Introduction to agency workplace safety and computer laboratory ethics.',
      'Identification and physical handling of motherboards, processors, RAM modules, hard drives, and power supplies.',
      'Learning hardware compatibility and system assembly basics.',
    ],
    skillsLearned: ['Hardware Identification', 'Workplace Ethics', 'Component Handling', 'Form Factor Knowledge'],
    supervisorRemarks: 'Student showed keen enthusiasm and successfully identified all PC internal components.',
    status: 'Completed',
  },
  {
    weekNumber: 2,
    startDate: '17th May, 2026',
    endDate: '23rd May, 2026',
    title: 'Operating System Deployment & Software Management',
    objectives: 'Practical operating system installation, device driver configuration, and application deployment.',
    activities: [
      'Creating bootable installation media (USB flash drives with OS images).',
      'Configuring BIOS/UEFI boot order settings and partition tables (GPT/MBR).',
      'Clean installation of operating systems on laboratory training workstations.',
      'Installing chipset, display, audio, and network interface drivers.',
      'Installing productivity tools, code editors, and utility applications.',
    ],
    skillsLearned: ['OS Installation', 'BIOS/UEFI Configuration', 'Driver Setup', 'Software Deployment'],
    supervisorRemarks: 'Demonstrated good execution of clean OS installations and proper partitioning.',
    status: 'Completed',
  },
  {
    weekNumber: 3,
    startDate: '24th May, 2026',
    endDate: '30th May, 2026',
    title: 'Preventive Maintenance & Hardware/Software Troubleshooting',
    objectives: 'Mastering routine PC maintenance procedures, thermal management, and systematic fault isolation.',
    activities: [
      'Disassembling desktop computer casings for internal dust removal and cooling fan cleaning.',
      'Thermal paste re-application on CPU heat sinks for heat dissipation.',
      'Diagnosing "No POST", "No Display", and continuous beep code memory faults.',
      'Running disk check utilities (chkdsk), defragmentation, and temporary cache cleanup.',
      'Resolving software crash issues and operating system registry / service errors.',
    ],
    skillsLearned: ['Preventive Maintenance', 'Thermal Management', 'Diagnostic Beep Codes', 'Fault Isolation'],
    supervisorRemarks: 'Successfully diagnosed and restored two faulty desktop systems during lab practicals.',
    status: 'Completed',
  },
  {
    weekNumber: 4,
    startDate: '31st May, 2026',
    endDate: '6th June, 2026',
    title: 'Computer Networking, RJ-45 Crimping & LAN Setup',
    objectives: 'Understanding networking fundamentals, Ethernet cable fabrication, router/switch configuration, and IP ping testing.',
    activities: [
      'Studying T568A and T568B wiring standards for straight-through and crossover cables.',
      'Hands-on cable stripping, crimping RJ-45 jacks, and cable continuity testing.',
      'Connecting workstations to an 8-port Ethernet Fast Switch.',
      'Configuring IPv4 addresses, subnet masks, default gateways, and DNS servers.',
      'Performing ping command tests and file sharing over the local network.',
    ],
    skillsLearned: ['Cable Crimping (T568B)', 'LAN Architecture', 'IP Addressing (IPv4)', 'Network Diagnostics (Ping/Traceroute)'],
    supervisorRemarks: 'Produced high quality crimped patch cables with 100% pin continuity.',
    status: 'Completed',
  },
  {
    weekNumber: 5,
    startDate: '7th June, 2026',
    endDate: '13th June, 2026',
    title: 'Web Development (HTML5 Semantic Markup & CSS3 Styling)',
    objectives: 'Developing structured semantic webpages and responsive modern CSS stylesheets for an informational agency portal.',
    activities: [
      'Setting up local web development workspace using modern text editors.',
      'Writing structured HTML5 documents with semantic headers, navigation, sections, and footers.',
      'Creating CSS stylesheets for color schemes, typography, layout cards, and button styles.',
      'Building the "ZITDA Information Webpage" to showcase agency mandates and services.',
      'Testing browser rendering and ensuring responsive layout adjustments.',
    ],
    skillsLearned: ['HTML5 Semantic Structure', 'CSS3 Layouts', 'Responsive Web Design', 'Web Debugging'],
    supervisorRemarks: 'Completed a well-structured and visually appealing webpage project with clean code.',
    status: 'Completed',
  },
  {
    weekNumber: 6,
    startDate: '14th June, 2026',
    endDate: '20th June, 2026',
    title: 'Database Fundamentals, Cybersecurity & Final Technical Report Drafting',
    objectives: 'Introduction to database concepts, cybersecurity best practices, and compiling the comprehensive SIWES technical report.',
    activities: [
      'Overview of relational database concepts, tables, primary keys, and SQL queries.',
      'Cybersecurity awareness: strong password policies, multi-factor authentication, and phishing awareness.',
      'Final review and testing of the special networking and web project deliverables.',
      'Compiling daily logbook records and drafting the SIWES technical report chapters.',
      'Exit debrief with ZITDA technical supervisors and institutional supervisor signoff.',
    ],
    skillsLearned: ['Database Concepts', 'Cybersecurity Awareness', 'Technical Report Writing', 'Professional Presentation'],
    supervisorRemarks: 'Outstanding conduct throughout the 6 weeks of industrial training. Report approved.',
    status: 'Completed',
  },
];

export const defenseSlidesData: DefenseSlide[] = [
  {
    id: 1,
    title: 'STUDENTS INDUSTRIAL WORK EXPERIENCE SCHEME (SIWES)',
    subtitle: 'A Technical Report on Industrial Training Undertaken at ZITDA, Gusau, Zamfara State',
    category: 'Title & Introduction',
    summary: 'Presented by Hassan Bin Bello (2310308098), Department of Computer Science, Federal University Gusau (FUG).',
    keyPoints: [
      'Student: Hassan Bin Bello | Matric: 2310308098',
      'Department: Computer Science, Federal University Gusau (FUG)',
      'Establishment: Zamfara Information Technology Development Agency (ZITDA), Gusau',
      'Training Period: 10th May, 2026 – 11th August, 2026 (Six Weeks Duration)',
      'Academic Session: 2025/2026 Session',
    ],
    visualType: 'cover',
  },
  {
    id: 2,
    title: 'BACKGROUND: SIWES & ZITDA OVERVIEW',
    subtitle: 'Institutional Context and Organizational Mandate',
    category: 'Chapter 1: Background',
    summary: 'SIWES was introduced by ITF in 1973 to bridge classroom theory and industrial application. ZITDA is the government agency steering ICT transformation in Zamfara State.',
    keyPoints: [
      'History of SIWES: Introduced by Industrial Training Fund (ITF) in 1973 to provide practical industrial skills.',
      'ZITDA Mandate: Promotes ICT development, digital literacy, infrastructure, and e-government in Zamfara State.',
      'Vision: Transforming Zamfara State into a digitally empowered and technologically advanced knowledge economy.',
      'Organogram: Headed by Executive Secretary with ICT & Digital Economy Directorates driving core technical initiatives.',
    ],
    visualType: 'organogram',
  },
  {
    id: 3,
    title: 'ACTIVITIES & PRACTICAL INDUSTRIAL EXPERIENCE',
    subtitle: 'Core Technical Competencies Acquired During the Exercise',
    category: 'Chapter 2: Activities',
    summary: 'Over 13 core practical domains covered ranging from hardware assembly and maintenance to networking and cybersecurity.',
    keyPoints: [
      'Computer Hardware: Component identification, diagnostics, motherboard/RAM handling.',
      'Software & OS: Clean OS installations, BIOS/UEFI configuration, device drivers.',
      'Preventive Maintenance: System dusting, thermal paste replacement, disk cleanup & diagnostics.',
      'Troubleshooting: Resolving No-POST, display errors, and network connectivity faults.',
      'Networking & Security: LAN cabling, RJ-45 crimping, IP routing, cybersecurity best practices.',
      'Web Development: HTML5 semantic structure & CSS3 responsive web styling.',
    ],
    visualType: 'activities',
  },
  {
    id: 4,
    title: 'SPECIAL PROJECT: NETWORKING & WEBPAGE DEVELOPMENT',
    subtitle: 'Practical Application of Computer Science Principles',
    category: 'Chapter 3: Special Project',
    summary: 'Designed and deployed a local LAN network alongside developing a responsive ZITDA Information Webpage using HTML and CSS.',
    keyPoints: [
      'Project Title: Basic Computer Networking and Development of a Simple Information Webpage.',
      'Networking Implementation: Cat6 cable termination (T568B), switch interconnectivity, IP ping verification.',
      'Web Development: Structured semantic HTML5 layout paired with responsive CSS3 stylesheets.',
      'Materials: Workstations, Cat6 UTP cables, Fast Switch, Router, Code Editor (VS Code), Web Browsers.',
      'Verification: Zero packet loss during LAN ping tests; seamless rendering across modern browsers.',
    ],
    visualType: 'project',
  },
  {
    id: 5,
    title: 'RESULTS, CHALLENGES & RESOLUTIONS',
    subtitle: 'Evaluation of Deliverables and Problem-Solving Experience',
    category: 'Chapter 3 & 4: Evaluation',
    summary: 'Hands-on practical exposure successfully solved initial technical bottlenecks through systematic troubleshooting and supervisor mentorship.',
    keyPoints: [
      'Successfully crimped patch cables with 100% pin continuity verified with cable testers.',
      'Built a fully functioning, responsive public information portal for ZITDA.',
      'Overcame initial challenges in understanding complex networking topologies through lab simulations.',
      'Reinforced core Computer Science coursework: Operating Systems, Computer Architecture, Data Communications.',
    ],
    visualType: 'results',
  },
  {
    id: 6,
    title: 'CONCLUSION & RECOMMENDATIONS',
    subtitle: 'Key Takeaways for Students, Institutions, and Industry',
    category: 'Chapter 4: Recommendations',
    summary: 'The SIWES scheme is an indispensable component of Computer Science education that bridges theoretical concepts with real-world industry demands.',
    keyPoints: [
      'Conclusion: The 6-week training substantially built practical confidence in IT infrastructure and web systems.',
      'For Institutions: Maintain regular on-site supervision and provide pre-SIWES practical orientation.',
      'For Industry: Equip training labs with modern tools and introduce emerging fields like Cloud & AI.',
      'For Students: Maintain active participation, consistent logbook entries, and deep curiosity.',
    ],
    visualType: 'conclusion',
  },
];
