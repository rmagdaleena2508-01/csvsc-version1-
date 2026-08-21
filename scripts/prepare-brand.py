"""
Turns the supplied JPEG brand art into web assets:
white backgrounds become transparent, edges stay anti-aliased, and each mark is
trimmed to its own bounding box so it can be sized purely by CSS.

Run once after dropping new source files into scripts/source/.
"""
from collections import deque
from pathlib import Path
from PIL import Image

SRC = Path("scripts/source")
OUT = Path("public/images/brand")
OUT.mkdir(parents=True, exist_ok=True)


def load(name):
    return Image.open(SRC / name).convert("RGBA")


def drop_white(img, lum_floor=196, sat_max=34):
    """Global white knockout — for marks whose interior should show the sky."""
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            lo, hi = min(r, g, b), max(r, g, b)
            lum = (r + g + b) / 3
            if hi - lo <= sat_max and lum >= lum_floor:
                a = int(max(0, min(255, (255 - lum) / (255 - lum_floor) * 255)))
                px[x, y] = (r, g, b, a)
    return img


def drop_surround(img, lum_floor=200, sat_max=40):
    """Flood the outside white only — interior whites (a seal's field) survive."""
    px = img.load()
    w, h = img.size

    def whiteish(x, y):
        r, g, b, _ = px[x, y]
        return max(r, g, b) - min(r, g, b) <= sat_max and (r + g + b) / 3 >= lum_floor

    seen = [[False] * w for _ in range(h)]
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if whiteish(x, y) and not seen[y][x]:
                q.append((x, y)); seen[y][x] = True
    for y in range(h):
        for x in (0, w - 1):
            if whiteish(x, y) and not seen[y][x]:
                q.append((x, y)); seen[y][x] = True

    while q:
        x, y = q.popleft()
        r, g, b, _ = px[x, y]
        lum = (r + g + b) / 3
        px[x, y] = (r, g, b, int(max(0, min(255, (255 - lum) / (255 - lum_floor) * 255))))
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx] and whiteish(nx, ny):
                seen[ny][nx] = True
                q.append((nx, ny))
    return img


def trim(img):
    box = img.split()[-1].getbbox()
    return img.crop(box) if box else img


def save(img, name):
    img.save(OUT / name, optimize=True)
    print(name, img.size)


save(trim(drop_white(load("csi-logo.jpeg"))), "csi-emblem.png")
save(trim(drop_surround(load("srmist-logo.jpeg"))), "srmist-seal.png")

for src, name, width in (
    ("sky-wide.jpeg", "sky-wide.jpg", 1920),
    ("sky-tall.jpeg", "sky-tall.jpg", 1080),
):
    im = Image.open(SRC / src).convert("RGB")
    h = round(im.height * width / im.width)
    im = im.resize((width, h), Image.LANCZOS)
    im.save(OUT / name, quality=86, optimize=True, progressive=True)
    print(name, im.size)
