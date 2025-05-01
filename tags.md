---
layout: default        # or whatever your normal page layout is
title: Tags
permalink: /tags/
---

## All tags
<ul>
{% for tag in site.tags %}
  <li><a href="#{{ tag[0] }}">{{ tag[0] }}</a> ({{ tag[1].size }})</li>
{% endfor %}
</ul>

{% for tag in site.tags %}
### <a id="{{ tag[0] }}">{{ tag[0] }}</a>
<ul>
{% for post in tag[1] %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> — {{ post.date | date: "%b %d , %Y" }}</li>
{% endfor %}
</ul>
{% endfor %}
