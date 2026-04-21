---
title: MCP — give Claude the tools your work already uses.
module: "11"
time: "14 min"
tags: [mcp, tools, integration, bronze]
skills_gained: [mcp-mental-model, prao-loop, first-connector]
persona_aware: false
---

# MCP — give Claude the tools your work already uses.

So far, Claude can see files in your folder. That's a lot. It's not everything.

Your Monday lives in Gmail, your week lives in Calendar, your clients live in a Notion database, and your numbers live in a Google Sheet. Claude Code reads the folder. It doesn't read those. Not until you connect them.

**MCP — Model Context Protocol** — is the wire. One protocol, many tools. When you connect a tool through MCP, Claude gets three things from it: a list of *capabilities* (tools it can call), a view of *current state* (resources it can read), and a way to *run* a capability and get a structured result back. That's it. Three primitives, one loop.

The loop is what matters. When Claude solves anything with an outside tool, it runs through four phases: **Perceive → Reason → Act → Observe.** PRAO. The loop restarts on every new turn. Understanding PRAO is how you understand *why* an agent chooses the wrong tool, *why* a prompt misfires, and *why* the quality of a tool description decides the ceiling on how useful that tool is.

<Callout variant="core-idea">
MCP is the protocol. PRAO is the loop Claude runs inside that protocol. Every MCP call — Gmail, Calendar, Notion, the Sheet — travels the same loop.
</Callout>

## The loop, one phase at a time

<PraoLoop />

## What to install first

If this is your first connector, install one where the payoff is immediate and the failure mode is safe.

**Gmail (read-only)** — Claude can read inbox and threads but can't send without your explicit approval. Good first connector because the value (inbox triage, reply drafting) shows up in the first session.

**Google Calendar (read-only)** — Claude sees your week, proposes time slots, drafts invite copy. Pair with Gmail and you've covered ~70% of your recurring text work.

**Notion or Google Drive (read)** — if your source material lives there, your CLAUDE.md lands lighter because Claude can go find context instead of you pasting it.

<Callout variant="tip">
Start read-only. Upgrade to write-enabled once the loop feels boring. The backup-first habit from Module 04 applies doubled when a connector can mutate state in an external tool.
</Callout>

<TryThis time="8 min">

Install one MCP connector today. Gmail is the recommended first one.

1. In Claude Code, run `/mcp` — you'll see the list of connectors currently wired to your session.
2. Follow the prompt to add Gmail (or pick a different one from the list). Claude Code opens a browser tab for the OAuth grant — approve the minimum scope it asks for.
3. Back in the terminal, ask: `what's the oldest unread email in my inbox from someone I've replied to before?` Watch Claude run the PRAO loop — it perceives the tool, reasons about the query, acts with an API call, observes the result.
4. Read the answer. Notice: this question would take you three minutes of scrolling. The loop took Claude fifteen seconds.

If the first connector works, install one more this week. If it didn't — the connector asked for a scope you weren't comfortable granting, or the result is off — close it, move on, and try again after Module 12 (git integration) where you'll see the PRAO loop applied to a tool you fully understand.

</TryThis>

<Recap>

MCP connects Claude to the tools where your actual work lives — Gmail, Calendar, Notion, your database. The protocol exposes three primitives (tools, resources, results), and every call travels the same four-phase PRAO loop: Perceive → Reason → Act → Observe. Start with one read-only connector. Let the loop feel boring before you graduate to write-enabled tools.

</Recap>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will ask which connector the reader picked and whether the OAuth scope ask was comfortable. -->
