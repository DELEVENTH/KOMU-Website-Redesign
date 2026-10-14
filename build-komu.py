"""Build the KOMU site from komu-redesign/src.

  python build-komu.py        assemble the pages into komu-redesign/*.html
  python build-komu.py zip    also write KOMU-Website-Redesign.zip for offline review
                              (Google Fonts are swapped for an embedded fonts.css)
  python build-komu.py source also write KOMU-Website-Source.zip (source code + README for developers)

Edit komu-redesign/src/*.html (page bodies + shared layout), styles.css, site.js and
news-data.js. The komu-redesign/*.html pages are generated: do not edit them directly.
"""
import base64, hashlib, os, re, sys, urllib.request, zipfile

ROOT, OUT, TOP = 'komu-redesign', 'KOMU-Website-Redesign.zip', 'KOMU-Website-Redesign'
SRC = os.path.join(ROOT, 'src')
PAGES = {
    'index': ('KOMU · Kingsley Ozumba Mbadiwe University, Ideato', 'Kingsley Ozumba Mbadiwe University (KOMU), Ideato, Imo State. News, events, leadership and the start points for applicants, students, graduates and staff.'),
    'academics': ('Academics · KOMU', 'Nine faculties and thirty-four departments: UTME subjects, O’Level requirements and cut-offs for every KOMU programme, plus research and innovation.'),
    'admissions': ('Admissions 2026/2027 · KOMU', 'Check your eligibility and compare undergraduate, JUPEB, IJMB and ICEP routes into Kingsley Ozumba Mbadiwe University.'),
    'news': ('News & events · KOMU', 'Every story from Kingsley Ozumba Mbadiwe University, newest first, with the full archive back to September 2021.'),
    'gallery': ('Photo & video gallery · KOMU', 'Photos and video from Kingsley Ozumba Mbadiwe University: the Senate Building, library, student accommodation and University events.'),
    'contact': ('Contact · KOMU', 'Phone, email, address, map and quick answers for Kingsley Ozumba Mbadiwe University, Ideato.'),
}
FONT_LINKS = re.compile(r'<link rel="preconnect"[^>]*>\n|<link href="https://fonts\.googleapis\.com[^"]*" rel="stylesheet">\n')
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'}

layout = open(os.path.join(SRC, 'layout.html'), encoding='utf-8').read()
for asset in ('styles.css', 'news-data.js', 'site.js'):  # cache-bust: browsers refetch when a file changes
    v = hashlib.md5(open(os.path.join(ROOT, asset), 'rb').read()).hexdigest()[:8]
    layout = layout.replace(f'"{asset}"', f'"{asset}?v={v}"')
built = {}
for page, (title, desc) in PAGES.items():
    body = open(os.path.join(SRC, page + '.html'), encoding='utf-8').read().strip('\n')
    html = layout.replace('{{title}}', title).replace('{{description}}', desc).replace('{{content}}', body)
    html = html.replace(f'data-nav="{page}"', f'data-nav="{page}" aria-current="page"')
    if page == 'gallery':  # the gallery sits under News & events in the menu
        html = html.replace('data-nav="news" data-sec', 'data-nav="news" aria-current="true" data-sec')
    assert '{{' not in html, f'unfilled placeholder in {page}'
    with open(os.path.join(ROOT, page + '.html'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(html)
    built[page + '.html'] = html
print('built', ', '.join(built))

if sys.argv[1:] == ['zip']:
    href = re.search(r'href="(https://fonts\.googleapis\.com[^"]+)"', layout).group(1).replace('&amp;', '&')
    css = urllib.request.urlopen(urllib.request.Request(href, headers=UA)).read().decode()
    faces = []
    for subset, block in re.findall(r'/\* ([a-z-]+) \*/\s*(@font-face \{.*?\})', css, re.S):
        if subset in ('latin', 'latin-ext'):  # latin-ext carries the naira sign
            url = re.search(r'url\((.*?)\)', block).group(1)
            data = base64.b64encode(urllib.request.urlopen(urllib.request.Request(url, headers=UA)).read()).decode()
            faces.append(block.replace(url, 'data:font/woff2;base64,' + data))
    assert len(faces) == 6, f'expected 6 font faces, got {len(faces)}'
    with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr(f'{TOP}/fonts.css', '\n'.join(faces))
        for name, html in built.items():
            html = FONT_LINKS.sub('', html).replace('<link rel="stylesheet" href="styles.css', '<link rel="stylesheet" href="fonts.css">\n<link rel="stylesheet" href="styles.css', 1)
            assert 'fonts.googleapis' not in html
            z.writestr(f'{TOP}/{name}', html)
        for d, dirs, files in os.walk(ROOT):
            dirs[:] = [x for x in dirs if not x.startswith(('.', '_')) and x != 'src']
            for f in files:
                rel = os.path.relpath(os.path.join(d, f), ROOT)
                if not f.startswith('.') and rel not in built:
                    z.write(os.path.join(d, f), os.path.join(TOP, rel))
    with zipfile.ZipFile(OUT) as z:
        assert z.testzip() is None
        print(f'{OUT}: {len(z.namelist())} files, {os.path.getsize(OUT) / 1e6:.1f} MB')

if sys.argv[1:] == ['source']:
    SRC_OUT, SRC_TOP = 'KOMU-Website-Source.zip', 'KOMU-Website-Source'
    with zipfile.ZipFile(SRC_OUT, 'w', zipfile.ZIP_DEFLATED) as z:
        z.write('README-KOMU.md', f'{SRC_TOP}/README.md')
        z.write(os.path.basename(__file__), f'{SRC_TOP}/build-komu.py')
        for d, dirs, files in os.walk(ROOT):
            dirs[:] = [x for x in dirs if x != '.vercel' and not x.startswith('_')]  # .vercel holds the deployer's account IDs
            for f in files:
                p = os.path.join(d, f)
                z.write(p, os.path.join(SRC_TOP, os.path.relpath(p, '.')))
    with zipfile.ZipFile(SRC_OUT) as z:
        assert z.testzip() is None and not any('/.vercel/' in n for n in z.namelist())
        print(f'{SRC_OUT}: {len(z.namelist())} files, {os.path.getsize(SRC_OUT) / 1e6:.1f} MB')
