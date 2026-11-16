/* ==========================================================
   EDIT YOUR DETAILS HERE. The page builds itself from this object.
   - Leave a list empty ([]) and that section is hidden automatically.
   - Leave linkedin / github as "" and the link is hidden.
   ========================================================== */
const profile = {
  name: "Ragini Verma",
  title: "IT Enthusiast",
  location: "Kanpur Nagar, Uttar Pradesh",
  email: "raginiverma93828@gmail.com",
  phone: "7307907047",
  linkedin: "",   // e.g. "https://www.linkedin.com/in/your-id"
  github: "",     // e.g. "https://github.com/your-username"
  intro: "I am pursuing CITS in Computer Systems and Administration (CSA) at NSTI Kanpur. I am learning IT skills and building my foundation in AI and databases.",
  about: "I completed ITI COPA in 2026 and I am now continuing my training at NSTI Kanpur. I have basic knowledge of HTML, MS Office and MySQL, and I completed a 30-day IBM training in AI/ML. I enjoy learning new technology and working with others.",

  education: [
    { title: "CITS, Trade: CSA", place: "NSTI Kanpur", period: "Session 2026–27", note: "Currently pursuing" },
    { title: "ITI, Trade: COPA", place: "Government ITI Konch, Jalaun", period: "Passed in 2026", note: "" }
  ],

  skills: [
    { group: "Core trade skills", items: ["HTML"] },
    { group: "Computer skills", items: ["MS Office"] },
    { group: "Software and tools", items: ["MySQL"] },
    { group: "Other skills", items: ["Communication", "Problem solving", "Teamwork"] }
  ],

  /* Add projects like this. Leave the list empty to hide the section.
     { name: "Project name", description: "What it does", tech: "Tools used",
       contribution: "What you did", image: "assets/images/project1.jpg" } */
  projects: [],

  training: [
    { org: "IBM", role: "Trainee", duration: "30 days", skills: "AI/ML" }
  ],

  certifications: [
    { name: "AI Literacy", issuer: "IBM SkillsBuild", year: "2026", url: "https://www.credly.com/users/ragini-verma.c277d9f9" }
  ]
};

/* ---------- helpers ---------- */
const $ = (id) => document.getElementById(id);
const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html) n.innerHTML = html; return n; };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- build content ---------- */
document.title = `${profile.name} | ${profile.title}`;
$("heroName").textContent = profile.name;
$("heroTitle").textContent = profile.title;
$("heroIntro").textContent = profile.intro;
$("aboutText").textContent = profile.about;
$("year").textContent = new Date().getFullYear();

profile.education.forEach((e) => {
  $("eduList").appendChild(el("li", "", `<h3>${esc(e.title)}</h3><p>${esc(e.place)}</p><p><span class="tag">${esc(e.period)}</span>${e.note ? " · " + esc(e.note) : ""}</p>`));
});

profile.skills.forEach((g) => {
  const box = el("div", "skill-group", `<h3>${esc(g.group)}</h3>`);
  const ul = el("ul", "chips");
  g.items.forEach((i) => ul.appendChild(el("li", "", esc(i))));
  box.appendChild(ul);
  $("skillGroups").appendChild(box);
});

profile.projects.forEach((p) => {
  $("projectGrid").appendChild(el("article", "card",
    `${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)} screenshot" loading="lazy">` : ""}
     <h3>${esc(p.name)}</h3><p>${esc(p.description)}</p>
     <p><strong>Tools:</strong> ${esc(p.tech)}</p><p><strong>My part:</strong> ${esc(p.contribution)}</p>`));
});

profile.training.forEach((t) => {
  $("trainingList").appendChild(el("li", "card",
    `<h3>${esc(t.org)}: ${esc(t.role)}</h3><p><span class="tag">${esc(t.duration)}</span></p><p>Skills learned: ${esc(t.skills)}</p>`));
});

profile.certifications.forEach((c) => {
  $("certList").appendChild(el("li", "card",
    `<h3>${esc(c.name)}</h3><p>${esc(c.issuer)} · ${esc(c.year)}</p>${c.url ? `<p><a href="${esc(c.url)}" target="_blank" rel="noopener">View certificate</a></p>` : ""}`));
});

/* Contact links: only show what is filled in */
[
  ["Email", profile.email, `mailto:${profile.email}`],
  ["Phone", profile.phone, `tel:+91${profile.phone}`],
  ["LinkedIn", profile.linkedin, profile.linkedin],
  ["GitHub", profile.github, profile.github],
  ["Location", profile.location, ""]
].forEach(([label, value, href]) => {
  if (!value) return;
  const li = el("li");
  const inner = `<small>${label}</small>${esc(value)}`;
  li.innerHTML = href ? `<a href="${esc(href)}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${inner}</a>` : `<span>${inner}</span>`;
  $("contactList").appendChild(li);
});

/* Hide any optional section that has no content, and its menu link */
[["projects", profile.projects], ["training", profile.training], ["certifications", profile.certifications]].forEach(([id, list]) => {
  const has = list.length > 0;
  $(id).hidden = !has;
  document.querySelector(`[data-section="${id}"]`).hidden = !has;
});

/* ---------- theme toggle ---------- */
$("themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* ---------- mobile menu ---------- */
const nav = $("nav"), menuBtn = $("menuToggle");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => { if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); } });

/* ---------- highlight current section in menu ---------- */
const links = [...nav.querySelectorAll("a")];
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
