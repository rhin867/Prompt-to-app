document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("generateBtn").addEventListener("click", generate);
});

async function generate() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const userPrompt = document.getElementById("prompt").value.trim();
  const outputBox = document.getElementById("output");

  if (!apiKey || !userPrompt) {
    alert("API key aur prompt dono bharna zaroori hai");
    return;
  }

  outputBox.textContent = "Generating... please wait";

  try {
    // Detect OpenAI or Gemini based on key pattern (optional)
    let isGemini = apiKey.startsWith("gemini") || apiKey.includes("GEMINI"); // simple check

    let response;
    let data;

    if (!isGemini) {
      // OpenAI request
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [{
            role: "user",
            content: "Create a complete HTML/CSS/JS web app in PDF2CBT mode based on this prompt:\n" + userPrompt
          }]
        })
      });
      data = await response.json();
    } else {
      // Gemini request
      response = await fetch("https://api.gemini.ai/v1/generate", {  // change to actual Gemini endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
          prompt: "Create a complete HTML/CSS/JS web app in PDF2CBT mode based on this prompt:\n" + userPrompt,
          model: "gemini-1"
        })
      });
      data = await response.json();
    }

    // Universal parsing
    let generated;
    if (data.choices && data.choices[0]?.message?.content) {
      generated = data.choices[0].message.content; // OpenAI
    } else if (data.candidates && data.candidates[0]?.content?.text) {
      generated = data.candidates[0].content.text; // Gemini
    } else if (data.error) {
      generated = "API Error: " + data.error.message;
    } else {
      generated = "Unexpected API response, try again";
    }

    outputBox.textContent = generated;

  } catch (err) {
    outputBox.textContent = "Network / System Error: " + err.message;
  }
}
