import { whoami } from "../../declarations/whoami";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with whoami actor, calling the greet method
  const greeting = await whoami.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
