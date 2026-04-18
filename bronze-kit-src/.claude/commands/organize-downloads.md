---
name: organize-downloads
description: Scan a Downloads folder, propose a grouping, and move files only after approval.
---

Help the user tidy up a Downloads folder. The user will give you a path (typically `~/Downloads`). If they don't, ask for it.

### Step 1: scan, don't touch

Read the directory listing. Do not move, rename, or delete anything yet. Just look.

### Step 2: propose a grouping

Sort what you see into these buckets:

- **Invoices** — bills, paid receipts from vendors, anything that looks like an accounting record
- **Receipts** — personal purchase confirmations, order summaries
- **Screenshots** — image files that look auto-generated (dimensions, timestamp names, "Screen Shot" prefix)
- **Installers** — `.dmg`, `.pkg`, `.exe`, `.msi`, `.zip` of app downloads
- **Everything else** — anything that doesn't obviously fit

For each bucket, list the filenames (up to 10 per bucket; summarize overflow as "…and 14 more"). Be honest when you're unsure which bucket something goes in — flag it rather than force-fitting.

### Step 3: ask for approval

Show the user the proposed plan and ask explicitly: **"Move files into these groups? (yes / no / let me edit)"**

Wait for a clear yes. If they say "let me edit," let them reassign before you do anything.

### Step 4: move — carefully

Only after the user has said yes:

- Create subfolders inside the Downloads directory (`Invoices/`, `Receipts/`, `Screenshots/`, `Installers/`, `Other/`).
- Move each file to its assigned bucket.
- Report what was moved. If anything failed, say which and why.

Never delete files. If the user asks you to delete, push back once and suggest moving to an `_Archive/` folder instead.
