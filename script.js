// ==================== DATI SQUADRA ====================
const teamData = {
  name: "A.S.D. Falcons",
  tag: "Orgoglio, impegno, passione",
  season: "2025/26",
  colors: { primary: "#0b6cf1", secondary: "#e63946" },
  players: [
    { id: 1, name: "Luca Rossi", role: "Portiere", number: 1, notes: "Capitano" },
    { id: 2, name: "Marco Bianchi", role: "Difensore", number: 4 },
    { id: 3, name: "Davide Greco", role: "Centrocampista", number: 8 },
    { id: 5, name: "Giulio Fontana", role: "Attaccante", number: 9 },
    { id: 6, name: "Alessio Ferri", role: "Difensore", number: 2 },
  ],
  fixtures: [
    { id: 101, opponent: "Rivali FC", date: "2025-09-21T15:00:00", home: true, place: "Stadio Comunale" },
    { id: 102, opponent: "City United", date: "2025-09-14T16:00:00", home: false, place: "Stadio A" },
  ],
  results: [
    { opponent: "Borgo Calcio", date: "2025-08-30", score: "2 - 1" },
    { opponent: "Monteverde", date: "2025-08-23", score: "1 - 1" },
  ],
  standings: [
    { pos: 1, team: "Rivali FC", pts: 21 },
    { pos: 2, team: "City United", pts: 19 },
    { pos: 3, team: "A.S.D. Falcons", pts: 16 },
    { pos: 4, team: "Borgo Calcio", pts: 14 },
  ],
};

// ==================== INIZIALIZZAZIONE ====================
document.getElementById("teamName").textContent = teamData.name;
document.getElementById("teamTag").textContent = teamData.tag + " - Stagione " + teamData.season;
document.getElementById("teamFooter").textContent = teamData.name;
document.getElementById("logo").textContent = teamData.name.split(" ").map(w => w[0]).slice(0,3).join("");
document.getElementById("year").textContent = new Date().getFullYear();

document.documentElement.style.setProperty("--accent", teamData.colors.primary);
document.documentElement.style.setProperty("--accent-2", teamData.colors.secondary);

// ==================== FUNZIONI ====================
function renderPlayers(list) {
  const container = document.getElementById("players");
  container.innerHTML = "";
  list.forEach(p => {
    const el = document.createElement("div");
    el.className = "player";
    el.innerHTML = `
      <div class="avatar">${p.number}</div>
      <div class="meta">
        <h4>${p.name}</h4>
        <p class="muted">${p.role}${p.notes ? " — " + p.notes : ""}</p>
      </div>
      <div><button class="btn" onclick="openPlayer(${p.id})">Info</button></div>
    `;
    container.appendChild(el);
  });
}

function renderFixtures() {
  const r = document.getElementById("recentList");
  r.innerHTML = "";
  teamData.fixtures.forEach(f => {
    const date = new Date(f.date);
    const div = document.createElement("div");
    div.className = "fixture";
    div.innerHTML = `
      <div>
        <strong>${f.home ? teamData.name : f.opponent}</strong> vs 
        <strong>${f.home ? f.opponent : teamData.name}</strong>
        <div class="muted">${date.toLocaleString()}</div>
      </div>
      <div>
        <button class="btn" onclick="openFixture(${f.id})">Apri</button>
      </div>
    `;
    r.appendChild(div);
  });

  const res = document.getElementById("resultsList");
  res.innerHTML = "";
  teamData.results.forEach(rw => {
    const div = document.createElement("div");
    div.className = "fixture";
    div.innerHTML = `
      <div><strong>${teamData.name}</strong> — ${rw.opponent}<div class="muted">${rw.date}</div></div>
      <div><strong>${rw.score}</strong></div>
    `;
    res.appendChild(div);
  });
}

function renderStandings() {
  const tbody = document.getElementById("tableStandings");
  tbody.innerHTML = "";
  teamData.standings.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${s.pos}</td><td>${s.team}</td><td>${s.pts}</td>`;
    tbody.appendChild(tr);
  });
}

function updateNextMatch() {
  const next = teamData.fixtures[0];
  if (!next) return document.getElementById("nextMatch").textContent = "Nessuna partita programmata
