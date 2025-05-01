---
layout: default
title: Home
---

## SerialReads

Welcome to my reading log.

### Recent posts
{% for post in site.posts limit:100 %}
* [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%b %d, %Y" }}
{% endfor %}
