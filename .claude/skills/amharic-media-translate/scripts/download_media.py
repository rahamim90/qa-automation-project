#!/usr/bin/env python3
"""Resolve a video source (YouTube URL or local file) into a normalized
16kHz mono WAV file ready for transcription.

Usage:
    python3 download_media.py <youtube_url_or_local_path> <output_wav_path>

Prints a single line of JSON to stdout on success:
    {"wav_path": "...", "source": "youtube"|"local", "title": "..."}
"""
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from urllib.parse import urlparse


def is_url(value: str) -> bool:
    parsed = urlparse(value)
    return parsed.scheme in ("http", "https")


def download_youtube_audio(url: str, workdir: Path) -> tuple[Path, str]:
    import yt_dlp

    out_template = str(workdir / "source.%(ext)s")
    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": out_template,
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        downloaded = Path(ydl.prepare_filename(info))
    return downloaded, info.get("title", "")


def to_wav(input_path: Path, output_path: Path) -> None:
    if not shutil.which("ffmpeg"):
        raise RuntimeError("ffmpeg not found on PATH; run scripts/setup_deps.sh first")
    subprocess.run(
        [
            "ffmpeg", "-y", "-i", str(input_path),
            "-ac", "1", "-ar", "16000",
            str(output_path),
        ],
        check=True,
        capture_output=True,
    )


def main() -> None:
    if len(sys.argv) != 3:
        print("Usage: download_media.py <youtube_url_or_local_path> <output_wav_path>", file=sys.stderr)
        sys.exit(1)

    source, output_wav = sys.argv[1], Path(sys.argv[2])
    output_wav.parent.mkdir(parents=True, exist_ok=True)

    title = ""
    if is_url(source):
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            downloaded, title = download_youtube_audio(source, tmp_path)
            to_wav(downloaded, output_wav)
        origin = "youtube"
    else:
        local_path = Path(source)
        if not local_path.exists():
            print(f"File not found: {local_path}", file=sys.stderr)
            sys.exit(1)
        to_wav(local_path, output_wav)
        title = local_path.stem
        origin = "local"

    print(json.dumps({"wav_path": str(output_wav), "source": origin, "title": title}))


if __name__ == "__main__":
    main()
