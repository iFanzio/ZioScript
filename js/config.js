/**
 * ============================================================================
 * SCRIPT HUB CONFIGURATION FILE (js/config.js)
 * ============================================================================
 * Edit this file to customize your site branding, navigation links,
 * filter pills, and script cards.
 *
 * HOW TO ADD THUMBNAILS EASILY:
 * 1. Save your 16:9 image inside:  assets/thumbnails/
 *    (Recommended size: 1280x720 or 800x450 .png / .jpg / .webp)
 * 2. Set `thumbnail: "assets/thumbnails/your_image.png"` on any card below.
 * 3. If the file doesn't exist yet, the card automatically shows a clean
 *    blueprint placeholder with the exact filename you need to drop in!
 * ============================================================================
 */

const SITE_CONFIG = {
  brandName: "ZioScript",
  pageTitle: "ZioScript",
  heroBadge: "Latest scripts",
  heroHeadline: "ZIOSCRIPT",
  heroSubheadline: "Premium script showcases, guides, tutorials — all for free.",
  communityLabel: "Discord",
  communityUrl: "https://discord.gg/luminhub",
  copyrightText: "© 2026 ZioScripts • All rights reserved.",

  // Slide-out 3-Line Menu Navigation Items
  navItems: [
    { id: "home", label: "Home", href: "#home", icon: "home" },
    { id: "scripts", label: "Scripts", href: "#scripts", icon: "code" },
    { id: "games", label: "Games", href: "#games", icon: "gamepad" },
    { id: "guides", label: "Guides", href: "#guides", icon: "book" },
    { id: "about", label: "About", href: "#about", icon: "info" }
  ],

  // Hero Filter Pills (match `key` with each card's `filterKeys` array)
  filterTags: [
    { key: "tag-01", label: "[ Filter Tag 01 ]" },
    { key: "tag-02", label: "[ Filter Tag 02 ]" },
    { key: "tag-03", label: "[ Filter Tag 03 ]" },
    { key: "tag-04", label: "[ Filter Tag 04 ]" },
    { key: "tag-05", label: "[ Filter Tag 05 ]" },
    { key: "tag-06", label: "[ Filter Tag 06 ]" }
  ]
};

/**
 * ============================================================================
 * SCRIPT CARDS LIST
 * Copy & paste any { ... } block below to add a new script card!
 * ============================================================================
 */
const SCRIPT_SLOTS = [
  {
    id: "slot-01",
    slotFileLabel: "slot_01.png",
    thumbnail: "assets/thumbnails/slot_01.png",
    status: "[ STATUS ]",
    title: "[ GAME_NAME_01 ]",
    subtitle: "[ Short placeholder subtitle or script summary ]",
    tags: ["[ Tag A ]", "[ Tag B ]"],
    filterKeys: ["tag-01", "tag-02"],
    version: "v0.0",
    executors: ["[ Executor 01 ]", "[ Executor 02 ]", "[ Executor 03 ]"],
    features: [
      "[ Placeholder feature bullet 01 ]",
      "[ Placeholder feature bullet 02 ]",
      "[ Placeholder feature bullet 03 ]"
    ],
    loadstring: 'loadstring(game:HttpGet("https://your-domain.com/scripts/slot_01.lua"))()'
  },
  {
    id: "slot-02",
    slotFileLabel: "slot_02.png",
    thumbnail: "assets/thumbnails/slot_02.png",
    status: "[ STATUS ]",
    title: "[ GAME_NAME_02 ]",
    subtitle: "[ Short placeholder subtitle or script summary ]",
    tags: ["[ Tag A ]", "[ Tag B ]"],
    filterKeys: ["tag-02", "tag-03"],
    version: "v0.0",
    executors: ["[ Executor 01 ]", "[ Executor 02 ]"],
    features: [
      "[ Placeholder feature bullet 01 ]",
      "[ Placeholder feature bullet 02 ]",
      "[ Placeholder feature bullet 03 ]"
    ],
    loadstring: 'loadstring(game:HttpGet("https://your-domain.com/scripts/slot_02.lua"))()'
  },
  {
    id: "slot-03",
    slotFileLabel: "slot_03.png",
    thumbnail: "assets/thumbnails/slot_03.png",
    status: "[ STATUS ]",
    title: "[ GAME_NAME_03 ]",
    subtitle: "[ Short placeholder subtitle or script summary ]",
    tags: ["[ Tag A ]", "[ Tag B ]"],
    filterKeys: ["tag-03", "tag-04"],
    version: "v0.0",
    executors: ["[ Executor 01 ]", "[ Executor 02 ]", "[ Executor 03 ]"],
    features: [
      "[ Placeholder feature bullet 01 ]",
      "[ Placeholder feature bullet 02 ]",
      "[ Placeholder feature bullet 03 ]"
    ],
    loadstring: 'loadstring(game:HttpGet("https://your-domain.com/scripts/slot_03.lua"))()'
  },
  {
    id: "slot-04",
    slotFileLabel: "slot_04.png",
    thumbnail: "assets/thumbnails/slot_04.png",
    status: "[ STATUS ]",
    title: "[ GAME_NAME_04 ]",
    subtitle: "[ Short placeholder subtitle or script summary ]",
    tags: ["[ Tag A ]", "[ Tag B ]"],
    filterKeys: ["tag-04", "tag-05"],
    version: "v0.0",
    executors: ["[ Executor 01 ]", "[ Executor 02 ]"],
    features: [
      "[ Placeholder feature bullet 01 ]",
      "[ Placeholder feature bullet 02 ]",
      "[ Placeholder feature bullet 03 ]"
    ],
    loadstring: 'loadstring(game:HttpGet("https://your-domain.com/scripts/slot_04.lua"))()'
  },
  {
    id: "slot-05",
    slotFileLabel: "slot_05.png",
    thumbnail: "assets/thumbnails/slot_05.png",
    status: "[ STATUS ]",
    title: "[ GAME_NAME_05 ]",
    subtitle: "[ Short placeholder subtitle or script summary ]",
    tags: ["[ Tag A ]", "[ Tag B ]"],
    filterKeys: ["tag-05", "tag-06"],
    version: "v0.0",
    executors: ["[ Executor 01 ]", "[ Executor 02 ]", "[ Executor 03 ]"],
    features: [
      "[ Placeholder feature bullet 01 ]",
      "[ Placeholder feature bullet 02 ]",
      "[ Placeholder feature bullet 03 ]"
    ],
    loadstring: 'loadstring(game:HttpGet("https://your-domain.com/scripts/slot_05.lua"))()'
  },
  {
    id: "slot-06",
    slotFileLabel: "slot_06.png",
    thumbnail: "assets/thumbnails/slot_06.png",
    status: "[ STATUS ]",
    title: "[ GAME_NAME_06 ]",
    subtitle: "[ Short placeholder subtitle or script summary ]",
    tags: ["[ Tag A ]", "[ Tag B ]"],
    filterKeys: ["tag-01", "tag-06"],
    version: "v0.0",
    executors: ["[ Executor 01 ]", "[ Executor 02 ]"],
    features: [
      "[ Placeholder feature bullet 01 ]",
      "[ Placeholder feature bullet 02 ]",
      "[ Placeholder feature bullet 03 ]"
    ],
    loadstring: 'loadstring(game:HttpGet("https://your-domain.com/scripts/slot_06.lua"))()'
  }
];
