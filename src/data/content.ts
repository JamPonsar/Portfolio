// All site copy lives here so sections stay purely presentational.

export const profile = {
  name: 'Jamyang Ponsar',
  firstName: 'Jamyang',
  lastName: 'Ponsar',
  role: 'Software Engineer',
  company: ' Capgemini',
  location: 'Valley Stream, New York',
  tagline:
    'I build full-stack applications and agentic AI systems — from clean React interfaces to the LLM workflows behind them.',
  status: 'Open to new opportunities',
  photo: '/images/jamyang.jpg',
  resume: '/Jamyang-Ponsar-Resume.pdf',
  email: 'jamyangponsar@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jamyangponsar/',
  github: 'https://github.com/JamPonsar',
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const about = {
  paragraphs: [
    'I’m a Software Engineer at Capgemini with a strong focus on full-stack development, AI-driven engineering, and cloud-ready solutions. Day to day I work across Python, React, Node.js, SQL and LangChain, contributing to projects that pair full-stack applications with agentic AI — LLM agents and orchestrated agent workflows.',
    'I hold a B.S. in Computer Science from Stony Brook University, where I built a solid foundation in software engineering, system design and data-driven development. I’m currently pursuing the AWS Cloud Practitioner certification, and I’m happiest when I’m learning something new and turning a messy problem into a thoughtful, well-built solution.',
  ],
  stats: [
    { value: 'B.S.', label: 'Computer Science, Stony Brook' },
    { value: 'AI', label: 'Agentic systems & LLM workflows' },
  ],
  skills: [
    'Python',
    'TypeScript',
    'React',
    'Node.js',
    'FastAPI',
    'LangChain',
    'Agentic AI',
    'Prompt Engineering',
    'SQL',
    'MongoDB',
    'Shopify Liquid',
    'AWS',
  ],
};

export const experience = [
  {
    role: 'Software Engineer',
    company: 'Capgemini',
    type: 'Full-time · Hybrid',
    period: 'Jan 2026 — Present',
    location: 'New York, NY',
    points: [
      'Building internal innovation projects that combine full-stack development with agentic AI — LLM agents, orchestrated agent workflows and intelligent automation with LangChain.',
      'Developing backend services in Python and FastAPI, focused on API design, data flow and integration with agent systems.',
      'Implementing React frontends with clean UI patterns that interact seamlessly with backend and AI-driven components.',
      'Designing SQLite schemas and JSON Schemas to validate and shape data contracts; applying prompt engineering for reliable agent behavior.',
    ],
    tags: ['Python', 'FastAPI', 'React', 'LangChain', 'SQLite'],
    title: 'Software Engineer — AI Development',
    overview: [
      'At Capgemini I work on the AI development side of internal innovation projects: building LLM-powered agents, plus the backend services and interfaces around them, and taking them from prototype to a business-ready product.',
      'Most of my work is in Anthropic’s ecosystem — Claude through the Anthropic API, Claude Code for AI-assisted development, and MCP servers to connect agents to other services — with LangChain for orchestration. I also support the team’s move from AWS to Azure.',
    ],
    details: [
      'Designed and built production LLM-powered AI agents with Claude (Anthropic API) and LangChain, engineering multi-agent orchestration with custom prompt templates, system instructions, chain logic and tool-use patterns for enterprise internal tooling.',
      'Used Claude Code for AI-assisted development, integrated MCP servers for cross-service API connectivity, and applied prompt engineering to improve agent reliability, reasoning quality and output consistency.',
      'Architected agentic backend services in Python and FastAPI — RESTful APIs, SQLite data layers and JSON Schema validation — for scalable, production-ready agent pipelines.',
      'Built React front-end components on top of AI-driven backends, and worked cross-functionally to ship a business-ready agentic AI product.',
      'Supported the AWS-to-Azure cloud migration (code, repos and databases), configured Azure workspaces, and took part in Agile sprint planning, estimation and code reviews.',
    ],
    skills: ['Claude API', 'Claude Code', 'LangChain', 'MCP Servers', 'Prompt Engineering', 'Python', 'FastAPI', 'React', 'SQLite', 'JSON Schema', 'Azure', 'AWS', 'Agile'],
  },
  {
    role: 'Web Product Developer',
    company: 'Lily & Lilac',
    type: 'Freelance · Remote',
    period: 'Sep 2025 — Apr 2026',
    location: 'New York, NY',
    points: [
      'Designed and built the Shopify storefront for a new luxury tile brand — owning discovery, UI design, development and go-live.',
      'Developed custom sections and pages directly in the theme with Liquid, HTML, CSS and JavaScript instead of off-the-shelf settings.',
      'Turned vague requirements into a clear direction through competitor reviews, multiple prototypes and rounds of client feedback.',
      'Managed scope within a fixed budget and timeline by prioritizing features and communicating trade-offs early.',
    ],
    tags: ['Shopify', 'Liquid', 'JavaScript', 'UI Design'],
    title: 'Web Product Developer',
    overview: [
      'As a freelancer, I took a new luxury tile brand’s online store from nothing to launch on Shopify, owning every stage: discovery, UI design, development and go-live.',
      'Rather than leaning on theme settings, I built custom sections and pages directly in the theme code. Competitor reviews, several prototypes and rounds of client feedback turned loose requirements into a clear direction, all within a fixed budget and timeline.',
    ],
    details: [
      'Designed and built the Shopify storefront for a new luxury tile brand, from discovery and UI design through development and go-live.',
      'Developed custom sections and pages directly in the theme with Liquid, HTML, CSS and JavaScript instead of off-the-shelf settings.',
      'Turned vague requirements into a clear direction through competitor reviews, multiple prototypes and rounds of client feedback.',
      'Managed scope within a fixed budget and timeline by prioritizing features and communicating trade-offs early.',
    ],
    skills: ['Shopify', 'Liquid', 'HTML', 'CSS', 'JavaScript', 'UI Design', 'Prototyping', 'Client Communication'],
  },
  {
    role: 'Store Associate',
    company: 'UNIQLO',
    type: 'Part-time · On-site',
    period: 'Apr 2025 — Jan 2026',
    location: 'New York, NY',
    points: [
      'Assisted shoppers with product selection and styling while maintaining brand visual merchandising standards.',
      'Handled point-of-sale transactions, returns and inventory replenishment to keep the floor ready.',
    ],
    tags: ['Customer Service', 'Retail'],
    title: 'Store Associate',
    overview: [
      'A part-time, customer-facing role on the floor of a New York UNIQLO store, helping shoppers every day and keeping the store running smoothly.',
      'It built skills that carry over to engineering: listening for what someone actually needs, staying calm when it’s busy, and keeping standards consistent.',
    ],
    details: [
      'Assisted shoppers with product selection and styling while maintaining the brand’s visual merchandising standards.',
      'Handled point-of-sale transactions and returns.',
      'Replenished inventory to keep the floor stocked and ready.',
    ],
    skills: ['Customer Service', 'Point of Sale', 'Inventory', 'Visual Merchandising', 'Teamwork'],
  },
  {
    role: 'BMS Programmer & QA Developer',
    company: 'Controls NYC',
    type: 'Internship · On-site',
    period: 'Jun 2024 — Aug 2024',
    location: 'New York, NY',
    points: [
      'Developed services for building management systems using data retrieval algorithms and VM setups to improve alarm tracking and legacy access.',
      'Integrated external APIs and Python scripting to pull data from Niagara 4, automating system monitoring.',
      'Modernized FIT’s BMS interface with reactive JavaScript elements; ran QA for Bronx Care Hospital and Goochland County Elementary.',
    ],
    tags: ['Python', 'JavaScript', 'Niagara 4', 'QA'],
    title: 'BMS Programmer & QA Developer',
    overview: [
      'A summer internship building and testing software for building management systems (BMS), the platforms that monitor alarms and equipment across large buildings.',
      'I worked on both the build and the test side: writing Python and JavaScript to pull data from Niagara 4 and modernize interfaces, and leading QA for major deployments, including Bronx Care Hospital and Goochland County Elementary School.',
    ],
    details: [
      'Developed BMS software using data retrieval algorithms and virtual machine setups to improve alarm monitoring and keep legacy systems compatible.',
      'Automated data workflows with Python scripting and Niagara 4 API integrations.',
      'Modernized BMS interfaces, including FIT’s, with reactive JavaScript components.',
      'Led QA testing, debugging and performance optimization for major deployments at Bronx Care Hospital and Goochland County Elementary School.',
      'Produced technical documentation and client-facing video walkthroughs.',
    ],
    skills: ['Python', 'JavaScript', 'Niagara 4', 'APIs', 'Virtual Machines', 'QA Testing', 'Documentation'],
  },
];

export const projects = [
  {
    id: 'churn',
    title: 'Bank Customer Churn Analysis',
    period: 'Dec 2025',
    description:
      'End-to-end analysis of a 10,000-record banking dataset to predict churn. Built 15+ visualizations and surfaced key drivers — complaints, inactivity (nearly 2× risk), geography and age — then turned them into retention recommendations.',
    overview: [
      'Churn is expensive: winning a new customer costs 5–7× more than keeping one. This project asks a practical question — in a bank’s customer base, who leaves, and what do they have in common?',
      'I loaded a 10,000-customer Kaggle dataset into SQLite, used SQL to extract and aggregate it, then cleaned, analysed and visualised it in a Jupyter notebook with Pandas, Matplotlib and Seaborn. Every finding ends in something a retention team could act on, not just a chart.',
      'The most interesting result is a warning about the data itself: customers with three or four products churn more, which contradicts real banking research. It’s synthetic data, and a good reminder to sanity-check patterns against domain knowledge before acting on them.',
    ],
    highlights: [
      'Churn rate is 20.4% overall — 2,038 of 10,000 customers.',
      'Germany churns at 32% versus about 16% in France and Spain.',
      'Inactive members churn at 27% versus 14% for active ones.',
      'Customers who filed a complaint almost always leave (99.5%) — complaints are an exit signal.',
      'Customers aged 50–59 churn at 56%, far above younger and older groups.',
    ],
    tags: ['Python', 'Pandas', 'Seaborn', 'SQL'],
    repo: 'https://github.com/JamPonsar/Bank-Customer-Churn-Analysis',
    demoTitle: 'Explore the data',
    demoHint:
      'Pick a dimension to compare, then narrow the customer base with the filters. This runs on the real dataset, aggregated from the same CSV the notebook uses.',
  },
  {
    id: 'dolphin',
    title: 'Dolphin Data Sharing',
    period: 'Sep — Dec 2024',
    description:
      'A decentralized P2P file-sharing app with hash-based uploads and search, an HTTP proxy layer, MongoDB metadata, and btcd/btcwallet integration in Go for transactions and mining.',
    overview: [
      'Dolphin Data Sharing is a decentralized marketplace for files. Instead of a central server, peers find each other through a libp2p distributed hash table (DHT); anyone can offer a file at a price, and anyone can buy it with DolphinCoin, a btcd-based cryptocurrency.',
      'Files are identified by the SHA-256 hash of their contents. Uploading stores the file and its metadata in MongoDB, publishes the price to the DHT under the key /orcanet/files/<peer>/<hash>, and announces the peer as a provider of that hash. Searching a hash asks the DHT who provides it and at what price.',
      'Buying is a short conversation between peers — does the file still exist, what is it called, send it — followed by a payment through a btcwallet server that signs and broadcasts the transaction. Mined blocks confirm it. A separate Go HTTP proxy lets peers act as proxy nodes, and the interface is a React and Material UI app that runs in the browser or Electron.',
    ],
    highlights: [
      'Content-addressed files: the SHA-256 hash is the file’s identity, so duplicates are rejected.',
      'libp2p DHT for peer discovery, provider records and price lookup.',
      'Wallet server around btcd / btcwallet for balances, sending coins and mining blocks.',
      'HTTP proxy service peers can run and advertise for a fee.',
      'React + Material UI front end, packaged for the web and Electron.',
    ],
    tags: ['React', 'Material UI', 'Go', 'MongoDB', 'P2P'],
    repo: 'https://github.com/JamPonsar/Dolphin-Data-Sharing',
    demoTitle: 'Use the app',
    demoHint:
      'A browser-only rebuild of the original React app, with the same pages, tables and dialogs. Upload a file on Files (its SHA-256 is computed for real), buy one on Explore, mine blocks on Home to confirm payments, and try proxy mode. The peers, wallet and network are simulated.',
  },
  {
    id: 'stackoverflow',
    title: 'Fake Stack Overflow',
    period: 'Mar — May 2024',
    description:
      'A full-stack Stack Overflow clone with Q&A posting, tag filtering, voting and pagination, backed by Express and MongoDB schemas for questions, answers and tags.',
    overview: [
      'A full-stack clone of Stack Overflow built with a partner: a React front end talking to an Express API over axios, with MongoDB (via Mongoose) holding questions, answers, tags, comments and users.',
      'You can browse questions sorted by newest, active or unanswered, search by text or by [tag], open a question to read and post answers, ask new questions with validation, and move through results five at a time. Posts support [text](url) hyperlinks, and the app has registration, login and guest sessions.',
      'My part was the look and the data layer: most of the CSS and JSX output, the model helper functions, the Mongoose schemas for questions, answers and tags, the initial server setup, and the voting and previous/next pagination components.',
    ],
    highlights: [
      'Sorting: newest, active (most recently answered) and unanswered.',
      'Search by words or by [tag], with results merged and de-duplicated.',
      'Validated Ask form: title up to 100 characters, summary up to 140, up to 5 tags of 20 characters, and http(s)-only hyperlinks.',
      'Mongoose schemas for questions, answers, tags, comments and users.',
      'Voting, comments and five-per-page pagination.',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    repo: 'https://github.com/JamPonsar/Fake-Stack-Overflow',
    demoTitle: 'Try the forum',
    demoHint:
      'A working mini version running in your browser with sample data. Search, sort, vote, answer and ask — try typing [react] in the search box.',
  },
  {
    id: 'roborush',
    title: 'Robo-Rush',
    period: 'Mar — May 2023',
    description:
      'A 2D side-scrolling runner built from scratch with two teammates on the Wolfie2D engine — original artwork, double jumping, unique obstacles and dynamic animations.',
    overview: [
      'Robo-Rush is a 2D side-scrolling runner built with Mazen Ibrahim and Henry Chen on Wolfie2D, a bare-bones TypeScript game engine from Stony Brook. You play PAKMA, an all-terrain android sent into the Mazonian jungle to capture the evil Doctor HEHE.',
      'The game has six levels that get steadily harder, with a mini-boss on level 3 and a final boss on level 6. PAKMA can jump, double jump, flip around vines and pipes, and fire a laser once the charge meter fills, while avoiding spikes, tree trunks, chemical pits that scramble the controls, and robot monkeys.',
      'All artwork and sound were original, and the design covers a splash screen, an intro sequence, a level-select screen, a pause menu and an in-game HUD showing health, level progress and charge. It’s deployed on Firebase Hosting.',
    ],
    highlights: [
      'Six levels, a mini-boss and a final boss.',
      'Double jump, rope flipping and a chargeable laser.',
      'Sprite animation, tiled backgrounds, collision detection, gravity and side scrolling.',
      'Original artwork, splash screen, level select and pause menu.',
    ],
    tags: ['TypeScript', 'Firebase', 'Wolfie2D'],
    repo: 'https://github.com/JamPonsar/Robo-Rush',
    live: 'https://robo-rush.firebaseapp.com',
    demoTitle: 'Play it',
    demoHint:
      'The deployed game, running right here. Controls: Space / W to jump (twice for a double jump), S / W on a rope, E to fire the laser, Esc to pause.',
  },
];
