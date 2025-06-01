---
layout: default
title: Flashcards
permalink: /flashcards/
---

# Flashcard Decks

Pick a deck:

<ul>
{% assign decks = site.flashcards.docs | sort: "title" %}
{% for deck in decks %}
  <li><a href="{{ deck.url | relative_url }}">{{ deck.title }}</a></li>
{% endfor %}
</ul>

