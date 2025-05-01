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
### {{ tag[0] }}

{% assign posts_for_tag = tag[1] | sort: "date" | reverse %}
{% for post in posts_for_tag %}
* [{{ post.title }}]({{ post.url | relative_url }}) — {{ post.date | date: "%b %d, %Y" }}
{% endfor %}

{% endfor %}
