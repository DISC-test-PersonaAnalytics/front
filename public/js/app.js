const assessmentForm = document.querySelector("[data-assessment-form]");

if (assessmentForm) {
  const questionCards = [...assessmentForm.querySelectorAll("[data-question-id]")];
  const progressCount = document.querySelector("[data-progress-count]");
  const progressBar = document.querySelector("[data-progress-bar]");

  function updateProgress() {
    const answered = questionCards.filter((card) =>
      card.querySelector("input[type='radio']:checked")
    ).length;

    progressCount.textContent = answered;
    progressBar.style.width = `${Math.round((answered / questionCards.length) * 100)}%`;
  }

  assessmentForm.addEventListener("change", updateProgress);
  updateProgress();
}
