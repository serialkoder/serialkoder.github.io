---
layout: default
title: Tags
permalink: /tags/
---

## All tags
<ul>
{% comment %}
site.tags is a hash:  key = tag name,  value = array of posts
We loop once to build the summary list…
{% endcomment %}
{% for tag in site.tags %}
  <li>
    <a href="#tag-{{ tag[0] | slugify }}">{{ tag[0] }}</a>
    ({{ tag[1].size }})
  </li>
{% endfor %}
</ul>

<hr/>

{% comment %}
…then loop again to print the posts under each tag.
We give each heading an id="tag-{slug}" so the links above work.
{% endcomment %}
{% for tag in site.tags %}
### <a id="tag-{{ tag[0] | slugify }}"></a>{{ tag[0] }}
<ul>
  {% assign posts_for_tag = tag[1] | sort: "date" | reverse %}
  {% for post in posts_for_tag %}
    <li>
      <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
      — {{ post.date | date: "%b&nbsp;%d, %Y" }}
    </li>
  {% endfor %}
</ul>
{% endfor %}
