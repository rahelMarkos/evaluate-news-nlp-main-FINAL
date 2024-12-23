// Replace checkForName with a function that checks the URL
import { URLchecker } from "./urlchecker";

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = "http://localhost:8081/api";

const form = document.getElementById("urlForm");
const results = document.getElementById("results");
// form.addEventListener("results");

function handleSubmit(event) {
  event.preventDefault();

  // Get the URL from the input field
  const formText = document.getElementById("name");

  // This is an example code that checks the submitted name. You may remove it from your code
  //   checkForName(formText);
  // console.log(formText);
  // Check if the URL is valid
  if (!URLchecker(formText.value)) {
    alert("Please enter a valid URL to process your article.");
    return;
  }

  // If the URL is valid, send it to the server using the serverURL constant above
  console.log(`Processing URL: ${formText}`);

  sendToServer(formText.value);
  document.getElementById("name").value = "";
}

// Function to send data to the server
//
async function sendToServer(input) {
  try {
    const response = await fetch(serverURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({ input }),
    });
    const data = await response.json();

    console.log(data);

    //CoarseTopics

    const coarseTopics = data.response.coarseTopics
      .map((topic) => topic.label)
      .join("-");

    const coarseTopicsDiv = document.createElement("div");
    const coarseTopicsHead = document.createElement("h3");
    const coarseTopicsText = document.createElement("p");

    coarseTopicsHead.innerText = "coarseTopics:  ";
    coarseTopicsText.innerText = coarseTopics;
    coarseTopicsDiv.appendChild(coarseTopicsHead);
    coarseTopicsDiv.appendChild(coarseTopicsText);

    results.appendChild(coarseTopicsDiv);
    //Entities
    const entities = data.response.entities
      .map((ent) => ent.matchedText)
      .join("-");

    const entityDiv = document.createElement("div");
    const entityHead = document.createElement("h3");
    const entityText = document.createElement("p");

    entityHead.innerText = "Entities";
    entityText.innerText = entities;
    entityDiv.appendChild(entityHead);
    entityDiv.appendChild(entityText);

    results.appendChild(entityDiv);

    //Topics

    const topics = data.response.topics
      .slice(0, 30)
      .map((topic) => topic.label)
      .join("-");

    const topicDiv = document.createElement("div");
    const topicHead = document.createElement("h3");
    const topicText = document.createElement("p");

    topicHead.innerText = "Topics:  ";
    topicText.innerText = topics;
    topicDiv.appendChild(topicHead);
    topicDiv.appendChild(topicText);

    results.appendChild(topicDiv);
  } catch (error) {
    console.log(error.message);
  }
}

// Attach the form submission handler
form.addEventListener("submit", handleSubmit);

// Export the handleSubmit function
export { handleSubmit };
