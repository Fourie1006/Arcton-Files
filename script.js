const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const searchEl = document.getElementById("search");
const gridEl = document.getElementById("grid");
const pills = document.querySelectorAll(".pill");

let activeFilter = "all";

function applyFilters() {
  if (!gridEl) return;

  const query = (searchEl?.value || "").trim().toLowerCase();
  const tiles = Array.from(gridEl.querySelectorAll(".tile"));

  tiles.forEach(tile => {
    const title = (tile.getAttribute("data-title") || "").toLowerCase();
    const tags = (tile.getAttribute("data-tags") || "").toLowerCase();
    const matchesQuery = !query || title.includes(query) || tags.includes(query);
    const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);

    tile.style.display = (matchesQuery && matchesFilter) ? "" : "none";
  });
}

if (searchEl) {
  searchEl.addEventListener("input", applyFilters);
}

pills.forEach(p => {
  p.addEventListener("click", () => {
    pills.forEach(x => x.classList.remove("is-active"));
    p.classList.add("is-active");
    activeFilter = p.getAttribute("data-filter") || "all";
    applyFilters();
  });
});

applyFilters();

// -----------------------------
// Netlify form success handling
// -----------------------------
(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("success") === "1") {
    const el = document.getElementById("subscribe-success");
    if (el) el.style.display = "block";
  }
})();

const form = document.getElementById("subscribe-form");
const success = document.getElementById("subscribe-success");

if (form) {
  form.addEventListener("submit", function () {
    setTimeout(() => {
      success.classList.remove("hidden");
      form.reset();
    }, 300);
  });
}