document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", async (event) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    const id = target.dataset.id;
    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: checked }),
    });
  });
});
