"""
Builds the social preview card: 1200x630, the chapter emblem over the hero sky.

Link previews are the one place the site gets rendered by someone else, so the
image has to carry the name on its own — a cropped hero would read as an
anonymous photograph in a feed.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

W, H = 1200, 630
OUT = Path("public/images/brand/og.jpg")
NAVY = (18, 38, 92)

sky = Image.open("public/images/brand/sky-wide.jpg").convert("RGB")
scale = max(W / sky.width, H / sky.height)
sky = sky.resize((round(sky.width * scale), round(sky.height * scale)), Image.LANCZOS)
left = (sky.width - W) // 2
top = int((sky.height - H) * 0.42)
card = sky.crop((left, top, left + W, top + H))
card = ImageEnhance.Brightness(card).enhance(1.04)

# Lift the lower half so navy text holds against the clouds.
veil = Image.new("RGBA", (W, H), (0, 0, 0, 0))
vd = ImageDraw.Draw(veil)
for y in range(H):
    a = int(200 * max(0.0, (y - H * 0.34) / (H * 0.66)) ** 1.25)
    vd.line([(0, y), (W, y)], fill=(247, 242, 233, a))
card = Image.alpha_composite(card.convert("RGBA"), veil).convert("RGB")

emblem = Image.open("public/images/brand/csi-emblem.png").convert("RGBA")
size = 250
emblem = emblem.resize((size, size), Image.LANCZOS)
card.paste(emblem, ((W - size) // 2, 92), emblem)

draw = ImageDraw.Draw(card)


def font(path, px):
    return ImageFont.truetype(path, px)


title = font("/System/Library/Fonts/Helvetica.ttc", 68)
sub = font("/System/Library/Fonts/Helvetica.ttc", 34)


def centre(text, f, y, fill):
    w = draw.textbbox((0, 0), text, font=f)[2]
    draw.text(((W - w) // 2, y), text, font=f, fill=fill)


centre("CSI Student Chapter", title, 392, NAVY)
centre("SRMIST VADAPALANI", sub, 486, (92, 111, 138))

card.save(OUT, quality=88, optimize=True, progressive=True)
print(OUT, card.size, OUT.stat().st_size // 1024, "KB")
