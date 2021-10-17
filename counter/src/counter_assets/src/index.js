import { counter } from "../../declarations/counter";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with counter actor, calling the greet method
  const greeting = await counter.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
