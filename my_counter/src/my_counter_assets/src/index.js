import { my_counter } from "../../declarations/my_counter";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with my_counter actor, calling the greet method
  const greeting = await my_counter.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
