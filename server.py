import os
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import openai
openai.api_key = "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"

# Initialize Flask app
app = Flask(__name__)

position = ""
topics_list = []
top = ""
question = ""
keyws = ""
response = ""
editkeyws = ""
editresp = ""

@app.route('/')
def welcome():
    return render_template('home_page.html')

@app.route('/start')
def start():
    return render_template('start.html')

@app.route('/topics')
def topics():
    return render_template('topics.html', topics=topics_list, position=position)

@app.route('/gptquestion')
def gptquestion():
    return render_template('gptquestion.html', question=question, topic=top, position=position)

@app.route('/responsepage')
def responsepage():
    return render_template('responsepage.html', responsetoq=response)

@app.route('/editresponsepage')
def editresponsepage():
    return render_template('editresponsepage.html', editresponse=editresp)

@app.route('/noeditresponsepage')
def noeditresponsepage():
    return render_template('noeditresponsepage.html', responsetoq=response)


# AJAX FUNCTIONS
@app.route('/question1', methods=['GET', 'POST'])
def q1():
    global position
    global topics_list
    data = request.get_json()
    position = data[0]
    prompt = "Generalize 10 topics in 1 word that most interviews are about toward a " + position + " position."
    completion = openai.Completion.create(engine = "text-davinci-002", max_tokens = 256, prompt = prompt)
    result = completion.choices[0].text.strip()
    topics_list = []
    for line in result.splitlines():
        topics_list.append(line)
    return jsonify(topics=result)

@app.route('/question2', methods=['GET', 'POST'])
def q2():
    global top
    global question
    global position
    data = request.get_json()
    top = data[0]
    prompt = "Give 1 multi-part interview question about "+ top +" at a " + position + " interview. Make the question detailed."
    completion = openai.Completion.create(engine = "text-davinci-002", max_tokens = 256, prompt = prompt)
    question = completion.choices[0].text.strip()
    return jsonify(q=question)

@app.route('/question3', methods=['GET', 'POST'])
def q3():
    global question
    global keyws
    global response
    data = request.get_json()
    keyws = data[0]
    prompt = "Give a 5 sentence answer to this question: " + question + " using the following keywords/phrases: " + keyws + ". Make sure the answer is detailed and fully responds to the given question."
    completion = openai.Completion.create(engine = "text-davinci-002", max_tokens = 256, prompt = prompt)
    response = completion.choices[0].text.strip()
    return jsonify(res=response)

@app.route('/question4', methods=['GET', 'POST'])
def q4():
    global question
    global editkeyws
    global editresp
    data = request.get_json()
    editkeyws = data[0]
    prompt = "Can you make a more detailed responce to this question: " + question + ". An example response to this question is this: " + response + ". Can you improve upon this response by making it longer and including the following keywords/phrases: " + editkeyws + "."
    completion = openai.Completion.create(engine = "text-davinci-002", max_tokens = 256, prompt = prompt)
    editresp = completion.choices[0].text.strip()
    return jsonify(editres=editresp)

if __name__ == '__main__':
    app.run(debug=True)
