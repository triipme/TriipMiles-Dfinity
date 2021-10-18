import { actor_hello } from "../../declarations/actor_hello";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with actor_hello actor, calling the greet method
  const greeting = await actor_hello.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
