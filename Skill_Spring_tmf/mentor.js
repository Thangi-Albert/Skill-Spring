
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

// FULL DATA
const mentors = [
  {
    id: 1,
    name: "Grey Lucas",
    role: "Senior Frontend Developer",
    category: "Web Development",
    image: "./assets/image/img-1.jpg",
    rating: 4.8,
    description: "Guiding learners through modern frontend development track.",
    skills: "React | Tailwind CSS | JavaScript",
    experience: 7,
    students: 120
  },
  {
    id: 2,
    name: "Kim Chase",
    role: "Junior Frontend Developer",
    category: "Web Development",
    image: "./assets/image/img-3.jpg",
    rating: 4.2,
    description: "Helping beginners master modern frontend development.",
    skills: "HTML | CSS | JavaScript",
    experience: 4,
    students: 200
  },
  {
    id: 3,
    name: "Samantha Jones",
    role: "Senior Product Designer",
    category: "Product Design",
    image: "./assets/image/img-4.jpg",
    rating: 4.8,
    description: "I help aspiring designers learn product design fundamentals, build portfolios and improve design thinking.",
    skills: "UI / UX | Figma | Design Systems",
    experience: 10,
    students: 210
  },
  {
    id: 4,
    name: "John Carter",
    role: "Junior Product Designer",
    category: "Product Design",
    image: "./assets/image/img-2.jpg",
    rating: 4.2,
    description: "Helping beginners master the essence of design.",
    skills: "Figma | Prototyping | Wireframing",
    experience: 3,
    students: 140
  }
];

// DOM GRIDS
const webGrid = document.getElementById("webGrid");
const designGrid = document.getElementById("designGrid");
const count = document.getElementById("count");
const webSection = document.querySelectorAll(".mentor-category")[0];
const designSection = document.querySelectorAll(".mentor-category")[1];

let filteredMentors = [...mentors];

// CARD RENDER FUNCTION (SAFE)
function createCard(m) {
  const card = document.createElement("div");
  card.className = "mentor-card";

  card.innerHTML = `
    <div class="mentor-top">

      <div class="mentor-left">

        <img src="${m.image}" class="mentor-image" />

        <div class="mentor-details">
          <div class="mentor-name-tag">${m.name}</div>
          <h3>${m.role}</h3>
        </div>

      </div>

      <div class="rating-badge">
        <img src="./assets/icon/Vector.svg" />
        <span>${m.rating}</span>
      </div>

    </div>

    <p class="mentor-description">${m.description}</p>

    <div class="mentor-skills">${m.skills}</div>

    <div class="mentor-exp">${m.experience} years experience</div>

    <div class="mentor-students">☐ ${m.students} students</div>

    <div class="mentor-buttons">

      <button class="outline-btn" data-id="${m.id}">
        View Profile
      </button>

      <button class="gradient-btn">Book Session</button>

    </div>
  `;

  return card;
}

// RENDER BY CATEGORY (FIXES MOBILE STRUCTURE ISSUE)

function render() {

  webGrid.innerHTML = "";
  designGrid.innerHTML = "";

  let total = 0;

  // reset counters every render (IMPORTANT FIX)
  let webCount = 0;
  let designCount = 0;

  filteredMentors.forEach(m => {

    const card = createCard(m);

    if (m.category === "Web Development") {
      webGrid.appendChild(card);
      webCount++;
    }

    if (m.category === "Product Design") {
      designGrid.appendChild(card);
      designCount++;
    }

    total++;
  });

  count.textContent = total;

  // ✅ SHOW BOTH SECTIONS BY DEFAULT (FIX FOR EMPTY FIRST LOAD BUG)
  webSection.style.display = "block";
  designSection.style.display = "block";

  // ONLY HIDE IF SEARCH IS ACTIVE AND CATEGORY HAS NO RESULTS
  const searchValue = document.querySelector(".search-box input").value
    .toLowerCase()
    .trim();

  if (searchValue !== "") {
    webSection.style.display = webCount > 0 ? "block" : "none";
    designSection.style.display = designCount > 0 ? "block" : "none";
  }

  // rebind buttons
  document.querySelectorAll(".outline-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      window.location.href = `mentor-profile.html?id=${id}`;
    });
  });
}

               // SEARCH FUNCTIONALITY

               const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("input", (e) => {

  const value = e.target.value.toLowerCase().trim();

  filteredMentors = mentors.filter(m => {

    return (
      m.name.toLowerCase().includes(value) ||
      m.role.toLowerCase().includes(value) ||
      m.skills.toLowerCase().includes(value)
    );

  });

  render();

});


        //  SEARCH BUTTON FUNCTIONALITY

        const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
  searchInput.dispatchEvent(new Event("input"));
});


render();






