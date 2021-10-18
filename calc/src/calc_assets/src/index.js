import { calc } from "../../declarations/calc";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with calc actor, calling the greet method
  const greeting = await calc.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
