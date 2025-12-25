// js/premium-list.js
async function carregarPremium() {
  const listaEl = document.querySelector(".apps-list");
  if (!listaEl) return;

  // limpa a lista
  listaEl.innerHTML = "<p>Carregando apps...</p>";

  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .eq("categoria", "premium")
    .eq("aprovado", true)
    .order("nome", { ascending: true });

  if (error) {
    console.error(error);
    listaEl.innerHTML = "<p>Erro ao carregar apps.</p>";
    return;
  }

  if (!data || data.length === 0) {
    listaEl.innerHTML = "<p>Nenhum app cadastrado ainda.</p>";
    return;
  }

  listaEl.innerHTML = "";

  data.forEach(app => {
    const card = document.createElement("article");
    card.className = "app-card";
    card.innerHTML = `
      <img src="${app.url_imagem || "imgpro/card1.jpg"}" alt="${app.nome}" class="app-icon">
      <div class="app-info">
        <div class="app-name">${app.nome}</div>
        <div class="app-meta">
          ${app.descricao || ""} 
          ${app.status ? `<span class="app-badge">${app.status}</span>` : ""}
        </div>
      </div>
      <div class="app-actions">
        <a href="${app.link_download}" target="_blank" rel="noopener noreferrer" class="btn-download">
          Baixar
        </a>
        <span class="btn-tag">MediaFire</span>
      </div>
    `;
    listaEl.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", carregarPremium);
