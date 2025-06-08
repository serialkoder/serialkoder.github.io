#!/usr/bin/env python3
"""
fix_frontmatter.py
-----------------------------------------------
Remove orphan front-matter openers (`---`)
from markdown files.

Usage (dry-run first!):
    python fix_frontmatter.py <folder> [--backup] [--dry-run]

Options
-------
--backup   keep a .bak copy of every modified file
--dry-run  show what *would* be fixed, write nothing
-----------------------------------------------
"""
import argparse, pathlib, shutil, sys


def needs_fix(lines):
    """True if file starts with '---' and never closes it."""
    if not lines or lines[0].strip() != "---":
        return False
    return all(l.strip() != "---" for l in lines[1:])


def fix_file(path, backup=False, dry=False):
    text = path.read_text(encoding="utf-8").splitlines(keepends=True)
    if not needs_fix(text):
        return False  # already OK

    if dry:
        print("WOULD FIX:", path)
        return True

    if backup:
        shutil.copy2(path, path.with_suffix(path.suffix + ".bak"))

    # drop the very first '---' line
    fixed = text[1:]
    path.write_text("".join(fixed), encoding="utf-8")
    print("FIXED:", path)
    return True


def main():
    ap = argparse.ArgumentParser(description="Remove orphan front-matter openers.")
    ap.add_argument("folder", help="root folder to scan (e.g. _quizzes)")
    ap.add_argument(
        "--backup", action="store_true", help="create .bak files for every modification"
    )
    ap.add_argument(
        "--dry-run", action="store_true", help="preview changes without writing"
    )
    args = ap.parse_args()

    root = pathlib.Path(args.folder)
    if not root.is_dir():
        sys.exit(f"Not a directory: {root}")

    total = 0
    for md in root.rglob("*.md"):
        total += fix_file(md, backup=args.backup, dry=args.dry_run)

    print(f"\n{total} file(s) {'would be' if args.dry_run else 'were'} fixed.")


if __name__ == "__main__":
    main()
