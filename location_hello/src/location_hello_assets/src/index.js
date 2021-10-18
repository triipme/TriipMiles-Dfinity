import { location_hello } from "../../declarations/location_hello";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with location_hello actor, calling the greet method
  const greeting = await location_hello.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
