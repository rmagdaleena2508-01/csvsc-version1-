"""
Lifts the handwritten credit off its paper.

The sheet is unevenly lit, so a flat threshold either eats the pale green ink
or leaves a grey rectangle. Instead the paper is estimated with a heavy blur
and each pixel is measured against its own local background: ink is whatever
sits darker or more saturated than the paper around it.
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps

SRC = Path.home() / "Downloads" / "WhatsApp Image 2026-08-22 at 13.22.19.jpeg"
OUT = Path("public/images/brand/credit.png")

img = ImageOps.exif_transpose(Image.open(SRC)).convert("RGB")
width = 1400
img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)

rgb = np.asarray(img, dtype=np.float32) / 255.0
paper = np.asarray(img.filter(ImageFilter.GaussianBlur(45)), dtype=np.float32) / 255.0

# How much darker than the local paper, per channel; ink shows on its darkest.
darkness = np.clip(1.0 - rgb / np.maximum(paper, 1e-3), 0.0, 1.0).max(axis=2)

# Coloured ink can sit as bright as paper, so saturation carries it too.
mx = rgb.max(axis=2)
mn = rgb.min(axis=2)
saturation = np.where(mx > 1e-3, (mx - mn) / np.maximum(mx, 1e-3), 0.0)
paper_sat_mx = paper.max(axis=2)
paper_sat_mn = paper.min(axis=2)
paper_sat = np.where(
    paper_sat_mx > 1e-3, (paper_sat_mx - paper_sat_mn) / np.maximum(paper_sat_mx, 1e-3), 0.0
)
extra_sat = np.clip(saturation - paper_sat, 0.0, 1.0)

alpha = np.clip(np.maximum(darkness * 2.6, extra_sat * 2.2), 0.0, 1.0)
alpha[alpha < 0.18] = 0.0          # kill paper grain and pencil ghosts
alpha = np.clip((alpha - 0.18) / 0.82, 0.0, 1.0)

# Rebuild the ink colour as if it were laid on white, so the strokes keep their
# hue instead of picking up the paper's warmth.
ink = np.clip(1.0 - (1.0 - rgb) / np.maximum(alpha[..., None], 1e-3), 0.0, 1.0)
ink = np.where(alpha[..., None] > 0, ink, 1.0)

out = np.dstack([ink, alpha])
Image.fromarray((out * 255).astype(np.uint8), mode="RGBA").save(OUT, optimize=True)
print(OUT, img.size, OUT.stat().st_size // 1024, "KB")
