#!/usr/bin/env bash
# Idempotent dependency setup for the amharic-media-translate skill.
# Safe to re-run: each step checks whether the tool is already present before installing.
set -euo pipefail

if ! command -v ffmpeg >/dev/null 2>&1; then
    echo "[setup] Installing ffmpeg..."
    if command -v apt-get >/dev/null 2>&1; then
        apt-get update -qq && apt-get install -y -qq ffmpeg
    else
        echo "[setup] ERROR: apt-get not found; install ffmpeg manually for your platform." >&2
        exit 1
    fi
else
    echo "[setup] ffmpeg already present."
fi

PYTHON=${PYTHON:-python3}

if ! "$PYTHON" -c "import yt_dlp" >/dev/null 2>&1; then
    echo "[setup] Installing yt-dlp..."
    "$PYTHON" -m pip install --quiet -U yt-dlp
else
    echo "[setup] yt-dlp already present."
fi

if ! "$PYTHON" -c "import whisper" >/dev/null 2>&1; then
    echo "[setup] Installing openai-whisper (this also pulls in torch, can take a while)..."
    "$PYTHON" -m pip install --quiet -U openai-whisper
else
    echo "[setup] openai-whisper already present."
fi

echo "[setup] All dependencies ready."
