---
layout: default
title: Tags
permalink: /tags/
---

## All tags
<ul>
{% assign sorted = site.tags | sort %}
{% for tag in sorted %}
  <li><a href="#{{ tag[0] | slugify }}">{{ tag[0] }}</a> ({{ tag[1].size }})</li>
{% endfor %}
</ul>
<hr/>

{% for tag in sorted %}
{% assign slug = tag[0] | slugify %}
### {{ tag[0] }} {#{{ slug }}}
<ul>
{% for post in tag[1] %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    — {{ post.date | date: "%b&nbsp;%d, %Y" }}
  </li>
{% endfor %}
</ul>
{% endfor %}
