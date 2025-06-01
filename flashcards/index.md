---
layout: default
title: Flashcards
permalink: /flashcards/
---

# Flashcard Decks

Pick a deck:

<ul>
{% for deck in site.flashcards %}
  <li><a href="{{ deck.url | relative_url }}">{{ deck.title }}</a></li>
{% endfor %}
</ul>
