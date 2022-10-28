import os
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
import openai
openai.api_key = "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"

# Initialize Flask app
app = Flask(__name__)

position = ""
field = ""
topics_list = []
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

@app.route('/question1', methods=['GET', 'POST'])
def q1():
    global position
    global field
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

@app.route('/topics')
def topics():
    return render_template('topics.html', topics=topics_list)

@app.route('/question2', methods=['GET', 'POST'])
def q2():
    global top
    global question
    global position
    data = request.get_json()
    top = data[0]
    prompt = "Give only 1 most asked interview question about "+ top +" at a "+ position +" interview"
    completion = openai.Completion.create(engine = "text-davinci-002", max_tokens = 256, prompt = prompt)
    question = completion.choices[0].text.strip()
    return jsonify(q=question)

@app.route('/gptquestion')
def gptquestion():
    return render_template('gptquestion.html', question=question)

@app.route('/question3', methods=['GET', 'POST'])
def q3():
    global question
    global keyws
    global response
    data = request.get_json()
    keyws = data[0]
    prompt = "Give a 5 sentence answer to this question: " + question + " using the following keywords/phrases: " + keyws + "."
    completion = openai.Completion.create(engine = "text-davinci-002", max_tokens = 256, prompt = prompt)
    response = completion.choices[0].text.strip()
    return jsonify(res=response)

@app.route('/responsepage')
def responsepage():
    return render_template('responsepage.html', responsetoq=response)

@app.route('/question4', methods=['GET', 'POST'])
def q4():
    global question
    global editkeyws
    global editresp
    data = request.get_json()
    editkeyws = data[0]
    prompt = "Can you make a 7 sentence responce to this question: " + question + ". An example response to this question is this: " + response + ". Can you improve upon this response by making it longer and including the following keywords/phrases: " + editkeyws + "."
    completion = openai.Completion.create(engine = "text-davinci-002", max_tokens = 256, prompt = prompt)
    editresp = completion.choices[0].text.strip()
    return jsonify(editres=editresp)

@app.route('/editresponsepage')
def editresponsepage():
    return render_template('editresponsepage.html', editresponse=editresp)

@app.route('/add_rsvp/<id>', methods=['GET', 'POST'])
def add_rsvp(id=0):
    try:
        rsvp_id = request.json['id']
        current_party_ref = db.collection('party info').document(id)
        rsvp_ref = current_party_ref.collection('RSVPs')
        rsvp_ref.document(rsvp_id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/view/<id>')
def view(id=0):
    return render_template('party.html', item=id)

@app.route('/add_data')
def add_data():
    return render_template('add.html')

@app.route('/add_party', methods=['GET', 'POST'])
def add_party():
    try:
        id = request.json['id']
        party_ref.document(id).set(request.json)
        return jsonify({"success": True, "new_id": id}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/edit/<id>')
def edit(id=0):
    global data

    return render_template('edit.html', item=str(int(id)-1))

@app.route('/edit/save_entry', methods=['GET', 'POST'])
def save_entry():
    try:
        id = request.json['id']
        party_ref.document(id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


# AJAX FUNCTIONS


if __name__ == '__main__':
    app.run(debug=True)
