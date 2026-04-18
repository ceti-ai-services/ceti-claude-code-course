# Video 02 — Install (Mac, Windows, Linux)
**Duration target:** 10–12 min · **Module pairing:** Bronze 02

## Cold open (0:00–0:20)

[B-ROLL: close-up on a terminal. A cursor blinks. Someone types `claude` and presses return. The screen fills with a greeting. Hold 2 seconds.]

Installing Claude Code takes about four minutes on a good day. It is three commands, and one of them is a version check. We are going to do it together, on all three operating systems, in one take.

[PAUSE — 1s beat]

## Shot list

| #  | Time        | Shot                                            | Notes |
|----|-------------|-------------------------------------------------|-------|
| 1  | 0:00–0:20   | B-roll: terminal close-up, `claude` typed       | Shallow focus, warm light |
| 2  | 0:20–0:50   | Talking head                                    | The three commands preview |
| 3  | 0:50–1:10   | Chapter card: "macOS"                           | Oswald title, olive background |
| 4  | 1:10–2:40   | Screen capture: macOS Terminal                  | node --version, install, launch |
| 5  | 2:40–3:40   | Screen capture: first launch and auth choice    | Two auth paths shown |
| 6  | 3:40–4:00   | Chapter card: "Windows"                         | Same style |
| 7  | 4:00–5:40   | Screen capture: PowerShell path                 | Node installer + npm install |
| 8  | 5:40–6:40   | Screen capture: WSL alternative                 | Brief, same commands inside Ubuntu |
| 9  | 6:40–7:00   | Chapter card: "Linux"                           | Same style |
| 10 | 7:00–8:20   | Screen capture: Ubuntu terminal                 | Same three commands |
| 11 | 8:20–9:20   | Screen capture: auth deep-dive                  | API key screen and Claude.ai sign-in screen |
| 12 | 9:20–10:30  | Talking head                                    | Troubleshooting the common failures |
| 13 | 10:30–11:00 | Talking head with end card                      | Outro and tease |

## Teleprompter script

[STAGE DIRECTION: Shot 2 — talking head.]

Before we install anything, the punchline. You need Node on your machine. Then you install one package. Then you type `claude`. That is it. Three commands, one of which just tells you whether you already have Node.

[PAUSE — 1s beat]

I am going to do this on a Mac first, because most of you are on a Mac. Then Windows. Then Linux. Skip to whichever chapter applies to you. They are marked.

[STAGE DIRECTION: Shot 3 — chapter card: "macOS." Hold 1.5s.]

[STAGE DIRECTION: Shot 4 — screen capture. macOS Terminal open. A plain zsh prompt.]

On macOS, we use the Terminal app. Press command-space, type "terminal," hit return. You get a window with a prompt like this.

[STAGE DIRECTION: types `node --version`]

[CURSOR HIGHLIGHT: the command as it is typed]

First command. `node --version`. This checks whether you already have Node installed.

[STAGE DIRECTION: presses return. Output: `v20.11.0` or similar.]

If you see a version number, any version from eighteen onward, you are good. If you get "command not found," pause here, go to nodejs dot org, download the LTS version, double-click the installer, and come back. I will wait.

[PAUSE — 2s beat]

[STAGE DIRECTION: types `npm install -g @anthropic-ai/claude-code`.]

[CURSOR HIGHLIGHT: the full command]

Second command. `npm install -g @anthropic-ai/claude-code`. The `-g` means global, which means it is available from any folder. The `@anthropic-ai slash claude-code` part is the package name. Type it exactly.

[STAGE DIRECTION: presses return. Installation scrolls by. Waits for completion.]

This takes about thirty seconds on a good connection. When it finishes, you see a new prompt and no errors.

[STAGE DIRECTION: types `claude`. Shot 5 begins.]

Third command. `claude`. That is it. One word.

[STAGE DIRECTION: presses return. The CLI launches. A welcome screen appears with an authentication prompt.]

[CURSOR HIGHLIGHT: the authentication prompt]

First time you launch, it asks how you want to sign in. There are two paths here and you only pick one.

[PAUSE — 1s beat]

Path one, Claude dot AI sign-in. If you already pay for Claude on claude dot ai, choose this. It opens a browser, you log in like you always do, and the terminal picks up the session. No copying, no pasting. This is what most of you want.

Path two, API key. If you have an Anthropic API key — and you know if you do — choose this. It asks you to paste a key that starts with `sk-ant`. This path bills you by usage instead of by subscription.

[STAGE DIRECTION: hovers over the "Claude.ai sign-in" choice in the menu, selects it.]

For this video I am picking Claude dot AI sign-in. A browser window opens. I log in. The terminal flashes "authenticated" and drops me into the assistant.

[B-ROLL: brief flash of the browser confirmation screen. 2 seconds.]

That is macOS done. Three commands. Version check, install, launch.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 6 — chapter card: "Windows." Hold 1.5s.]

[STAGE DIRECTION: Shot 7 — screen capture. Windows desktop. Opens PowerShell from the Start menu.]

On Windows, you have two reasonable options. The first is PowerShell, which I will show you now. The second is WSL, which is a Linux environment running inside Windows. I will show that in a moment.

[STAGE DIRECTION: PowerShell open. Types `node --version`.]

[CURSOR HIGHLIGHT: the command]

Same first command. `node --version`. If you see a version number, great. If you see an error, open a browser, go to nodejs dot org, download the Windows installer for the LTS version, run it, click through the defaults, and come back to PowerShell. Then close and reopen PowerShell so it picks up the new Node.

[PAUSE — 1s beat]

[STAGE DIRECTION: types `npm install -g @anthropic-ai/claude-code`.]

Second command. Same as Mac. `npm install -g @anthropic-ai/claude-code`. Press return. Wait for it to finish.

[STAGE DIRECTION: installation completes. Types `claude`. Launch screen appears.]

[CURSOR HIGHLIGHT: the welcome screen]

Third command. `claude`. Same flow. Pick your auth method. Claude dot AI sign-in, or API key.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 8 — screen capture. Opens a Windows Terminal tab running Ubuntu via WSL.]

The other Windows option is WSL. If you already have WSL set up, open your Ubuntu tab, and the commands are exactly what you would run on Linux. `node --version`, `npm install -g @anthropic-ai/claude-code`, `claude`.

If you have never heard of WSL, skip it. PowerShell is fine. You do not need WSL to do this course.

[B-ROLL: quick cut of the three commands running in WSL, no narration, 3 seconds.]

[STAGE DIRECTION: Shot 9 — chapter card: "Linux." Hold 1.5s.]

[STAGE DIRECTION: Shot 10 — screen capture. Ubuntu desktop. Opens a terminal.]

On Linux, I am assuming something Ubuntu-flavored. The commands do not change.

[STAGE DIRECTION: types `node --version`.]

`node --version`. If nothing comes back, install Node. On Ubuntu, the one-liner in the official docs handles it. Do not compile from source. You will lose your afternoon.

[STAGE DIRECTION: types `npm install -g @anthropic-ai/claude-code`.]

`npm install -g @anthropic-ai/claude-code`. Same package name. Note: on some Linux setups, a global npm install wants superuser. If you see a permissions error, there are two clean fixes. One, use a Node version manager like nvm, which installs Node inside your home folder and avoids the issue. Two, configure npm to use a user-level prefix. Either way, do not just slap `sudo` in front of `npm`. It works, but it creates files you will regret later.

[PAUSE — 1s beat]

[STAGE DIRECTION: types `claude`. Launches successfully.]

`claude`. Same welcome screen. Same two auth choices.

[STAGE DIRECTION: Shot 11 — screen capture, split in two. Left: the Claude.ai sign-in browser page. Right: the API key entry screen in the terminal.]

[CURSOR HIGHLIGHT: the sign-in browser page on the left]

Let me stay on that auth screen for a second, because this is where people hesitate.

On the left, what Claude dot AI sign-in looks like. A browser page asks you to approve the CLI. You click approve. The terminal updates and you are in.

[CURSOR HIGHLIGHT: the API key entry on the right]

On the right, what the API key path looks like. A prompt asking you to paste your key. If you do not know where to get an API key, you do not need this path. Use the sign-in path.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 12 — talking head.]

Three failures to watch for.

One. "Command not found: claude" after installing. Close the terminal. Open a new one. The new session picks up the new PATH. Ninety percent of "it did not work" is solved by this.

Two. Permissions errors during `npm install -g`. On Mac and Linux, use nvm if you have it. On Windows, reinstall Node from the official installer as admin. Do not fight the permissions with sudo.

Three. "Authentication failed" on first launch. The browser handshake can silently time out. Quit the CLI with Ctrl-C, run `claude` again, pick your auth method again. The second try almost always works.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 13 — talking head with end card: "Next: First session."]

Once `claude` launches and you see the assistant prompt, you are done with installation forever. It is a one-time setup.

## On-screen callouts (complete list)

- [0:05] Title card: "Install" — Oswald 700, cream on olive, 2s hold
- [1:15] Command annotation: `node --version` — "Checks if Node is installed"
- [1:40] Command annotation: `npm install -g @anthropic-ai/claude-code` — "Installs Claude Code globally"
- [2:25] Command annotation: `claude` — "Launches the assistant in this folder"
- [2:50] Callout pill: "Pick one auth path" — sage, 3s hold
- [2:55] Label: "Claude.ai sign-in" / "API key" — two pills side by side
- [3:50] Chapter card: "Windows" — Oswald, 2s hold
- [4:05] Command annotation: `node --version` (PowerShell) — "Same command in PowerShell"
- [4:35] Command annotation: `npm install -g @anthropic-ai/claude-code` (PowerShell)
- [5:25] Command annotation: `claude` (PowerShell)
- [5:50] Callout: "WSL is optional. PowerShell is fine." — italic DM Sans, 4s hold
- [6:50] Chapter card: "Linux" — Oswald, 2s hold
- [7:15] Warning pill: "Do not sudo npm" — camel background, 4s hold
- [8:30] Label on split screen: "Claude.ai sign-in" (left) / "API key" (right) — persistent through shot
- [9:30] Troubleshooting list heading: "If it did not work" — Oswald, 2s hold
- [9:40] List items: "Close and reopen terminal" / "Avoid sudo" / "Retry auth" — stagger in 0.5s apart
- [10:35] End card: "Next: First session" — JetBrains Mono, bottom-right, 3s hold

## Outro (last 20s)

[STAGE DIRECTION: talking head, end card visible.]

Next video, we open Claude in a real folder and do something with it.
