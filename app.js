const projectDOM = document.querySelector(".restaurants-center");
let prev = 0;
let next = 6;
const total = 15;

// fetching the data
class Projects {
  async getData() {
    try {
      let response = await fetch("projects.json");
      let data = await response.json();
      return data.items;
    }
    catch (err) {
      console.log(err);
    }
  }
}

// display the restaurants
class UI {
  displayItems(projects, prev = 0, next = 6) {
    let output = '';
    projects = projects.slice(prev, next);
    projects.forEach(project => {
      output = output + `
            <div class="section-center shadow-lg projects-page-center">
            <article class="single-project">
              <div class="project-container">
            <img src=${project.image} class="restaurant-img" alt="single project" />
            <a href=${project.url} class="project-icon">
            <i class="fas fa-share-square"></i>
            </a>
          </div>
          <div class="project-details">
            <h4>${project.name}</h4>
            <p>
              ${project.description}
            </p>
            <div class="project-footer">
              <span>
                <i class="fab fa-github"></i>
              </span>
              <a href=${project.source}>source code</a>
            </div>
          </div>
        </article>
      </div>
            `;
    });
    projectDOM.innerHTML = output;
  }
}
// Typewriter Effect
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 100;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// creating all objects
const ui = new UI();
const projects = new Projects();

//event listeners
document.addEventListener("DOMContentLoaded", () => {
  init();
  projects.getData().then(projects => {
    ui.displayItems(projects);
  });
});

document.getElementById("filter").addEventListener("change", (e) => {
  projects.getData().then(projects => {
    let items = _.filter(projects, item => {
      tags = item.tags
      return tags.includes(e.target.value);
    });
    ui.displayItems(items);
  });
});


// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

document.getElementById("get-cv").addEventListener('click', () => {
  location.href = "https://drive.google.com/file/d/1KSHypiPTtPBYbfInjJbGB-UOCWmII4BE/view?usp=sharing"
})

document.getElementById("get-cv2").addEventListener('click', () => {
  location.href = "https://drive.google.com/file/d/1KSHypiPTtPBYbfInjJbGB-UOCWmII4BE/view?usp=sharing"
})
