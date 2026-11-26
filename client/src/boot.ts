// Fades out the opening screen from index.html once the page behind it has something real to show.
export function hideBoot() {
  const el = document.getElementById("ypl-boot");
  if (!el || el.classList.contains("is-done")) return;
  el.classList.add("is-done");
  window.setTimeout(() => el.remove(), 450);
}
