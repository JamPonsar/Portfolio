const backendURL = 'https://jamyangponsarbackend.vercel.app';

// =============================================================================
// NAVIGATION FUNCTIONALITY
// =============================================================================

// Navigation Elements
const navToggle = document.getElementById('nav-toggle');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const sidebarLinks = document.querySelector('.sidebar-links');

// Toggle Sidebar
if (navToggle && sidebar) {
  navToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.innerHTML = sidebar.classList.contains('open')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
}

// Close Sidebar
if (closeBtn && sidebar) {
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
}

// =============================================================================
// HOME PAGE ANIMATIONS
// =============================================================================

// Wait for the DOM to load and animate main text
window.addEventListener('DOMContentLoaded', () => {
  const mainText = document.getElementById('main-text');

  // Add the 'visible' class to trigger the animation
  setTimeout(() => {
    if (mainText) {
      mainText.classList.add('visible');
    }
  }, 200);
});

// Contact Button Functionality
const contactButton = document.getElementById('contact-button');
if (contactButton) {
  contactButton.addEventListener('click', () => {
    window.location.href = 'contact.html';
    contactButton.style.backgroundColor = '#b43bb9';
  });
}

// =============================================================================
// CONTACT FORM FUNCTIONALITY
// =============================================================================

// Handle form submission
const form = document.querySelector('form');
const spinner = document.getElementById('loading-spinner');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page reload
    
    // Show the spinner if it exists
    if (spinner) {
      spinner.classList.remove('hidden');
    }

    // Collect form data
    const formData = {
      firstName: document.getElementById('first-name')?.value || '',
      lastName: document.getElementById('last-name')?.value || '',
      email: document.getElementById('email')?.value || '',
      subject: document.getElementById('subject')?.value || 'No Subject',
      message: document.getElementById('message')?.value || '',
    };

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      if (spinner) {
        spinner.classList.add('hidden');
      }
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      if (spinner) {
        spinner.classList.add('hidden');
      }
      return;
    }

    // Send data to backend
    try {
      const response = await fetch(`${backendURL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Email sent successfully!');
        form.reset();
      } else {
        const error = await response.json();
        console.error('Error:', error);
        alert('Failed to send email. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred. Please check your connection and try again.');
    } finally {
      // Hide the spinner
      if (spinner) {
        spinner.classList.add('hidden');
      }
    }
  });
}

// =============================================================================
// ABOUT PAGE TAB FUNCTIONALITY
// =============================================================================

// Switch tabs in the about me page
function showTab(tabId) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove active class from all buttons
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show the selected tab
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  // Highlight the clicked button
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }
}

// Show "Languages" tab by default when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const languagesTab = document.getElementById("languages");
  if (languagesTab) {
    showTab("languages");
  }
});

// Make showTab function globally available
window.showTab = showTab;

// =============================================================================
// WORK EXPERIENCE FUNCTIONALITY
// =============================================================================

// Work Experience Data - Updated with all actual roles from LinkedIn
const experienceData = {
  "uniqlo-associate": {
    title: "Store Associate",
    company: "UNIQLO",
    duration: "April 2025 - Present",
    description: "Currently delivering exceptional customer service while maintaining brand standards and supporting store operations.",
    skills: ["Retail", "Customer Service", "Visual Merchandising", "POS Systems", "Inventory Management", "Sales", "Teamwork", "Cash Handling"],
    achievements: [
      "Delivered exceptional customer service by assisting shoppers with product selection and styling advice",
      "Maintained visual merchandising standards and ensured product presentation aligned with brand guidelines",
      "Managed point-of-sale transactions efficiently and accurately, including cash handling and returns processing",
      "Monitored inventory levels and supported stock replenishment to ensure product availability",
      "Collaborated with team members to achieve daily sales goals and maintain a welcoming store environment"
    ]
  },
  "bms-qa-developer": {
    title: "BMS Programmer and QA Developer",
    company: "Controls NYC",
    duration: "June 2024 - August 2024",
    description: "As a BMS Programmer and QA Developer at Controls NYC, I developed advanced services for the building management systems industry, leveraging data retrieval algorithms and virtual machine setups to enhance alarm tracking capabilities. I integrated external APIs and Python scripting to gather data from Niagara 4 software, enhancing automation and data processing capabilities for efficient system management and monitoring.",
    skills: ["Building Management Systems", "Niagara 4", "Python Scripting", "API Integration", "JavaScript", "QA Testing", "Data Processing", "Virtual Machine Setup", "Automation"],
    achievements: [
      "Developed advanced services for the BMS industry with data retrieval algorithms and virtual machine setups",
      "Integrated external APIs and Python scripting to gather data from Niagara 4 software",
      "Assisted in modernizing FIT's building management system interface with reactive JavaScript elements",
      "Played a key role in major projects including Bronx Care Hospital and Goochland County Elementary School",
      "Conducted comprehensive QA testing, debugging, and optimized system performance and reliability",
      "Contributed to fostering a collaborative and productive work environment through effective communication"
    ]
  },
  "intramural-official": {
    title: "Intramural Official",
    company: "Stony Brook University",
    duration: "January 2023 - May 2024",
    description: "Administered intramural sports games with precision, ensuring adherence to rules, fair play, and high standards of sportsmanship.",
    skills: ["Sports Officiating", "Event Coordination", "Leadership", "Communication", "Conflict Resolution", "Team Management"],
    achievements: [
      "Administered intramural sports games with precision, ensuring adherence to rules and fair play",
      "Managed game scheduling and logistical coordination with officials and event organizers",
      "Promoted a positive and inclusive environment by engaging with participants of diverse backgrounds",
      "Ensured seamless operations and a positive participant experience"
    ]
  },
  "volleyball-coach": {
    title: "Developmental Coach",
    company: "East End Volleyball",
    duration: "June 2023 - August 2023",
    description: "Planned and hosted beach volleyball clinics for younger players of all skill levels, focusing on skill development and creating a positive learning environment.",
    skills: ["Coaching", "Youth Development", "Beach Volleyball", "Teaching", "Communication", "Leadership"],
    achievements: [
      "Planned and hosted beach volleyball clinics for younger players of all skill levels",
      "Implemented techniques and skills for players to improve their game",
      "Prioritized a positive and welcoming attitude for children to learn and grow"
    ]
  },
  "beach-coordinator": {
    title: "Beach League Coordinator",
    company: "East End Volleyball",
    duration: "June 2022 - August 2023",
    description: "Coordinated beach volleyball league operations, managing equipment and ensuring smooth tournament execution.",
    skills: ["Event Coordination", "Equipment Management", "Teamwork", "Logistics", "Organization"],
    achievements: [
      "Monitored, maintained, and transported league equipment over a mile stretch of beach",
      "Coordinated with team to ensure all players had everything needed to play",
      "Assisted in setup and takedown of majority of nets over 70+ courts"
    ]
  },
  "sample-packager": {
    title: "Sample Packager",
    company: "The Merola Tile Company",
    duration: "May 2020 - August 2021",
    description: "Managed tile sample collection, organization, and distribution while maintaining detailed inventory records.",
    skills: ["Inventory Management", "Organization", "Excel", "Canva", "Data Entry", "Customer Service"],
    achievements: [
      "Collected and organized tile samples from production batches",
      "Maintained detailed and organized record of sample inventory",
      "Assisted in development and updating of company sample labels using Canva and Excel",
      "Processed sample orders efficiently for on-time delivery to customers"
    ]
  }
};

// Initialize Work Experience Section
document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".experience-box");
  const title = document.getElementById("experience-title");
  const company = document.getElementById("experience-company");
  const duration = document.getElementById("experience-duration");
  const description = document.getElementById("experience-description");
  const skillsContainer = document.getElementById("experience-skills");
  const achievementsList = document.getElementById("experience-achievements");
  const details = document.getElementById("experience-details");

  // Only run if we're on the work experience page
  if (!boxes.length || !details) {
    return;
  }

  function showExperience(key) {
    const data = experienceData[key];
    
    if (!data) {
      console.error(`Experience data not found for key: ${key}`);
      return;
    }

    // Update content with null checks
    if (title) title.textContent = data.title;
    if (company) company.textContent = data.company;
    if (duration) duration.textContent = data.duration;
    if (description) description.textContent = data.description;

    // Update skills
    if (skillsContainer) {
      skillsContainer.innerHTML = '';
      data.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
      });
    }

    // Update achievements
    if (achievementsList) {
      achievementsList.innerHTML = '';
      data.achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = achievement;
        achievementsList.appendChild(li);
      });
    }

    // Show details with animation
    if (details) {
      details.classList.add("show");
    }

    // Update selected state
    boxes.forEach(box => box.classList.remove("selected"));
    const selectedBox = document.querySelector(`[data-experience="${key}"]`);
    if (selectedBox) {
      selectedBox.classList.add("selected");
    }
  }

  // Attach click listeners to all experience boxes
  boxes.forEach(box => {
    box.addEventListener("click", () => {
      const key = box.dataset.experience;
      if (key) {
        showExperience(key);
      }
    });
  });

  // Load first experience by default
  showExperience("bms-programmer");
});

// =============================================================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// =============================================================================

// Add smooth scrolling to all anchor links
document.addEventListener('DOMContentLoaded', () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add scroll-based animations
window.addEventListener('scroll', debounce(() => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animated');
    }
  });
}, 100));

// =============================================================================
// ERROR HANDLING AND CONSOLE LOGGING
// =============================================================================

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Console welcome message
console.log('%c Welcome to Jamyang\'s Portfolio! ', 'background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 10px; border-radius: 5px; font-size: 16px; font-weight: bold;');
console.log('Portfolio built with ❤️ by Jamyang Ponsar');

// =============================================================================
// INITIALIZATION
// =============================================================================

// Final initialization when everything is loaded
window.addEventListener('load', () => {
  console.log('Portfolio fully loaded and ready!');
  
  // Add loaded class to body for any final animations
  document.body.classList.add('loaded');
});