import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Function to send a request to OpenAI and display the response
async function generatePrompt() {
    const userInput = document.getElementById('user-input').value;
    const outputDiv = document.getElementById('chat-container');

    // Check if the user input is empty
    if (!userInput) {
        outputDiv.textContent = 'Please enter a prompt.';
        return;
    }

    // Clear the previous output
    outputDiv.textContent = 'Generating...';

    try {
        // Send a POST request to the OpenAI API
        const completion = await openai.chat.completions.create({
            messages: [{role: "user", "content": userInput}],
            model: "gpt-3.5-turbo",
          });

        // Display the response in the output div
        outputDiv.textContent = completion.choices[0].content;
    } catch (error) {
        console.error('Error:', error);
        outputDiv.textContent = 'An error occurred while generating the prompt.';
    }
}

document.getElementById('send-button').addEventListener('click', generatePrompt);
