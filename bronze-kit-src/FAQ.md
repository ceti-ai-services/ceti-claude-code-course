# FAQ — Bronze Kit

Real problems, real fixes. If your issue isn't here, the install script and Anthropic's docs are the next stop.

---

## 1. "claude: command not found" after install

Your package manager installed Claude Code, but your shell can't find it. This almost always means the directory where `npm` puts global binaries isn't on your `PATH`.

### Try the easy fix first

Close your terminal completely and open a new one. Many shells only read `PATH` changes at startup.

```bash
# In the new terminal:
claude --version
```

If that works, you're done. If not, keep reading.

### macOS and Linux

Find where `npm` is installing globals:

```bash
npm config get prefix
# Typical outputs:
#   /usr/local           → binaries go in /usr/local/bin
#   /opt/homebrew        → binaries go in /opt/homebrew/bin (Apple Silicon)
#   /Users/you/.npm-global → binaries go in /Users/you/.npm-global/bin
```

The `bin/` directory under the prefix is what you need on your `PATH`. Check whether it's there:

```bash
echo $PATH
```

If the prefix's `bin` directory isn't listed, add it. Open `~/.zshrc` (macOS default) or `~/.bashrc` (most Linux) and add this line near the bottom, replacing the path with your actual prefix:

```bash
export PATH="/Users/you/.npm-global/bin:$PATH"
```

Save, then reload:

```bash
source ~/.zshrc   # or source ~/.bashrc
claude --version
```

### Windows

`npm` installs globals to `%AppData%\npm` by default — typically `C:\Users\YourName\AppData\Roaming\npm`.

1. Press `Win`, type "environment variables," open "Edit the system environment variables."
2. Click **Environment Variables…**
3. Under **User variables**, select `Path`, click **Edit**.
4. Add `%AppData%\npm` if it isn't there.
5. Click OK out of every dialog.
6. Close and reopen PowerShell or Command Prompt. Try `claude --version`.

### Windows PowerShell execution policy

If PowerShell says the script is disabled, allow signed local scripts:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Answer `Y`. This is the recommended setting — it still blocks untrusted downloads.

---

## 2. Where `npm -g` installs things

| OS | Default global binary path |
|---|---|
| macOS (Homebrew, Apple Silicon) | `/opt/homebrew/bin` |
| macOS (Homebrew, Intel) | `/usr/local/bin` |
| macOS (official Node installer) | `/usr/local/bin` |
| Linux (distro package) | `/usr/bin` or `/usr/local/bin` |
| Linux (official Node installer) | `/usr/local/bin` |
| Linux (nvm) | `~/.nvm/versions/node/vXX.Y.Z/bin` |
| Windows | `%AppData%\npm` (e.g. `C:\Users\You\AppData\Roaming\npm`) |

To see exactly where yours goes:

```bash
npm config get prefix
npm bin -g
```

Whatever `npm bin -g` prints needs to be on your `PATH`.

---

## 3. Permission errors on install

If you see `EACCES` or "permission denied" when running `npm install -g`, you have two choices. One is wrong.

### Don't: `sudo npm install -g`

It works, but it installs global packages as root. Later commands that don't use `sudo` can't touch those files. You'll end up fighting yourself for the rest of the year. Avoid unless you know what you're doing.

### Do: fix the npm prefix

Tell `npm` to install globals into your home directory. No root required.

**macOS / Linux:**

```bash
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
```

Add `~/.npm-global/bin` to your `PATH` (see section 1). Then retry:

```bash
npm install -g @anthropic-ai/claude-code
```

**Windows:**

The default prefix (`%AppData%\npm`) is already user-scoped — you shouldn't need `sudo`-style escalation. If you see permission errors anyway, run PowerShell as Administrator once, install, then go back to a normal prompt for daily use.

---

## 4. Permission errors on file edits (Claude asks for approval)

This is by design. Claude Code will pause and ask before it edits, deletes, or runs shell commands. You'll see a prompt — approve, deny, or allow once.

### If the approval prompt seems stuck

- Make sure your terminal is the focused window. Approval keystrokes don't work in the background.
- Press `y` then `Enter`. Not just `y`.
- If nothing happens, press `Esc` to cancel and retry the command.
- If Claude isn't asking at all when you expected it to, your `.claude/settings.json` may have pre-approved the action. That's fine — it's what that file is for — but worth knowing.

### If Claude denies itself something

Rarely, Claude will refuse to touch a file it thinks is risky (system files, hidden config). Explicitly tell it the path is safe and you're asking on purpose. It'll usually proceed.

---

## 5. Node too old

Claude Code needs **Node.js 18 or newer**. Check yours:

```bash
node -v
```

If it prints `v16.x.x` or lower, upgrade.

### macOS / Linux with nvm (recommended)

`nvm` lets you switch Node versions without touching system files:

```bash
# Install nvm (once)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Close and reopen your terminal, then:
nvm install --lts
nvm use --lts
node -v   # should now print v20.x or newer
```

### macOS / Linux without nvm

Download the LTS installer from [nodejs.org](https://nodejs.org). It replaces the system version.

### Windows

Either install from [nodejs.org](https://nodejs.org) (simplest) or use [nvm-windows](https://github.com/coreybutler/nvm-windows) if you juggle Node versions.

After upgrading, reinstall Claude Code:

```bash
npm install -g @anthropic-ai/claude-code
```

---

## 6. API key vs. Claude.ai sign-in

Claude Code supports two auth methods:

1. **Sign in with your Claude.ai account** (recommended for most people). No key to manage. Usage counts against your Claude.ai plan.
2. **API key from console.anthropic.com** (recommended for heavy use or anyone with a team billing account). Pay per token. More control.

Pick whichever matches how you bought Claude. If you're starting fresh and unsure, use the Claude.ai sign-in. You can switch later.

### Setting the API key as an environment variable

If you use the API key path, Claude Code reads it from `ANTHROPIC_API_KEY`.

**macOS / Linux** — add to `~/.zshrc` or `~/.bashrc`:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

Reload: `source ~/.zshrc`. Test: `echo $ANTHROPIC_API_KEY`.

**Windows (PowerShell)** — set it permanently for your user:

```powershell
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY','sk-ant-...','User')
```

Close and reopen PowerShell. Test: `$env:ANTHROPIC_API_KEY`.

**Windows (Command Prompt)** — use `setx`:

```cmd
setx ANTHROPIC_API_KEY "sk-ant-..."
```

Close and reopen `cmd`. Test: `echo %ANTHROPIC_API_KEY%`.

Never paste your key into a chat or commit it to a git repo. If you leak one, rotate it immediately in the Anthropic console.

---

## 7. "Claude doesn't see my file"

Claude Code can only see files inside (or below) the directory you launched it from. That directory is its working directory. If you started Claude in your home folder and then ask about `~/Documents/work/brief.md`, Claude can read it — but if you started Claude in `~/Desktop` and the file lives in `~/Documents`, Claude needs the full path or you need to restart in the right place.

### The fix

Exit Claude (`Ctrl+C` or `/exit`). `cd` into the folder that actually contains your work. Relaunch.

```bash
cd ~/work/alex
claude
```

A good rule of thumb: the folder you launch Claude from should be the folder your `CLAUDE.md` lives in.

### If Claude says a file doesn't exist and you're sure it does

Check the path spelling. Check capitalization — `Brief.md` and `brief.md` are different on macOS if the drive is case-sensitive (rare) and always different on Linux. Try `ls` in your terminal to confirm the file is actually where you think it is.

---

## 8. WSL vs. native Windows

If you're on Windows, you have two paths:

- **Native Windows (PowerShell or Command Prompt).** Works. Occasional friction with npm paths and execution policies (see section 1).
- **WSL (Windows Subsystem for Linux).** A full Linux environment inside Windows. Closer to how most developer tooling expects to behave.

### Our recommendation

If you're not sure, **use native Windows first.** It's one less thing to install, and Claude Code works fine there for non-developer workflows.

Consider WSL if:

- You're already using it for other work.
- You hit recurring PATH or permission weirdness on native Windows.
- You plan to follow along with guides written for macOS or Linux.

To install WSL:

```powershell
wsl --install
```

Restart when prompted. Then launch "Ubuntu" from the Start menu and install Node + Claude Code inside the Linux environment. Files in your Windows home directory are accessible under `/mnt/c/Users/YourName/`.

---

## Still stuck?

- Check the Claude Code docs: [docs.anthropic.com/claude-code](https://docs.anthropic.com/claude-code)
- Search the error message verbatim. Nine times out of ten someone else hit it first.
- If you're in the CETI.AI course cohort, bring the exact error text to the next session. "It didn't work" is hard to debug. "`claude: command not found`, Node v20.11.0, macOS 14.4" is easy.
