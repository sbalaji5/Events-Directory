const events = [
  {
    id: 1,
    title: "Hack the Prairie",
    category: "Tech",
    description:
      "24-hour hackathon hosted by Illinois Coded. Workshops, mentors, and prizes from top sponsors.",
    start: "2024-09-21T09:00:00",
    end: "2024-09-22T12:00:00",
    location: "Siebel Center for Computer Science",
    tags: ["Hackathon", "Workshops", "Prizes"],
  },
  {
    id: 2,
    title: "Startup Studio Pitch Night",
    category: "Entrepreneurship",
    description:
      "Ten student teams showcase their ventures with judges from Research Park companies.",
    start: "2024-09-24T18:00:00",
    end: "2024-09-24T20:00:00",
    location: "EnterpriseWorks Atrium",
    tags: ["Pitch", "Networking", "Refreshments"],
  },
  {
    id: 3,
    title: "Illini Rec Cycling + Yoga Fusion",
    category: "Wellness",
    description:
      "High-energy cycling followed by relaxing yoga stretches. All experience levels welcome.",
    start: "2024-09-19T17:30:00",
    end: "2024-09-19T19:00:00",
    location: "ARC Fitness Studio",
    tags: ["Fitness", "Free", "Group"],
  },
  {
    id: 4,
    title: "Illini vs. Northwestern Volleyball",
    category: "Sports",
    description:
      "Cheer on the Illini in this Big Ten matchup. Orange out night with student giveaways.",
    start: "2024-09-29T19:00:00",
    end: "2024-09-29T21:30:00",
    location: "Huff Hall",
    tags: ["Big Ten", "Giveaways"],
  },
  {
    id: 5,
    title: "Art + Algorithms Gallery Talk",
    category: "Arts",
    description:
      "Professors from CS + Design discuss generative art installations on display all week.",
    start: "2024-09-20T16:00:00",
    end: "2024-09-20T17:30:00",
    location: "Krannert Art Museum",
    tags: ["Gallery", "Talk", "AI"],
  },
  {
    id: 6,
    title: "Grad Research Lightning Talks",
    category: "Academics",
    description:
      "Graduate students across colleges share 5-minute presentations on interdisciplinary projects.",
    start: "2024-09-23T15:00:00",
    end: "2024-09-23T17:00:00",
    location: "Beckman Institute Auditorium",
    tags: ["Research", "Networking"],
  },
];

const categorySelect = document.querySelector("#category");
const dateInput = document.querySelector("#date");
const card = document.querySelector("#event-card");
const savedList = document.querySelector("#saved-list");
const savedEmptyState = document.querySelector(".saved-empty");

const interestedButton = document.querySelector("#interested");
const skipButton = document.querySelector("#skip");

let filteredEvents = [...events];
let currentIndex = 0;
const savedEvents = new Map();

function formatDateRange(startISO, endISO) {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  const datePart = dateFormatter.format(start);
  const timePart = `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`;

  return sameDay ? `${datePart} · ${timePart}` : `${datePart} – ${dateFormatter.format(end)} · ${timePart}`;
}

function populateCategoryFilter() {
  const categories = Array.from(new Set(events.map((event) => event.category))).sort();
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  }
}

function renderEvent(event) {
  if (!event) {
    card.classList.add("card--empty");
    card.innerHTML = "<p>No events match your filters. Try selecting a different category or date.</p>";
    interestedButton.disabled = true;
    skipButton.disabled = true;
    return;
  }

  card.classList.remove("card--empty");
  card.innerHTML = `
    <div class="card-category">${event.category}</div>
    <h2 class="card-title">${event.title}</h2>
    <p class="card-time">${formatDateRange(event.start, event.end)}</p>
    <p class="card-location">${event.location}</p>
    <p class="card-description">${event.description}</p>
    <ul class="card-tags">
      ${event.tags.map((tag) => `<li>${tag}</li>`).join("")}
    </ul>
  `;

  interestedButton.disabled = false;
  skipButton.disabled = false;
}

function applyFilters() {
  const category = categorySelect.value;
  const selectedDate = dateInput.value ? new Date(dateInput.value) : null;

  filteredEvents = events.filter((event) => {
    const matchesCategory = category === "all" || event.category === category;

    if (!selectedDate) {
      return matchesCategory;
    }

    const eventDate = new Date(event.start);
    const sameDay =
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate();

    return matchesCategory && sameDay;
  });

  currentIndex = 0;
  if (filteredEvents.length === 0) {
    renderEvent(null);
    return;
  }

  renderEvent(filteredEvents[currentIndex]);
}

function showNextEvent() {
  if (filteredEvents.length === 0) {
    renderEvent(null);
    return;
  }

  currentIndex = (currentIndex + 1) % filteredEvents.length;
  renderEvent(filteredEvents[currentIndex]);
}

function handleSwipeRight() {
  const event = filteredEvents[currentIndex];
  if (!event) return;

  savedEvents.set(event.id, event);
  updateSavedList();
  showNextEvent();
}

function handleSwipeLeft() {
  const event = filteredEvents[currentIndex];
  if (!event) return;
  showNextEvent();
}

function updateSavedList() {
  savedList.innerHTML = "";

  if (savedEvents.size === 0) {
    savedEmptyState.hidden = false;
    return;
  }

  savedEmptyState.hidden = true;

  for (const event of savedEvents.values()) {
    const item = document.createElement("li");
    item.className = "saved-item";
    item.innerHTML = `
      <h4>${event.title}</h4>
      <div class="meta">${formatDateRange(event.start, event.end)} · ${event.location}</div>
    `;
    savedList.append(item);
  }
}

categorySelect.addEventListener("change", applyFilters);

dateInput.addEventListener("change", applyFilters);

interestedButton.addEventListener("click", handleSwipeRight);
skipButton.addEventListener("click", handleSwipeLeft);

populateCategoryFilter();
applyFilters();
