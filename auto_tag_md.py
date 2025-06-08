#!/usr/bin/env python3
# auto_tag_md.py
# -------------------------------------------------
# Add/merge YAML `tags:` in markdown files.
#
# Target tags:
#   - system-design
#   - software-architecture
#   - design-patterns
#   - thinking
#   - data-structures-and-algorithms
#
# Usage:
#   python auto_tag_md.py  <folder> [--dry-run]
# -------------------------------------------------

import sys, pathlib, yaml, re, argparse
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.multiclass import OneVsRestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import MultiLabelBinarizer


# --------------------------------------------------------------------------
TAGS = [
    "system-design",
    "software-architecture",
    "design-patterns",
    "thinking",
    "data-structures-and-algorithms",
]

# Mini training corpus (expand any time)
TRAIN = [
    # system-design
    (
        "Layer-4 vs Layer-7 load balancers, sharding strategies, request routing",
        ["system-design"],
    ),
    # software-architecture
    (
        "Ports-and-adapters hexagonal pattern, DDD bounded context, SOLID principles",
        ["software-architecture"],
    ),
    # design-patterns
    (
        "Factory Method vs Abstract Factory, Observer & Strategy; creational, structural, behavioural",
        ["design-patterns"],
    ),
    # thinking
    (
        "first-principles reasoning, mental models, deliberate practice and 10-000-hour rule",
        ["thinking"],
    ),
    # data-structures & algorithms
    (
        "union-find disjoint-set, heaps, DFS, BFS, dynamic programming, quicksort",
        ["data-structures-and-algorithms"],
    ),
]
# --------------------------------------------------------------------------


# Heuristic keywords (picked up in filename or body)
KEYWORDS = {
    "system-design": [
        "load balancer",
        "layer-4",
        "layer-7",
        "broker",
        "scaling",
        "cache",
        "resilience",
        "observability",
        "event bus",
        "deployment",
        "partitioning",
    ],
    "software-architecture": [
        "architecture",
        "hexagonal",
        "ports and adapters",
        "ddd",
        "middleware",
        "monolith",
        "microservice",
        "cqrs",
    ],
    "design-patterns": [
        "design pattern",
        "creational",
        "structural",
        "behavioral",
        "observer",
        "strategy",
        "singleton",
        "factory",
        "adapter",
        "decorator",
        "proxy",
        "command",
        "mediator",
        "bridge",
        "visitor",
    ],
    "thinking": [
        "mental model",
        "first principles",
        "heuristic",
        "thought process",
        "critical thinking",
        "problem solving",
    ],
    "data-structures-and-algorithms": [
        "data structure",
        "algorithm",
        "graph",
        "tree",
        "dynamic programming",
        "union find",
        "disjoint set",
        "binary search",
        "heap",
        "quicksort",
        "dfs",
        "bfs",
        "divide and conquer",
    ],
}
KW_PATTERNS = {
    tag: re.compile("|".join(map(re.escape, words)), re.I)
    for tag, words in KEYWORDS.items()
}


# --------------------------------------------------------------------------
def build_model():
    texts, y = zip(*TRAIN)
    vec = TfidfVectorizer(stop_words="english")
    X = vec.fit_transform(texts)

    mlb = MultiLabelBinarizer(classes=TAGS)
    Y = mlb.fit_transform(y)

    clf = OneVsRestClassifier(
        LogisticRegression(max_iter=1000, n_jobs=1, class_weight="balanced")
    )
    clf.fit(X, Y)
    return vec, clf


def strip_front_matter(text: str):
    """Return (front_matter:str|None, body:str)."""
    if text.startswith("---"):
        parts = text.split("---", 2)
        return parts[1], parts[2]
    return None, text


def write_front_matter(meta: dict, body: str, path: pathlib.Path, dry: bool):
    front = yaml.dump(meta, sort_keys=False).strip()
    new_text = f"---\n{front}\n---\n{body}"
    if not dry:
        path.write_text(new_text, encoding="utf-8")


def ml_tags(text: str, vec, clf):
    probs = clf.predict_proba(vec.transform([text]))[0]
    return {tag for tag, p in zip(TAGS, probs) if p >= 0.30}  # tweak threshold


def kw_tags(text: str):
    return {tag for tag, pat in KW_PATTERNS.items() if pat.search(text)}


def process_file(md: pathlib.Path, vec, clf, dry=False):
    raw = md.read_text(encoding="utf-8")
    front_txt, body = strip_front_matter(raw)
    meta = yaml.safe_load(front_txt) if front_txt else {}

    # Predict
    predicted = ml_tags(body, vec, clf) | kw_tags(md.stem) | kw_tags(body)
    if not predicted:
        return

    meta.setdefault("tags", [])
    before = set(meta["tags"])
    after = sorted(before | predicted)

    if after != meta["tags"]:
        meta["tags"] = after
        write_front_matter(meta, body, md, dry)
        action = "WOULD ADD" if dry else "ADDED"
        print(
            f"{action}: {md.relative_to(pathlib.Path.cwd())}  ->  {', '.join(sorted(predicted - before))}"
        )


# --------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description="Auto-tag markdown files.")
    ap.add_argument("folder", help="root folder to scan (e.g. _quizzes)")
    ap.add_argument("--dry-run", action="store_true", help="preview only, no writes")
    args = ap.parse_args()

    vec, clf = build_model()
    root = pathlib.Path(args.folder)

    for md in root.rglob("*.md"):
        process_file(md, vec, clf, dry=args.dry_run)


if __name__ == "__main__":
    main()
