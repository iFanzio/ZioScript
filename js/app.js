/**
 * ============================================================================
 * SCRIPT HUB APPLICATION LOGIC (js/app.js)
 * Handles:
 * - Branding hydration from SITE_CONFIG
 * - Rising ambient bokeh specks
 * - Slide-out 3-line navigation drawer
 * - Real-time search ('/' shortcut), filter tags, sorting & bookmarks
 * - Automatic thumbnail loading with blueprint dropzone fallback
 * - Interactive Lua loadstring modal & clipboard copy
 * ============================================================================
 */

(function () {
  const STORAGE_KEY = "script_hub_saved_slots_v1";

  const state = {
    activeNav: "home",
    searchQuery: "",
    activeFilter: null,
    savedOnly: false,
    sortBy: "default",
    savedIds: new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")),
    activeModalSlot: null
  };

  // DOM References
  const el = {
    specksContainer: document.getElementById("ambientSpecksContainer"),
    menuToggleBtn: document.getElementById("menuToggleBtn"),
    drawerBackdrop: document.getElementById("drawerBackdrop"),
    sideDrawer: document.getElementById("sideDrawer"),
    drawerCloseBtn: document.getElementById("drawerCloseBtn"),
    drawerNavList: document.getElementById("drawerNavList"),
    headerBrandName: document.getElementById("headerBrandName"),
    drawerBrandName: document.getElementById("drawerBrandName"),
    communityLinkBtn: document.getElementById("communityLinkBtn"),
    communityLinkLabel: document.getElementById("communityLinkLabel"),
    heroBadgeText: document.getElementById("heroBadgeText"),
    heroHeadline: document.getElementById("heroHeadline"),
    heroSubheadline: document.getElementById("heroSubheadline"),
    footerCopyright: document.getElementById("footerCopyright"),
    searchInput: document.getElementById("searchInput"),
    clearSearchBtn: document.getElementById("clearSearchBtn"),
    filterPillsContainer: document.getElementById("filterPillsContainer"),
    resultsCounter: document.getElementById("resultsCounter"),
    savedOnlyToggle: document.getElementById("savedOnlyToggle"),
    savedCountBadge: document.getElementById("savedCountBadge"),
    sortSelect: document.getElementById("sortSelect"),
    cardsGrid: document.getElementById("cardsGrid"),
    emptyState: document.getElementById("emptyState"),
    resetFiltersBtn: document.getElementById("resetFiltersBtn"),
    scriptModal: document.getElementById("scriptModal"),
    modalBackdrop: document.getElementById("modalBackdrop"),
    modalCloseBtn: document.getElementById("modalCloseBtn"),
    modalBookmarkBtn: document.getElementById("modalBookmarkBtn"),
    modalStatusBadge: document.getElementById("modalStatusBadge"),
    modalVersionBadge: document.getElementById("modalVersionBadge"),
    modalTitle: document.getElementById("modalTitle"),
    modalSubtitle: document.getElementById("modalSubtitle"),
    modalExecutors: document.getElementById("modalExecutors"),
    modalTags: document.getElementById("modalTags"),
    modalFeatures: document.getElementById("modalFeatures"),
    modalLoadstringCode: document.getElementById("modalLoadstringCode"),
    modalCopyBtn: document.getElementById("modalCopyBtn"),
    modalCopyBtnText: document.getElementById("modalCopyBtnText"),
    toastNotification: document.getElementById("toastNotification"),
    toastMessage: document.getElementById("toastMessage")
  };

  const NAV_ICONS = {
    home: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />',
    code: '<path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />',
    gamepad: '<path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
    book: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />',
    info: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'
  };

  function hydrateBranding() {
    document.title = SITE_CONFIG.pageTitle;
    el.headerBrandName.textContent = SITE_CONFIG.brandName;
    el.drawerBrandName.textContent = SITE_CONFIG.brandName;
    el.heroBadgeText.textContent = SITE_CONFIG.heroBadge;
    el.heroHeadline.textContent = SITE_CONFIG.heroHeadline;
    el.heroSubheadline.textContent = SITE_CONFIG.heroSubheadline;
    el.communityLinkLabel.textContent = SITE_CONFIG.communityLabel;
    el.communityLinkBtn.href = SITE_CONFIG.communityUrl;
    el.footerCopyright.textContent = SITE_CONFIG.copyrightText;
  }

  function spawnAmbientSpecks(count = 18) {
    if (!el.specksContainer) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const speck = document.createElement("span");
      speck.className = "bokeh-speck";
      const size = (Math.random() * 3 + 2).toFixed(1);
      const left = (Math.random() * 100).toFixed(2);
      const duration = (Math.random() * 14 + 14).toFixed(1);
      const delay = (-Math.random() * 20).toFixed(1);
      const drift = `${(Math.random() * 60 - 30).toFixed(0)}px`;
      const opacity = (Math.random() * 0.35 + 0.2).toFixed(2);

      speck.style.width = `${size}px`;
      speck.style.height = `${size}px`;
      speck.style.left = `${left}%`;
      speck.style.animationDuration = `${duration}s`;
      speck.style.animationDelay = `${delay}s`;
      speck.style.setProperty("--speck-drift", drift);
      speck.style.setProperty("--speck-opacity", opacity);
      frag.appendChild(speck);
    }
    el.specksContainer.appendChild(frag);
  }

  /* ========================================================================
     SLIDE-OUT DRAWER (3-LINE MENU)
     ======================================================================== */
  function openDrawer() {
    el.sideDrawer.classList.remove("-translate-x-full");
    el.drawerBackdrop.classList.remove("opacity-0", "pointer-events-none");
    el.drawerBackdrop.classList.add("opacity-100");
  }

  function closeDrawer() {
    el.sideDrawer.classList.add("-translate-x-full");
    el.drawerBackdrop.classList.add("opacity-0", "pointer-events-none");
    el.drawerBackdrop.classList.remove("opacity-100");
  }

  function renderDrawerNav() {
    el.drawerNavList.innerHTML = SITE_CONFIG.navItems
      .map((item) => {
        const isActive = state.activeNav === item.id;
        const activeClasses = isActive
          ? "bg-indigo-500/15 text-white border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.16)]"
          : "text-slate-300 hover:text-white hover:bg-white/[0.05] border-transparent";
        const iconColor = isActive ? "text-indigo-300" : "text-slate-400 group-hover:text-indigo-300";

        return `
          <button
            type="button"
            data-nav-id="${item.id}"
            class="group w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 ${activeClasses}"
          >
            <span class="flex items-center gap-3">
              <svg class="w-4 h-4 transition-colors ${iconColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                ${NAV_ICONS[item.icon] || NAV_ICONS.home}
              </svg>
              <span>${item.label}</span>
            </span>
            ${isActive ? '<span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>' : ""}
          </button>
        `;
      })
      .join("");

    el.drawerNavList.querySelectorAll("[data-nav-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeNav = btn.dataset.navId;
        renderDrawerNav();
        closeDrawer();
        const selected = SITE_CONFIG.navItems.find((n) => n.id === state.activeNav);
        if (selected) {
          showToast(`Section: ${selected.label}`);
        }
      });
    });
  }

  /* ========================================================================
     FILTER PILLS, BOOKMARKS & GRID RENDERING
     ======================================================================== */
  function saveBookmarks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.savedIds]));
    updateSavedCounter();
  }

  function updateSavedCounter() {
    el.savedCountBadge.textContent = state.savedIds.size;
    if (state.savedOnly) {
      el.savedOnlyToggle.classList.add("bg-amber-500/15", "border-amber-400/40", "text-amber-200");
    } else {
      el.savedOnlyToggle.classList.remove("bg-amber-500/15", "border-amber-400/40", "text-amber-200");
    }
  }

  function toggleBookmark(id, event) {
    if (event) event.stopPropagation();
    if (state.savedIds.has(id)) {
      state.savedIds.delete(id);
      showToast("Removed from Saved");
    } else {
      state.savedIds.add(id);
      showToast("Saved to Bookmarks");
    }
    saveBookmarks();
    renderCards();
    if (state.activeModalSlot && state.activeModalSlot.id === id) {
      syncModalBookmarkIcon(id);
    }
  }

  function renderFilterPills() {
    el.filterPillsContainer.innerHTML = SITE_CONFIG.filterTags
      .map((tag) => {
        const active = state.activeFilter === tag.key;
        const classes = active
          ? "bg-indigo-500/20 text-indigo-200 border-indigo-400/50 shadow-[0_0_18px_rgba(99,102,241,0.22)]"
          : "bg-[#11111a]/75 text-slate-300 hover:text-white border-white/10 hover:border-white/25";
        return `
          <button
            type="button"
            data-filter-key="${tag.key}"
            class="px-3 py-1.5 rounded-xl text-xs font-mono border backdrop-blur-md transition-all duration-150 ${classes}"
          >
            ${tag.label}
          </button>
        `;
      })
      .join("");

    el.filterPillsContainer.querySelectorAll("[data-filter-key]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.filterKey;
        state.activeFilter = state.activeFilter === key ? null : key;
        renderFilterPills();
        renderCards();
      });
    });
  }

  function getFilteredSlots() {
    const q = state.searchQuery.trim().toLowerCase();

    let list = SCRIPT_SLOTS.filter((slot) => {
      if (state.savedOnly && !state.savedIds.has(slot.id)) return false;
      if (state.activeFilter && !(slot.filterKeys || []).includes(state.activeFilter)) return false;
      if (!q) return true;

      const haystack = [
        slot.title,
        slot.subtitle,
        slot.status,
        slot.slotFileLabel,
        ...(slot.tags || []),
        ...(slot.executors || [])
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    if (state.sortBy === "az") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (state.sortBy === "za") {
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }

  function renderCards() {
    const items = getFilteredSlots();
    el.resultsCounter.innerHTML = `Showing <span class="text-white font-semibold">${items.length}</span> of <span class="text-white font-semibold">${SCRIPT_SLOTS.length}</span> Placeholder Slots`;

    if (items.length === 0) {
      el.cardsGrid.classList.add("hidden");
      el.emptyState.classList.remove("hidden");
      return;
    }

    el.emptyState.classList.add("hidden");
    el.cardsGrid.classList.remove("hidden");

    el.cardsGrid.innerHTML = items
      .map((slot) => {
        const isSaved = state.savedIds.has(slot.id);
        const bookmarkFill = isSaved ? "currentColor" : "none";
        const bookmarkColor = isSaved
          ? "text-amber-400 border-amber-400/40 bg-amber-500/15"
          : "text-slate-300 hover:text-white border-white/10 bg-[#0b0b12]/80";

        return `
          <article
            data-slot-id="${slot.id}"
            class="group relative rounded-2xl bg-[#11111a]/65 hover:bg-[#141422]/85 backdrop-blur-xl border border-white/10 hover:border-indigo-400/45 shadow-[0_12px_35px_rgba(0,0,0,0.45)] hover:shadow-[0_18px_45px_rgba(99,102,241,0.16)] transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden cursor-pointer"
          >
            <!-- 16:9 Thumbnail Container (Auto-loads real image OR shows Blueprint Dropzone) -->
            <div class="relative aspect-video w-full overflow-hidden border-b border-white/[0.08] bg-[#0a0a11]">
              <!-- Real Thumbnail Image (if placed in assets/thumbnails/) -->
              <img
                src="${slot.thumbnail}"
                alt="${slot.title}"
                loading="lazy"
                onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <!-- Blueprint Dropzone Fallback (shown until thumbnail file is added) -->
              <div class="hidden absolute inset-0 blueprint-grid flex flex-col items-center justify-center p-4 text-center">
                <!-- Corner Blueprint Ticks -->
                <span class="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-indigo-400/50"></span>
                <span class="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-indigo-400/50"></span>
                <span class="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-indigo-400/50"></span>
                <span class="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-indigo-400/50"></span>

                <div class="px-3 py-2 rounded-xl border border-dashed border-indigo-400/35 bg-[#08080c]/75 backdrop-blur-sm">
                  <div class="text-[10px] font-mono uppercase tracking-widest text-indigo-300/90 mb-0.5">16:9 THUMBNAIL</div>
                  <div class="text-xs font-mono text-slate-400">${slot.slotFileLabel}</div>
                </div>
              </div>

              <!-- Top Overlay Badges -->
              <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                <span class="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-[#08080c]/85 backdrop-blur-md text-indigo-200 border border-white/10">
                  ${slot.status}
                </span>

                <button
                  type="button"
                  data-bookmark-id="${slot.id}"
                  aria-label="Bookmark ${slot.title}"
                  class="pointer-events-auto p-2 rounded-lg backdrop-blur-md border transition-colors ${bookmarkColor}"
                >
                  <svg class="w-3.5 h-3.5" fill="${bookmarkFill}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-5 flex-1 flex flex-col">
              <div class="flex items-start justify-between gap-2 mb-1.5">
                <h2 class="text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors line-clamp-1">
                  ${slot.title}
                </h2>
                <span class="shrink-0 px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.08]">
                  ${slot.version}
                </span>
              </div>

              <p class="text-xs sm:text-sm text-slate-400 line-clamp-2 mb-4">
                ${slot.subtitle}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mb-5 mt-auto">
                ${(slot.tags || [])
                  .map(
                    (t) =>
                      `<span class="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08]">${t}</span>`
                  )
                  .join("")}
              </div>

              <!-- Inspect Slot Button -->
              <button
                type="button"
                class="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-indigo-100 bg-indigo-500/15 group-hover:bg-indigo-600 border border-indigo-400/30 group-hover:border-indigo-400 shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Inspect Slot</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    // Bind card click & bookmark click
    el.cardsGrid.querySelectorAll("[data-slot-id]").forEach((card) => {
      card.addEventListener("click", () => {
        const slot = SCRIPT_SLOTS.find((s) => s.id === card.dataset.slotId);
        if (slot) openModal(slot);
      });
    });

    el.cardsGrid.querySelectorAll("[data-bookmark-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => toggleBookmark(btn.dataset.bookmarkId, e));
    });
  }

  /* ========================================================================
     MODAL & CLIPBOARD
     ======================================================================== */
  function syncModalBookmarkIcon(id) {
    const isSaved = state.savedIds.has(id);
    const svg = el.modalBookmarkBtn.querySelector("svg");
    svg.setAttribute("fill", isSaved ? "currentColor" : "none");
    if (isSaved) {
      el.modalBookmarkBtn.classList.add("text-amber-400", "border-amber-400/40", "bg-amber-500/15");
    } else {
      el.modalBookmarkBtn.classList.remove("text-amber-400", "border-amber-400/40", "bg-amber-500/15");
    }
  }

  function openModal(slot) {
    state.activeModalSlot = slot;
    el.modalStatusBadge.textContent = slot.status;
    el.modalVersionBadge.textContent = slot.version;
    el.modalTitle.textContent = slot.title;
    el.modalSubtitle.textContent = slot.subtitle;

    el.modalExecutors.innerHTML = (slot.executors || [])
      .map(
        (ex) =>
          `<span class="px-2 py-0.5 rounded-md text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-400/25">${ex}</span>`
      )
      .join("");

    el.modalTags.innerHTML = (slot.tags || [])
      .map(
        (tg) =>
          `<span class="px-2 py-0.5 rounded-md text-xs font-mono text-indigo-200 bg-indigo-500/10 border border-indigo-400/25">${tg}</span>`
      )
      .join("");

    el.modalFeatures.innerHTML = (slot.features || [])
      .map(
        (feat) => `
          <li class="flex items-start gap-2.5">
            <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
            <span>${feat}</span>
          </li>
        `
      )
      .join("");

    el.modalLoadstringCode.textContent = slot.loadstring;
    el.modalCopyBtnText.textContent = "Copy Script";
    syncModalBookmarkIcon(slot.id);

    el.scriptModal.classList.remove("hidden");
    el.scriptModal.classList.add("flex");
  }

  function closeModal() {
    el.scriptModal.classList.add("hidden");
    el.scriptModal.classList.remove("flex");
    state.activeModalSlot = null;
  }

  async function copyCurrentLoadstring() {
    if (!state.activeModalSlot) return;
    const text = state.activeModalSlot.loadstring;
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    el.modalCopyBtnText.textContent = "Copied!";
    showToast("Lua loadstring copied to clipboard!");
    setTimeout(() => {
      if (el.modalCopyBtnText) el.modalCopyBtnText.textContent = "Copy Script";
    }, 2000);
  }

  let toastTimer = null;
  function showToast(message) {
    el.toastMessage.textContent = message;
    el.toastNotification.classList.remove("opacity-0", "translate-y-3");
    el.toastNotification.classList.add("opacity-100", "translate-y-0");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toastNotification.classList.add("opacity-0", "translate-y-3");
      el.toastNotification.classList.remove("opacity-100", "translate-y-0");
    }, 2400);
  }

  /* ========================================================================
     EVENT LISTENERS & INIT
     ======================================================================== */
  function bindEvents() {
    el.menuToggleBtn.addEventListener("click", openDrawer);
    el.drawerCloseBtn.addEventListener("click", closeDrawer);
    el.drawerBackdrop.addEventListener("click", closeDrawer);

    el.searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      el.clearSearchBtn.classList.toggle("hidden", !state.searchQuery);
      renderCards();
    });

    el.clearSearchBtn.addEventListener("click", () => {
      state.searchQuery = "";
      el.searchInput.value = "";
      el.clearSearchBtn.classList.add("hidden");
      el.searchInput.focus();
      renderCards();
    });

    el.savedOnlyToggle.addEventListener("click", () => {
      state.savedOnly = !state.savedOnly;
      updateSavedCounter();
      renderCards();
    });

    el.sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderCards();
    });

    el.resetFiltersBtn.addEventListener("click", () => {
      state.searchQuery = "";
      state.activeFilter = null;
      state.savedOnly = false;
      state.sortBy = "default";
      el.searchInput.value = "";
      el.sortSelect.value = "default";
      el.clearSearchBtn.classList.add("hidden");
      updateSavedCounter();
      renderFilterPills();
      renderCards();
    });

    el.modalCloseBtn.addEventListener("click", closeModal);
    el.modalBackdrop.addEventListener("click", closeModal);
    el.modalCopyBtn.addEventListener("click", copyCurrentLoadstring);
    el.modalBookmarkBtn.addEventListener("click", () => {
      if (state.activeModalSlot) toggleBookmark(state.activeModalSlot.id);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDrawer();
        closeModal();
      }
      if (e.key === "/" && document.activeElement !== el.searchInput) {
        e.preventDefault();
        el.searchInput.focus();
      }
    });
  }

  // Initialize
  hydrateBranding();
  spawnAmbientSpecks(18);
  renderDrawerNav();
  renderFilterPills();
  updateSavedCounter();
  renderCards();
  bindEvents();
})();
