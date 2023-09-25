# import necessary modules
from flask import Flask, render_template, request
import openai

# Configure your OpenAI API key
api_key = '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'
openai.api_key = api_key

# Initialize the Flask app
app = Flask(__name__)

# Define a route for the chat page
@app.route('/')
def chat_page():
    return render_template('home.html')

@app.route('/home')
def code_page():
    return render_template('chat.html')

# Define a route for generating AI responses
@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.form['user_message']

    # Call the OpenAI API to generate a response
    completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    max_tokens=3000,
    messages=[
        {"role": "user", "content": user_message}
    ]
    )

    ai_response = completion.choices[0].message['content']
    return ai_response
if __name__ == '__main__':
    app.run(debug=True)

