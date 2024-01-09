import os
import sys
import argparse

sys.stdin.reconfigure(encoding='utf-8')
sys.stdout.reconfigure(encoding='utf-8')

def find_pages():
    pages_folder = f'{os.getcwd().replace('\\', '/')}/src/pages/'
    pages = os.listdir(pages_folder);
    return list(map(lambda p : f"{pages_folder}{p}", pages))

def build(p):
    with open(f"{p}/index.html", 'r', encoding='utf-8') as html_file:
        html = html_file.read()
    html = html.replace('<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin="anonymous"></script>', '<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>')
    html = html.replace('<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin="anonymous"></script>', '<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>')
    html = html.replace('\n    ', '\n')
    with open(f"{p}/index.js", 'r', encoding='utf-8') as js_file:
        js = js_file.read()
    html = html.replace('<script type="text/babel" src="index.js"></script>', f'<script>\n{js}\n</script>')
    html = html[html.index('<body>') + 6 : html.index('</body>')]
    dest_file_name = p[p.rindex('/') + 1 : len(p)]
    dest_path = f'{os.getcwd().replace('\\', '/')}/build/{dest_file_name}.html'
    with open(dest_path, 'w', encoding='utf-8') as dest_file:
        dest_file.write(html)


def main():
    pages = find_pages()
    print(f"Pages = {pages}")
    for p in pages:
        print(f"Process {p}")
        build(p)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--foo', help='foo help')
    args = parser.parse_args()
    print(args.foo)
    main()
