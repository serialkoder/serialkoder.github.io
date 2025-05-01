---
layout: default
title: Tags
permalink: /tags/
---

## All tags
<ul>
{% assign sorted_tags = site.tags | sort %}
{% for tag in sorted_tags %}
  <li>
    <a href="#{{ tag[0] | slugify }}">{{ tag[0] }}</a>
    ({{ tag[1].size }})
  </li>
{% endfor %}
</ul>
<hr/>

{% for tag in sorted_tags %}
### {{ tag[0] }}
<ul>
  {% assign posts_for_tag = tag[1] | sort: "date" | reverse %}
  {% for post in posts_for_tag %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      — {{ post.date | date: "%b&nbsp;%d, %Y" }}
    </li>
  {% endfor %}
</ul>
{% endfor %}
