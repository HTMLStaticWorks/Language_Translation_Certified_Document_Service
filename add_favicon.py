import os
import glob

os.chdir(os.path.dirname(os.path.abspath(__file__)))

html_files = glob.glob("*.html")
favicon_tag = '    <link rel="icon" type="image/svg+xml" href="images/favicon.svg">\n</head>'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'rel="icon"' not in content:
        content = content.replace('</head>', favicon_tag)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
