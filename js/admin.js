/* ============================================================
   PhotoRetouch Pro — Logique du panneau d'administration
   ============================================================ */

// ---------- Garde d'authentification ----------
if (sessionStorage.getItem("prp_admin_auth") !== "true") {
  window.location.href = "admin-login.html";
}

let allOrders = [];
let currentDelaysAdmin = DEFAULT_DELAYS;
let selectedOrderId = null;
let pendingRetouchedPhoto = null;

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initLogout();
  initMobileToggle();
  loadOrders();
  loadPricing();
  initModals();
  initGlobalSearch();
  initStatusFilter();
});

/* ---------------- Navigation entre sections ---------------- */
function initNavigation() {
  const navLinks = document.querySelectorAll(".admin-nav a, .nav-link-btn");
  const titles = {
    dashboard: "Tableau de bord",
    orders: "Commandes",
    pricing: "Délais & Tarifs",
    settings: "Paramètres"
  };
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = link.dataset.section;
      document.querySelectorAll(".admin-nav a").forEach(a => a.classList.remove("active"));
      document.querySelectorAll(`.admin-nav a[data-section="${target}"]`).forEach(a => a.classList.add("active"));
      document.querySelectorAll(".admin-section").forEach(sec => sec.classList.add("hidden"));
      document.getElementById(`section-${target}`).classList.remove("hidden");
      document.getElementById("page-title").textContent = titles[target] || "Admin";
      document.getElementById("admin-sidebar").classList.remove("open");
    });
  });
}

function initLogout() {
  document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.removeItem("prp_admin_auth");
    window.location.href = "admin-login.html";
  });
}

function initMobileToggle() {
  const toggle = document.getElementById("admin-mobile-toggle");
  const sidebar = document.getElementById("admin-sidebar");
  if (toggle) toggle.addEventListener("click", () => sidebar.classList.toggle("open"));
}

/* ---------------- Chargement des commandes ---------------- */
async function loadOrders() {
  try {
    const res = await fetch("tables/orders?limit=1000&sort=-created_at");
    const json = await res.json();
    allOrders = (json.data || []).sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
    renderDashboard();
    renderOrdersTable();
  } catch (e) {
    console.error("Erreur de chargement des commandes", e);
  }
}

function renderDashboard() {
  document.getElementById("stat-total").textContent = allOrders.length;
  document.getElementById("stat-pending").textContent = allOrders.filter(o => o.status === "En attente").length;
  document.getElementById("stat-progress").textContent = allOrders.filter(o => o.status === "En cours").length;
  document.getElementById("stat-done").textContent = allOrders.filter(o => o.status === "Terminée").length;
  const revenue = allOrders.reduce((sum, o) => sum + (o.price || 0), 0);
  document.getElementById("stat-revenue").textContent = formatPrice(revenue);

  const recent = allOrders.slice(0, 6);
  const tbody = document.getElementById("recent-orders-body");
  if (!recent.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px;">Aucune commande pour le moment.</td></tr>`;
    return;
  }
  tbody.innerHTML = recent.map(o => `
    <tr>
      <td>${escapeHtml(o.client_name)}</td>
      <td>${escapeHtml(o.service_name)}</td>
      <td>${escapeHtml(o.delay_label)}</td>
      <td style="color:var(--color-gold); font-weight:600;">${formatPrice(o.price)}</td>
      <td>${statusBadge(o.status)}</td>
      <td>${formatDate(o.created_at)}</td>
    </tr>
  `).join("");
}

function statusBadge(status) {
  const map = { "En attente": "pending", "En cours": "progress", "Terminée": "done" };
  return `<span class="status-badge ${map[status] || 'pending'}">${status || 'En attente'}</span>`;
}

function formatDate(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }) + " " +
         d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
}

/* ---------------- Table complète des commandes ---------------- */
function initStatusFilter() {
  document.getElementById("status-filter").addEventListener("change", renderOrdersTable);
}
function initGlobalSearch() {
  document.getElementById("global-search").addEventListener("input", renderOrdersTable);
}

function renderOrdersTable() {
  const statusFilter = document.getElementById("status-filter").value;
  const search = document.getElementById("global-search").value.trim().toLowerCase();

  let list = allOrders;
  if (statusFilter !== "all") list = list.filter(o => o.status === statusFilter);
  if (search) {
    list = list.filter(o =>
      (o.client_name || "").toLowerCase().includes(search) ||
      (o.email || "").toLowerCase().includes(search) ||
      (o.phone || "").toLowerCase().includes(search) ||
      (o.service_name || "").toLowerCase().includes(search)
    );
  }

  const tbody = document.getElementById("orders-table-body");
  const emptyState = document.getElementById("orders-empty");

  if (!list.length) {
    tbody.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  tbody.innerHTML = list.map(o => `
    <tr>
      <td class="thumb-cell">
        ${o.photo_data ? `<img src="${o.photo_data}" alt="Photo client" onclick="openImageModal('${o.id}', 'client')">` : '—'}
      </td>
      <td>${escapeHtml(o.client_name)}</td>
      <td>
        <div style="font-size:0.82rem;">${escapeHtml(o.phone)}</div>
        <div style="font-size:0.78rem; color:var(--color-grey);">${escapeHtml(o.email)}</div>
      </td>
      <td>${escapeHtml(o.service_name)}</td>
      <td>${escapeHtml(o.delay_label)}</td>
      <td style="color:var(--color-gold); font-weight:600;">${formatPrice(o.price)}</td>
      <td>${statusBadge(o.status)}</td>
      <td style="font-size:0.78rem;">${formatDate(o.created_at)}</td>
      <td>
        <button class="icon-btn" title="Voir le détail" onclick="openDetailModal('${o.id}')"><i class="fa-solid fa-eye"></i></button>
        ${o.photo_data ? `<button class="icon-btn" title="Télécharger la photo client" onclick="downloadPhoto('${o.id}','client')"><i class="fa-solid fa-download"></i></button>` : ''}
        <button class="icon-btn danger" title="Supprimer" onclick="deleteOrder('${o.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

/* ---------------- Téléchargement des photos ---------------- */
function downloadPhoto(orderId, type) {
  const order = allOrders.find(o => o.id === orderId);
  if (!order) return;
  const dataUrl = type === "client" ? order.photo_data : order.retouched_photo_data;
  if (!dataUrl) return;
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `${type}_${order.client_name.replace(/\s+/g, "_")}_${orderId.slice(0,6)}.jpg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* ---------------- Suppression d'une commande ---------------- */
async function deleteOrder(orderId) {
  if (!confirm("Voulez-vous vraiment supprimer cette commande ? Cette action est irréversible.")) return;
  try {
    await fetch(`tables/orders/${orderId}`, { method: "DELETE" });
    allOrders = allOrders.filter(o => o.id !== orderId);
    renderDashboard();
    renderOrdersTable();
  } catch (e) {
    console.error(e);
    alert("Erreur lors de la suppression.");
  }
}

/* ---------------- Modal image plein écran ---------------- */
function openImageModal(orderId, type) {
  const order = allOrders.find(o => o.id === orderId);
  if (!order) return;
  const src = type === "client" ? order.photo_data : order.retouched_photo_data;
  document.getElementById("image-modal-img").src = src;
  document.getElementById("image-modal").classList.add("show");
}

/* ---------------- Modal détail commande ---------------- */
function openDetailModal(orderId) {
  const order = allOrders.find(o => o.id === orderId);
  if (!order) return;
  selectedOrderId = orderId;
  pendingRetouchedPhoto = null;

  document.getElementById("order-detail-grid").innerHTML = `
    <div class="detail-item"><div class="k">Client</div><div class="v">${escapeHtml(order.client_name)}</div></div>
    <div class="detail-item"><div class="k">Téléphone</div><div class="v">${escapeHtml(order.phone)}</div></div>
    <div class="detail-item"><div class="k">Email</div><div class="v">${escapeHtml(order.email)}</div></div>
    <div class="detail-item"><div class="k">Service</div><div class="v">${escapeHtml(order.service_name)}</div></div>
    <div class="detail-item"><div class="k">Délai</div><div class="v">${escapeHtml(order.delay_label)}</div></div>
    <div class="detail-item"><div class="k">Prix</div><div class="v">${formatPrice(order.price)}</div></div>
    <div class="detail-item"><div class="k">Paiement</div><div class="v">${escapeHtml(order.payment_method || "Non renseigné")}</div></div>
    <div class="detail-item"><div class="k">Date</div><div class="v">${formatDate(order.created_at)}</div></div>
    ${order.notes ? `<div class="detail-item" style="grid-column:1/-1;"><div class="k">Notes du client</div><div class="v">${escapeHtml(order.notes)}</div></div>` : ""}
  `;

  document.getElementById("photo-preview-row").innerHTML = `
    <div class="photo-box">
      ${order.photo_data ? `<img src="${order.photo_data}" alt="Photo client" onclick="openImageModal('${order.id}','client')">` : `<div style="width:150px;height:150px;display:flex;align-items:center;justify-content:center;background:var(--color-charcoal);border-radius:12px;color:var(--color-grey);">Aucune</div>`}
      <span>Photo originale</span>
    </div>
    <div class="photo-box">
      ${order.retouched_photo_data ? `<img src="${order.retouched_photo_data}" alt="Photo retouchée" onclick="openImageModal('${order.id}','retouched')">` : `<div style="width:150px;height:150px;display:flex;align-items:center;justify-content:center;background:var(--color-charcoal);border-radius:12px;color:var(--color-grey);">En attente</div>`}
      <span>Photo retouchée</span>
    </div>
  `;

  document.getElementById("detail-status-select").value = order.status || "En attente";
  document.getElementById("detail-alert-zone").innerHTML = "";
  document.getElementById("detail-modal").classList.add("show");
}

function initModals() {
  document.getElementById("detail-modal-close").addEventListener("click", () => {
    document.getElementById("detail-modal").classList.remove("show");
  });
  document.getElementById("image-modal-close").addEventListener("click", () => {
    document.getElementById("image-modal").classList.remove("show");
  });
  document.getElementById("image-modal").addEventListener("click", (e) => {
    if (e.target.id === "image-modal") document.getElementById("image-modal").classList.remove("show");
  });

  // Upload de la photo retouchée
  const zone = document.getElementById("upload-retouched-zone");
  const input = document.getElementById("retouched-input");
  zone.addEventListener("click", () => input.click());
  input.addEventListener("change", (e) => {
    if (!e.target.files.length) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      pendingRetouchedPhoto = ev.target.result;
      zone.innerHTML = `<i class="fa-solid fa-circle-check gold-text"></i><p style="font-size:0.85rem; color:var(--color-grey-light); margin-top:8px;">Photo sélectionnée : ${escapeHtml(file.name)}</p>`;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("save-detail-btn").addEventListener("click", saveOrderDetail);
  document.getElementById("save-pricing-btn").addEventListener("click", savePricingSettings);
}

async function saveOrderDetail() {
  if (!selectedOrderId) return;
  const newStatus = document.getElementById("detail-status-select").value;
  const payload = { status: newStatus };
  if (pendingRetouchedPhoto) payload.retouched_photo_data = pendingRetouchedPhoto;

  const btn = document.getElementById("save-detail-btn");
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enregistrement...';

  try {
    const res = await fetch(`tables/orders/${selectedOrderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Erreur");
    const updated = await res.json();
    const idx = allOrders.findIndex(o => o.id === selectedOrderId);
    if (idx > -1) allOrders[idx] = { ...allOrders[idx], ...updated };

    document.getElementById("detail-alert-zone").innerHTML = `<div class="alert alert-success"><i class="fa-solid fa-circle-check"></i><span>Commande mise à jour avec succès !</span></div>`;
    renderDashboard();
    renderOrdersTable();
    setTimeout(() => { document.getElementById("detail-modal").classList.remove("show"); }, 1200);
  } catch (e) {
    console.error(e);
    document.getElementById("detail-alert-zone").innerHTML = `<div class="alert alert-error"><i class="fa-solid fa-circle-exclamation"></i><span>Erreur lors de la mise à jour.</span></div>`;
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Enregistrer les modifications';
  }
}

/* ---------------- Gestion des délais / tarifs ---------------- */
async function loadPricing() {
  currentDelaysAdmin = await fetchDelayPricing();
  renderPricingGrid();
}

function renderPricingGrid() {
  const grid = document.getElementById("pricing-grid");
  grid.innerHTML = currentDelaysAdmin.map((d, i) => `
    <div class="pricing-edit-item">
      <label>${d.label}</label>
      <div class="price-input-group">
        <input type="number" class="form-control pricing-input" data-index="${i}" value="${d.price}" min="0" step="50">
        <span style="color:var(--color-grey); font-size:0.8rem;">FCFA</span>
      </div>
    </div>
  `).join("");
}

async function savePricingSettings() {
  const inputs = document.querySelectorAll(".pricing-input");
  inputs.forEach(input => {
    const idx = parseInt(input.dataset.index);
    currentDelaysAdmin[idx].price = parseInt(input.value) || 0;
  });

  const btn = document.getElementById("save-pricing-btn");
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enregistrement...';

  const success = await saveDelayPricing(currentDelaysAdmin);
  const zone = document.getElementById("pricing-alert-zone");
  zone.innerHTML = success
    ? `<div class="alert alert-success"><i class="fa-solid fa-circle-check"></i><span>Tarifs mis à jour avec succès ! Ils sont désormais actifs sur tout le site.</span></div>`
    : `<div class="alert alert-error"><i class="fa-solid fa-circle-exclamation"></i><span>Erreur lors de la sauvegarde des tarifs.</span></div>`;

  btn.disabled = false;
  btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Enregistrer les tarifs';
}
