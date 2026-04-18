<template>
  <main class="lesson">
    <div class="eyebrow">Module 01 · Bronze</div>
    <h1>What Claude Code is (and isn't)</h1>
    <div class="lesson-meta">~12 min read · mental model</div>

    <p class="lead">
      Claude Code is not a chatbot in a browser. It is an AI that lives in your terminal
      and can read your files, run your commands, and edit your code — with your
      permission, one step at a time.
    </p>

    <h2>The shift</h2>
    <p>
      Most people use AI by copy-pasting. You write a prompt, you paste an answer back
      somewhere else. The AI never touches the thing you're actually working on.
    </p>
    <p>
      Claude Code closes that loop. It sits inside the folder where your work lives, and
      it can <em>do</em> the work — rename 200 files, summarize a PDF, draft an email
      from a meeting transcript, clean up your Downloads — instead of telling you how to.
    </p>

    <div class="callout">
      <p>
        <strong>Mental model:</strong> Claude Code is a careful junior colleague who can
        read everything on your desk, asks before touching anything, and never gets
        tired. You are the manager.
      </p>
    </div>

    <h2>What it is good at</h2>
    <ul>
      <li>Reading many files at once and telling you what's in them</li>
      <li>Making small, explainable edits you can revert</li>
      <li>Running repetitive shell work (rename, move, convert)</li>
      <li>Drafting text grounded in files you already have</li>
      <li>Remembering project context via a file called CLAUDE.md</li>
    </ul>

    <h2>What it is not</h2>
    <ul>
      <li>A browser chatbot — it doesn't live on a website</li>
      <li>A black box — every action is visible and approvable</li>
      <li>Magic — if your files are a mess, it will ask you to clarify</li>
    </ul>

    <h2>What you just did</h2>
    <p>
      You replaced the "AI as vending machine" model with the "AI as careful
      colleague" model. That's the only idea you need for the rest of this course.
    </p>

    <h2>Try this</h2>
    <p>
      Before the next module, write down one task you do every week that involves
      touching more than five files. That task is your first real use case. We'll come
      back to it in Module 06.
    </p>

    <div class="lesson-nav">
      <NuxtLink to="/start" class="btn btn-secondary">← Back to start</NuxtLink>
      <a class="btn btn-primary" aria-disabled="true" style="opacity:0.5; pointer-events:none;">
        Module 02: Install →
      </a>
    </div>
  </main>
</template>
