---
layout: default
title: Home
---

## SerialReads

Welcome to my reading log.


### Quick links
* [Tags]({{ '/tags/' | relative_url }})
* [Flashcards]({{ '/flashcards/' | relative_url }})
* [Quizzes]({{ '/quiz/' | relative_url }})
* [Matching]({{ '/match/' | relative_url }})


### Recent posts
{% for post in site.posts limit:100 %}
* [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%b %d, %Y" }}
{% endfor %}
