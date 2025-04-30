---
layout: default
title: Home
---

## SerialReads

Welcome to my reading log.

### Recent posts
{% for post in site.posts limit:5 %}
* [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%b %d, %Y" }}
{% endfor %}
