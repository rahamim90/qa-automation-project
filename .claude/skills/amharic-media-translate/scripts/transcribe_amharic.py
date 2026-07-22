#!/usr/bin/env python3
"""Transcribe an Amharic-language audio file using local Whisper.

Usage:
    python3 transcribe_amharic.py <wav_path> [model_size]

model_size defaults to "medium". Use "small" for faster/lower-accuracy runs
on long files, or "large-v3" for best accuracy when time allows (CPU-only
inference is slow -- expect several times realtime).

Prints JSON to stdout:
    {"text": "...", "segments": [{"start": 0.0, "end": 3.2, "text": "..."}]}
"""
import json
import sys


def main() -> None:
    if len(sys.argv) not in (2, 3):
        print("Usage: transcribe_amharic.py <wav_path> [model_size]", file=sys.stderr)
        sys.exit(1)

    wav_path = sys.argv[1]
    model_size = sys.argv[2] if len(sys.argv) == 3 else "medium"

    import whisper

    model = whisper.load_model(model_size)
    result = model.transcribe(wav_path, language="am")

    segments = [
        {"start": seg["start"], "end": seg["end"], "text": seg["text"].strip()}
        for seg in result["segments"]
    ]
    print(json.dumps({"text": result["text"].strip(), "segments": segments}, ensure_ascii=False))


if __name__ == "__main__":
    main()
