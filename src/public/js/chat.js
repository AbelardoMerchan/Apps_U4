(() => {
  const box = document.getElementById("chat-box");
  const form = document.getElementById("chat-form");
  if (!form) return;

  const socket = io();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("chat-text");
    const text = input.value.trim();
    if (!text) return;
    const user = document.querySelector("form button.btn-outline-light")?.textContent?.match(/\((.*)\)/)?.[1] || "user";
    socket.emit("chat:msg", { user, text });
    input.value = "";
  });

  socket.on("chat:msg", (m) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${m.user}</strong> <small class="text-muted">${m.time}</small><br>${m.text}`;
    div.className = "mb-2";
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  });
})();
