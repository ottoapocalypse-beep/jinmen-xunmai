"""Stitch zoom4 tiles and crop to the actual campus area"""
from PIL import Image
import os, sys, time, urllib.request, json

output = r'f:\agent programs\社会实践专题\jinmen-xunmai\public\campus_map.jpg'
tile_dir = r'f:\agent programs\社会实践专题\jinmen-xunmai\public\map-tiles-zoom4'

# Download tiles if needed
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Referer': 'https://map.ustb.edu.cn/2d/'
}
os.makedirs(tile_dir, exist_ok=True)

# Grid range from scan: x=0-15, y=1-23 (250 valid tiles)
tiles = []
for x in range(0, 16):
    for y in range(1, 24):
        fn = os.path.join(tile_dir, f'{x}_{y}.jpg')
        if os.path.exists(fn) and os.path.getsize(fn) > 2000:
            size = os.path.getsize(fn)
            tiles.append({'x': x, 'y': y, 'size': size, 'file': fn})
            continue
        url = f'https://map.ustb.edu.cn/2d/mapdata/zoom4/{x}_{y}.jpg'
        try:
            req = urllib.request.Request(url, method='GET', headers=headers)
            resp = urllib.request.urlopen(req, timeout=5)
            data = resp.read()
            if len(data) > 2000:
                with open(fn, 'wb') as f:
                    f.write(data)
                tiles.append({'x': x, 'y': y, 'size': len(data), 'file': fn})
        except:
            pass
    sys.stdout.write(f'\rDownloading: x={x}, valid={len(tiles)}')
    sys.stdout.flush()
    time.sleep(0.02)

print(f'\nTotal valid tiles: {len(tiles)}')

# Determine the actual campus bounding box from tile sizes
# Use tiles > 5KB as "real content"
content_tiles = [t for t in tiles if t['size'] > 5000]
if not content_tiles:
    content_tiles = tiles

xs = [t['x'] for t in content_tiles]
ys = [t['y'] for t in content_tiles]
x_min, x_max = min(xs), max(xs)
y_min, y_max = min(ys), max(ys)
print(f'Content tiles: x=[{x_min}-{x_max}], y=[{y_min}-{y_max}] ({len(content_tiles)} tiles)')

# Also show the content tile grid
print('\nContent tile grid:')
for x in range(x_min, x_max+1):
    row = ''
    for y in range(y_min, y_max+1):
        t = next((t for t in content_tiles if t['x']==x and t['y']==y), None)
        if t:
            if t['size'] > 20000: row += '█'
            elif t['size'] > 10000: row += '▓'
            else: row += '░'
        else:
            row += ' '
    print(f'x={x:2d}: {row}')

# Stitch only the content area
TILE = 256
stitch_w = (x_max - x_min + 1) * TILE
stitch_h = (y_max - y_min + 1) * TILE
print(f'\nStitching: {stitch_w}x{stitch_h}')

canvas = Image.new('RGB', (stitch_w, stitch_h), (30, 30, 50))
for t in content_tiles:
    px = (t['x'] - x_min) * TILE
    py = (t['y'] - y_min) * TILE
    tile_img = Image.open(t['file'])
    canvas.paste(tile_img, (px, py))

# Crop to the square center of the content area
# This gives us a nice square map
size = min(stitch_w, stitch_h)
left = (stitch_w - size) // 2
top = (stitch_h - size) // 2
cropped = canvas.crop((left, top, left + size, top + size))
print(f'Cropped to square: {size}x{size}')

# Resize to 2048x2048 for web (reduces file size while keeping good quality)
target = 2048
if size != target:
    final = cropped.resize((target, target), Image.LANCZOS)
else:
    final = cropped

final.save(output, 'JPEG', quality=95)
mb = os.path.getsize(output) / 1024 / 1024
print(f'Saved: {output} ({target}x{target}, {mb:.1f} MB)')
