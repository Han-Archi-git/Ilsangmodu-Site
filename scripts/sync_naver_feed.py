"""네이버 공개 RSS 전체 목록을 사이트에서 읽을 JSON으로 저장한다."""
from __future__ import annotations

import argparse
import html
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path


def read_feed(blog_id: str) -> list[dict[str, object]]:
    """RSS를 읽고 글의 원본 카테고리·이미지·날짜를 보존한다."""
    request = urllib.request.Request(
        f"https://rss.blog.naver.com/{blog_id}",
        headers={"User-Agent": "Mozilla/5.0"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        root = ET.fromstring(response.read())
    channel = root.find("channel")
    if channel is None:
        raise ValueError("네이버 RSS 채널을 찾을 수 없습니다.")
    items: list[dict[str, object]] = []
    for entry in channel.findall("item"):
        description = entry.findtext("description", "")
        image = re.search(r'<img[^>]+src=["\']([^"\']+)', description, re.IGNORECASE)
        pub_date = entry.findtext("pubDate", "")
        items.append({
            "title": entry.findtext("title", ""),
            "pubDate": parsedate_to_datetime(pub_date).isoformat() if pub_date else "",
            "link": entry.findtext("link", ""),
            "guid": entry.findtext("guid", "") or entry.findtext("link", ""),
            "author": entry.findtext("author", ""),
            "thumbnail": html.unescape(image.group(1)) if image else "",
            "description": description,
            "content": description,
            "enclosure": {},
            "categories": [category.text or "" for category in entry.findall("category")],
        })
    if not items:
        raise ValueError("글 목록이 비어 있어 기존 사이트 목록을 유지합니다.")
    return items


def main() -> None:
    """정상 응답을 확인한 뒤에만 목록 파일을 교체한다."""
    parser = argparse.ArgumentParser()
    parser.add_argument("--blog-id", default="ilsangmodu")
    parser.add_argument("--output", type=Path, default=Path("public/naver-posts.json"))
    args = parser.parse_args()
    try:
        items = read_feed(args.blog_id)
        payload = json.dumps({"status": "ok", "items": items}, ensure_ascii=False, indent=2) + "\n"
        args.output.parent.mkdir(parents=True, exist_ok=True)
        temporary = args.output.with_suffix(".tmp")
        temporary.write_text(payload, encoding="utf-8")
        temporary.replace(args.output)
        print(f"네이버 RSS {len(items)}개 글을 저장했습니다.")
    except Exception as error:
        raise SystemExit(f"동기화 실패: {error}") from error


if __name__ == "__main__":
    main()
