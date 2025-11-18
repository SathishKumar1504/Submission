// src/utils/toast.js
export function toast(msg) {
  const el = document.createElement("div");
  el.innerText = msg;
  el.style.position = "fixed";
  el.style.right = "12px";
  el.style.bottom = "12px";
  el.style.background = "rgba(0,0,0,0.8)";
  el.style.color = "#fff";
  el.style.padding = "8px 12px";
  el.style.borderRadius = "6px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}
