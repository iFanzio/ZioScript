# Obsidian Glassmorphic Script Hub — Organized Project Template

Everything in this folder is **100% static and ready to upload** directly to **Vercel**, **Netlify**, **GitHub Pages**, **Cloudflare Pages**, or any **cPanel / SFTP** web host (`public_html`). No build tools or `npm install` required.

---

## Folder Structure

```text
script-hub-template/
├── index.html                  # Main webpage structure (no need to touch unless changing layout)
├── vercel.json                 # Optional hosting config (serves .lua files as clean plain text)
├── README.md                   # This setup & workflow guide
├── css/
│   └── style.css               # Aurora Glow & Cyber-Grid animations + Glassmorphism theme
├── js/
│   ├── config.js               # ⭐ EDIT THIS FILE to change site text, menu, tags & cards
│   └── app.js                  # Search, filters, bookmarks, thumbnail auto-fallback & modal logic
├── assets/
│   ├── logo.svg                # Your brand logo (replace with your own logo.svg or logo.png)
│   └── thumbnails/             # ⭐ DROP YOUR 16:9 THUMBNAIL IMAGES HERE
│       └── .gitkeep
└── scripts/                    # ⭐ OPTIONAL: Place raw .lua scripts here to self-host them
    └── slot_01.lua
```

---

## How to Add Thumbnails (Zero Code Needed!)

1. Prepare a **16:9** image (recommended: `1280x720` or `800x450` in `.png`, `.jpg`, or `.webp`).
2. Name it to match the slot (for example: `slot_01.png`, `slot_02.png`, etc.) and drop it inside:
   ```text
   assets/thumbnails/
   ```
3. **Automatic Fallback**: If `slot_01.png` is not in `assets/thumbnails/` yet, the card automatically displays the dashed blueprint dropzone (`16:9 THUMBNAIL • slot_01.png`). The moment you upload `slot_01.png`, it appears automatically!

---

## How to Add or Edit Script Cards

Open **`js/config.js`** in any text editor and edit `SITE_CONFIG` or `SCRIPT_SLOTS`:

```javascript
{
  id: "slot-07",
  slotFileLabel: "slot_07.png",
  thumbnail: "assets/thumbnails/slot_07.png",
  status: "Keyless",
  title: "Your Game Name",
  subtitle: "Auto Farm, ESP & Teleport Hub",
  tags: ["Keyless", "Mobile Ready"],
  filterKeys: ["tag-01", "tag-02"],
  version: "v1.4",
  executors: ["Solara", "Wave", "Delta"],
  features: [
    "Fast Auto Farm",
    "Player & Item ESP",
    "Anti-AFK Built-in"
  ],
  loadstring: 'loadstring(game:HttpGet("https://your-domain.com/scripts/slot_07.lua"))()'
}
```

---

## How to Deploy / Upload

- **Vercel / Netlify / Cloudflare Pages**: Drag and drop the entire `script-hub-template` folder (or push to GitHub and connect the repo). Leave Build Command empty and Output Directory as `.`.
- **cPanel / SFTP Hosting**: Upload all files and folders inside `script-hub-template/` directly into your `public_html/` directory.
