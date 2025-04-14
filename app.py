import os
import re
from flask import Flask, json, render_template, request,jsonify

app = Flask(__name__)

IMAGE_DIR = os.path.join(os.path.dirname(__file__), 'static', 'data-src')
ITEMS_PER_PAGE = 18  # Number of items per page

def sorter(filename):
    match = re.search(r'\d+', filename)
    return int(match.group()) if match else 0

def get_dtsrcimages():
    dtrc = [os.path.join('static', 'data-src', filename) for filename in sorted(os.listdir(IMAGE_DIR),key=sorter) 
                        if filename.endswith(('.jpg', '.jpeg', '.png', '.webp'))]    
    
    return dtrc


@app.route('/')
@app.route('/page-<int:page>')
def index(page=1):
    images = get_dtsrcimages()
    total_items = len(images)
    total_pages = (total_items // ITEMS_PER_PAGE) + (1 if total_items % ITEMS_PER_PAGE > 0 else 0)
    start_idx = (page - 1) * ITEMS_PER_PAGE
    end_idx = start_idx + ITEMS_PER_PAGE
    paginated_images = images[start_idx:end_idx]
    return render_template('index.html',images=paginated_images, page=page, total_pages=total_pages)

@app.route('/api/data/')
@app.route('/api/data/page-<int:page>')
def index_json(page=1):
    images = get_dtsrcimages()
    total_items = len(images)
    total_pages = (total_items // ITEMS_PER_PAGE) + (1 if total_items % ITEMS_PER_PAGE > 0 else 0)
    start_idx = (page - 1) * ITEMS_PER_PAGE
    end_idx = start_idx + ITEMS_PER_PAGE
    paginated_images = images[start_idx:end_idx]
    return jsonify({'dtsrc':paginated_images})

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
    



      
