async function generate() {
  const apiKey = document.getElementById("apiKey").value;
  const userPrompt = document.getElementById("prompt").value;

  if (!apiKey || !userPrompt) {
    alert("API key aur prompt dono bharna zaroori hai");
    return;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: "Create a complete HTML/CSS/JS web app based on this prompt:\n" + userPrompt
        }
      ]
    })
  });

  const data = await response.json();
  document.getElementById("output").textContent =
    data.choices[0].message.content;
}
