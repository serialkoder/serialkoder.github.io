---
layout: quiz                 # uses the custom layout below
title: "Creational Patterns Quiz"
permalink: /quiz/            # page lives at /quiz/
---

{% assign quiz = site.data.quizzes.creational_patterns %}
<h2>{{ quiz.title }}</h2>

<form id="quiz">
  {% for item in quiz.questions %}
    <fieldset class="question" data-correct="{{ item.answer }}">
      <legend><strong>Q{{ forloop.index }}.</strong> {{ item.q }}</legend>

      {% for opt in item.options %}
        <label>
          <input  type="radio"
                  name="q{{ forloop.parentloop.index }}"   <!-- one group per question -->
                  value="{{ forloop.index0 }}">            <!-- option index -->
          {{ opt }}
        </label><br>
      {% endfor %}

    </fieldset>
    <hr/>
  {% endfor %}

  <button type="button" id="check">Check answers</button>
  <p id="result" style="font-weight:bold;"></p>
</form>

<script>
document.getElementById('check').onclick = function () {
  let correct = 0, total = 0;
  document.querySelectorAll('#quiz .question').forEach(q => {
    total++;
    const chosen = q.querySelector('input:checked');
    if (chosen && chosen.value === q.dataset.correct) correct++;
  });
  document.getElementById('result').textContent =
    `You scored ${correct} / ${total}`;
};
</script>
