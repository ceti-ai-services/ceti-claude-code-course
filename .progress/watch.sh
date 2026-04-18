#!/usr/bin/env bash
# Watch all git refs (local + remote) for new commits and emit one line per new SHA.
# After N consecutive idle polls, emit one IDLE event so the monitor agent can pick up.
set -u

REPO="/home/user/ceti-claude-code-course"
STATE_DIR="$REPO/.progress/.state"
mkdir -p "$STATE_DIR"
STATE_FILE="$STATE_DIR/refs.tsv"
SEEN_FILE="$STATE_DIR/seen-shas.txt"
touch "$STATE_FILE" "$SEEN_FILE"

POLL_SECS=60
IDLE_THRESHOLD=10   # 10 polls * 60s = ~10 min before emitting IDLE
idle_count=0
idle_emitted=0

cd "$REPO" || { echo "FATAL cannot cd $REPO"; exit 2; }

# Seed: record current refs without emitting (we already documented them)
git fetch --all --prune --quiet 2>/dev/null || true
git for-each-ref --format='%(refname)\t%(objectname)' refs/heads refs/remotes > "$STATE_FILE"
git log --all --pretty=format:'%H' >> "$SEEN_FILE"
sort -u "$SEEN_FILE" -o "$SEEN_FILE"

echo "WATCH_START $(date -u +%FT%TZ) refs=$(wc -l < "$STATE_FILE" | tr -d ' ')"

while true; do
  sleep "$POLL_SECS"
  git fetch --all --prune --quiet 2>/dev/null || true

  new_state=$(git for-each-ref --format='%(refname)\t%(objectname)' refs/heads refs/remotes)
  current_shas=$(git log --all --pretty=format:'%H' 2>/dev/null)

  saw_new=0
  while IFS= read -r sha; do
    [ -z "$sha" ] && continue
    if ! grep -qx "$sha" "$SEEN_FILE"; then
      # New commit anywhere in the graph
      meta=$(git log -1 --pretty=format:'%h|%cI|%an|%s' "$sha" 2>/dev/null)
      # Find which refs contain it
      refs=$(git for-each-ref --contains "$sha" --format='%(refname:short)' refs/heads refs/remotes | tr '\n' ',' | sed 's/,$//')
      # Skip commits that only touch the monitor branch (our own activity)
      monitor_only=$(echo "$refs" | tr ',' '\n' | grep -vE '(^|/)claude/monitor-git-progress-5nk7H$' | head -1)
      if [ -z "$monitor_only" ]; then
        echo "$sha" >> "$SEEN_FILE"
        continue
      fi
      echo "NEW_COMMIT $meta refs=${refs:-unknown}"
      echo "$sha" >> "$SEEN_FILE"
      saw_new=1
    fi
  done <<< "$current_shas"

  # Detect ref movement (e.g. branch reset / new branch with no new SHA)
  if ! diff -q <(echo "$new_state") "$STATE_FILE" >/dev/null 2>&1; then
    # Filter out monitor-branch ref movement (our own pushes)
    diff <(sort "$STATE_FILE") <(echo "$new_state" | sort) \
      | grep -E '^[<>]' \
      | grep -vE 'claude/monitor-git-progress-5nk7H' \
      | while read -r line; do
        echo "REF_CHANGE $line"
        saw_new=1
      done
    echo "$new_state" > "$STATE_FILE"
  fi

  if [ "$saw_new" -eq 1 ]; then
    idle_count=0
    idle_emitted=0
  else
    idle_count=$((idle_count + 1))
    if [ "$idle_count" -ge "$IDLE_THRESHOLD" ] && [ "$idle_emitted" -eq 0 ]; then
      echo "IDLE no_new_commits_for=${idle_count}_polls (~$((idle_count * POLL_SECS / 60))min) ts=$(date -u +%FT%TZ)"
      idle_emitted=1
    fi
  fi
done
