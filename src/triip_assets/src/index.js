import { triip } from "../../declarations/triip";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with triip actor, calling the greet method
  const greeting = await triip.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
