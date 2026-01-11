// Select all navbar buttons and all pages
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("article");

// Add animation classes to elements
function addAnimations() {
  // Animate service items
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach((item, index) => {
    item.classList.add('animate-slide-in-up');
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Animate project cards
  const projectItems = document.querySelectorAll('.blog-post-item');
  projectItems.forEach((item, index) => {
    item.classList.add('animate-scale-in');
    item.style.animationDelay = `${index * 0.15}s`;
  });

  // Animate achievement cards
  const achievementItems = document.querySelectorAll('.testimonials-item');
  achievementItems.forEach((item, index) => {
    item.classList.add('animate-slide-in-left');
    item.style.animationDelay = `${index * 0.2}s`;
  });
}

// Animate skill bars when page becomes active
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  skillBars.forEach((bar, index) => {
    const targetWidth = bar.getAttribute('data-width');
    if (targetWidth) {
      // Reset width first
      bar.style.width = '0%';
      // Force reflow to ensure reset is applied
      void bar.offsetWidth;
      // Animate to target width after a short delay
      setTimeout(() => {
        bar.style.width = targetWidth;
        bar.style.transition = 'width 1.5s ease-out';
      }, 100 + (index * 100)); // Staggered animation
    }
  });
}

// Navigation event listener
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetPage = link.dataset.page;

    // Remove active from all buttons
    navLinks.forEach(btn => btn.classList.remove("active"));

    // Remove active from all pages
    pages.forEach(page => page.classList.remove("active"));

    // Add active to clicked button
    link.classList.add("active");

    // Show matching page
    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
        
        // Trigger animations for active page
        setTimeout(() => {
          addAnimations();
          if (targetPage === 'resume') {
            // Small delay to ensure page is visible before animating
            setTimeout(() => {
              animateSkillBars();
            }, 50);
          }
        }, 100);
      }
    });
  });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Reset skill bars to 0%
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  skillBars.forEach(bar => {
    bar.style.width = '0%';
  });
  
  // Check if resume page is active on load
  const activePage = document.querySelector('article.active');
  if (activePage && activePage.dataset.page === 'resume') {
    setTimeout(() => {
      animateSkillBars();
    }, 100);
  }
  
  // Add initial animations
  setTimeout(() => {
    addAnimations();
  }, 500);
});

// Add hover effect to navbar links
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'translateY(-2px)';
  });
  
  link.addEventListener('mouseleave', () => {
    if (!link.classList.contains('active')) {
      link.style.transform = 'translateY(0)';
    }
  });
});


// ========== PROJECT MODAL ==========

const projectItems = document.querySelectorAll("[data-project-item]");
const projectModal = document.querySelector("[data-project-modal]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectCloseBtn = document.querySelector("[data-project-close]");

const modalTitle = document.querySelector("[data-project-modal-title]");
const modalSubtitle = document.querySelector("[data-project-modal-subtitle]");
const modalProblem = document.querySelector("[data-project-problem]");
const modalResult = document.querySelector("[data-project-result]");
const modalGithub = document.querySelector("[data-project-github]");
const techBox = document.querySelector("[data-project-tech]");
const workBox = document.querySelector("[data-project-work]");

const projects = [
  {
    title: "Alzheimer’s Disease Classification",
    subtitle: "Deep Learning · Medical Image Analysis",
    problem: "Build a deep learning model to classify Alzheimer’s Disease vs Normal brain MRI scans.",
    tech: ["Python", "TensorFlow/Keras", "ResNet50V2", "NumPy", "Pandas"],
    work: [
      "Preprocessed and augmented MRI image dataset",
      "Applied transfer learning using ResNet50V2",
      "Trained and fine-tuned ResNet50V2 on 23,422 MRI images with data augmentation",
      "Evaluated model using accuracy, AUC, and recall"
    ],
    result: "Achieved 94.58% validation accuracy, AUC of 0.99 and recall of 0.91, showing strong performance for Alzheimer’s detection.",
    github: "https://github.com/VaibhavPattanshetti"
  },

  {
    title: "Swiggy Data Analysis & Price Prediction",
    subtitle: "Data Analysis · Machine Learning",
    problem: "Analyze Swiggy food delivery data to discover trends and predict food price and delivery time.",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn"],
    work: [
      "Performed EDA on 8,000+ records",
      "Handled missing values and removed outliers using IQR",
      "Built Linear Regression models for prediction",
      "Analyzed city-wise trends and price distributions"
    ],
    result: "Identified high-demand cities (Mumbai and Kolkata) and dominant price ranges (₹500–₹600), and built predictive models achieving a strong R² score of ~0.88.",
    github: "https://github.com/VaibhavPattanshetti"
  },

  {
    title: "Suitable Package and Performance Prediction",
    subtitle: "Machine Learning · Prediction System",
    problem: "Build a machine learning system to estimate suitable salary packages and analyze employee performance patterns.",
    tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
    work: [
      "Performed EDA and preprocessing on 8,000+ employee productivity records",
      "Applied feature engineering and encoding techniques",
      "Built regression models (Linear, Ridge, Lasso, ElasticNet) to predict salary packages",
      "Built classification models (Decision Tree, Random Forest, SVM) to predict employee roles",
      "Applied K-Means clustering for employee segmentation",
      "Evaluated models using R², RMSE, accuracy, and confusion matrices"
    ],
    result: "Built salary and performance prediction models achieving ~0.90 R², and segmented employees into productivity-based clusters to support compensation and HR decision-making.",
    github: "https://github.com/VaibhavPattanshetti"
  }
];

projectItems.forEach((item, index) => {
  item.addEventListener("click", () => {

    const p = projects[index];

    modalTitle.innerText = p.title;
    modalSubtitle.innerText = p.subtitle;
    modalProblem.innerText = p.problem;
    modalResult.innerText = p.result;
    modalGithub.href = p.github;

    techBox.innerHTML = "";
    p.tech.forEach(t => techBox.innerHTML += `<span>${t}</span>`);

    workBox.innerHTML = "";
    p.work.forEach(w => workBox.innerHTML += `<li>${w}</li>`);

    projectModal.classList.add("active");
  });
});

projectCloseBtn.addEventListener("click", closeProjectModal);
projectOverlay.addEventListener("click", closeProjectModal);

function closeProjectModal() {
  projectModal.classList.remove("active");
}
