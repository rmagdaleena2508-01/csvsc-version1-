"""
Lifts the handwritten credit off whatever it was shot or drawn on.

Works either polarity: ink darker than the sheet (a photograph of paper) or
lighter than it (light writing on a dark canvas). The background is estimated
with a heavy blur, so each pixel is judged against its own surroundings rather
than one global threshold, which is what uneven lighting and vignetting break.

The result is repainted in a single brand ink, so the strokes match the palette
exactly and carry no halo from the original background.
"""
from pathlib import Path
import sys

import numpy as np
from PIL import Image, ImageFilter, ImageOps

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else "")
OUT = Path("public/images/brand/credit.png")
INK = (18, 38, 92)          # --color-navy
WIDTH = 1600
PAD = 8                     # breathing room left after trimming, in pixels

img = ImageOps.exif_transpose(Image.open(SRC)).convert("RGB")
img = img.resize((WIDTH, round(img.height * WIDTH / img.width)), Image.LANCZOS)

rgb = np.asarray(img, dtype=np.float32) / 255.0
bg = np.asarray(img.filter(ImageFilter.GaussianBlur(45)), dtype=np.float32) / 255.0

# Key on colour, not brightness. The writing is blue; every artefact in the
# source — vignetting, banding, a lighter patch of canvas — is neutral, so a
# brightness threshold picks those up as ink and a colour one cannot.
def blueness(a):
    return a[..., 2] - np.maximum(a[..., 0], a[..., 1])

signal = np.clip(blueness(rgb) - blueness(bg), 0.0, 1.0)

alpha = np.clip(signal * 5.0, 0.0, 1.0)
floor = 0.12
alpha[alpha < floor] = 0.0
alpha = np.clip((alpha - floor) / (1.0 - floor), 0.0, 1.0)

out = np.zeros((*alpha.shape, 4), dtype=np.float32)
out[..., 0] = INK[0] / 255.0
out[..., 1] = INK[1] / 255.0
out[..., 2] = INK[2] / 255.0
out[..., 3] = alpha

ink = Image.fromarray((out * 255).astype(np.uint8), mode="RGBA")

# Trim to the writing itself. Left-over margin is what made the last version
# sit visually off-centre inside its own box.
box = ink.split()[-1].getbbox()
if box:
    left = max(0, box[0] - PAD)
    top = max(0, box[1] - PAD)
    right = min(ink.width, box[2] + PAD)
    bottom = min(ink.height, box[3] + PAD)
    ink = ink.crop((left, top, right, bottom))

ink.save(OUT, optimize=True)
print(OUT, ink.size, OUT.stat().st_size // 1024, "KB")
