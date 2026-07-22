---
name: amharic-media-translate
description: תמלול ותרגום תוכן באמהרית מתוך סרטונים, קישורי יוטיוב, ותמונות - לעברית ולאנגלית, כולל תעתיק פונטי והסבר. Use when the user provides Amharic-language video files, YouTube links, or images and asks to transcribe, translate, or transliterate the Amharic content into Hebrew and/or English.
---

# Amharic Media Transcription & Translation

Transcribes Amharic (Ge'ez script) speech from video/audio/YouTube, and
Amharic text from images, then produces a full bilingual (Hebrew + English)
translation with phonetic transliteration and explanatory notes.

## Inputs this skill handles

- Local video or audio files (any format ffmpeg can read)
- YouTube URLs (single videos; playlists are not supported)
- Images containing Amharic text

## One-time-per-session setup

Dependencies (`ffmpeg`, `yt-dlp`, `openai-whisper`) do not persist across
sessions in ephemeral environments, so check/install them before first use
each session:

```bash
bash .claude/skills/amharic-media-translate/scripts/setup_deps.sh
```

This script is idempotent — safe to run every time, it only installs what's
missing.

## Workflow

### For images

Read the image directly (native vision) — do not shell out to an OCR tool.
Transcribe the Amharic text visible in the image verbatim before translating.
If handwriting or image quality makes part of the text illegible, say so
explicitly rather than guessing.

### For video files, audio files, or YouTube links

1. Download/normalize to a 16kHz mono WAV:

   ```bash
   python3 .claude/skills/amharic-media-translate/scripts/download_media.py <url_or_path> /tmp/amharic_audio.wav
   ```

   Works for both a YouTube URL and a local file path — it detects which one
   it got.

2. Transcribe with local Whisper:

   ```bash
   python3 .claude/skills/amharic-media-translate/scripts/transcribe_amharic.py /tmp/amharic_audio.wav [model_size]
   ```

   `model_size` defaults to `medium`. This runs on CPU in most environments,
   so it is not real-time:
   - Use `small` for long files (>10 min) or when a quick pass is enough.
   - Use `large-v3` only for short clips where accuracy matters most.
   - Tell the user up front roughly how long transcription may take for
     longer inputs, since CPU inference can run several times slower than
     real time.

   Output is JSON with a full `text` field and a `segments` array (each with
   `start`, `end`, `text`) — use the segments to structure the translation
   output below.

### Producing the translation (always done by you, not a script)

Once you have the Amharic text (from Whisper segments or from reading an
image), do NOT just pass it through a translation API. Read and apply:

- `reference/amharic_transliteration_guide.md` — for consistent phonetic
  transliteration into Hebrew letters and Latin letters.
- `reference/output_template.md` — for the exact output structure to follow.

For each segment (or the whole text, if untimed), produce:
1. The original Amharic (Ge'ez script), verbatim
2. Phonetic transliteration in Hebrew letters
3. Phonetic transliteration in Latin/English letters
4. A full, natural, meaning-based translation into Hebrew
5. A full, natural, meaning-based translation into English
6. A short explanation of anything a literal translation would miss — idioms,
   cultural references, ambiguous words, names, or honorifics

Translations should read naturally in the target language, not word-for-word.
Transliterations should be strictly phonetic (how it sounds), not a
transcription of the spelling.

If a video is long, close with a short overall summary in both Hebrew and
English in addition to the per-segment breakdown.

## Notes and limits

- Whisper's Amharic support is real but weaker than for high-resource
  languages; flag low-confidence or unclear passages instead of silently
  smoothing them over.
- YouTube downloads depend on the video being publicly accessible; age-
  restricted, private, or region-locked videos may fail — report the error
  to the user rather than retrying blindly.
- Clean up temporary audio files (e.g. `/tmp/amharic_audio.wav`) after use.
