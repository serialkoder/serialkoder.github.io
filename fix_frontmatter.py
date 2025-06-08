#!/usr/bin/env python3
"""
fix_frontmatter.py  (revised)

Repairs markdown files that start with an orphan
'---' (open YAML front-matter) but never close it.

Action: append '\n---\n' to the end of such files.

Usage
-----
    python fix_frontmatter.py <folder> [--dry-run]

Options
-------
--dry-run   Preview only; print the files that *would* be fixed.
            No changes are written.
"""
import argparse, pathlib, shutil, sys, textwrap


def has_orphan_opener(path: pathlib.Path) -> bool:
    """True if file begins with '---' and has no second '---' line."""
    with path.open(encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()

    if not lines or lines[0].strip() != "---":
        return False

    # look for any subsequent line that is *exactly* '---'
    return not any(line.strip() == "---" for line in lines[1:])


def repair(path: pathlib.Path, dry: bool):
    if not has_orphan_opener(path):
        return False

    if dry:
        print("WOULD FIX:", path.relative_to(path.cwd()))
        return True

    # backup first
    shutil.copy2(path, path.with_suffix(path.suffix + ".bak"))

    # append closing delimiter
    with path.open("a", encoding="utf-8") as f:
        # ensure file ends with newline then '---'
        f.write("\n---\n")

    print("FIXED:", path.relative_to(path.cwd()))
    return True


def main():
    ap = argparse.ArgumentParser(
        formatter_class=argparse.RawDescriptionHelpFormatter,
        description=textwrap.dedent(__doc__),
    )
    ap.add_argument("folder", help="root folder to scan (e.g. _quizzes)")
    ap.add_argument("--dry-run", action="store_true", help="preview; no writes")
    args = ap.parse_args()

    root = pathlib.Path(args.folder)
    if not root.is_dir():
        sys.exit(f"{root} is not a directory.")

    count = 0
    for md in root.rglob("*.md"):
        if repair(md, dry=args.dry_run):
            count += 1

    print(f"\n{count} file(s) {'would be' if args.dry_run else 'were'} fixed.")


if __name__ == "__main__":
    main()
