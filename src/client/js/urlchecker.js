function URLchecker(inputText) {
  if (typeof inputText !== "string" || inputText.trim() === "") {
    console.error("Input must be a non-empty string.");
    return false;
  }

  try {
    const url = new URL(inputText); // Try to create a new URL object

    // Ensure the URL starts with http or https
    if (url.protocol === "http:" || url.protocol === "https:") {
      return true;
    } else {
      console.error("URL must use http or https protocol.");
      return false;
    }
  } catch (error) {
    console.error("Invalid URL format:", error.message);
    return false; // If it throws an error, it's not a valid URL
  }
}

export { URLchecker };
