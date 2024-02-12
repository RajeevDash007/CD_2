from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

surs_numbers = {
    'Sa': 1,
    'KomalRe': 2,
    'Re': 3,
    'KomalGa': 4,
    'Ga': 5,
    'Ma': 6,
    'TivraMa': 7,
    'Pa': 8,
    'KomalDha': 9,
    'Dha': 10,
    'KomalNi': 11,
    'Ni': 12
}

raga_sequences = {
    'Bilawal': {
        'aroha': 'Sa Re Ga Ma Pa Dha Ni Sa',
        'abroha': 'Sa Ni Dha Pa Ma Ga Re Sa',
        'pakad': 'Sa Re Ga Ma, Ga Ma Re Ga, Re Ga Ma Pa, Dha Pa Ma Ga, Re Sa'
    },
    'Bhoopali': {
        'aroha': 'Sa Re Ga Pa Dha Sa',
        'abroha': 'Sa Dha Pa Ga Re Sa',
        'pakad': 'Ga Re Pa Ga Sa Re Pa Ga'
    },
    'Bhimpalasi': {
        'aroha': 'KomalNi Sa KomalGa Ma Pa KomalNi Sa',
        'abroha': 'Sa KomalNi Dha Pa Ma KomalGa Re Sa',
        'pakad': 'KomalNi Sa Ma Ma Pa KomalGa Ma KomalGa Re Sa'
    },
    'Kafi': {
        'aroha': 'Sa Re KomalGa Ma Pa Dha KomalNi Sa',
        'abroha': 'Sa KomalNi Dha Pa Ma KomalGa Re Sa',
        'pakad': 'KomalNi Sa Re Ma, Ma Pa Dha Pa, Dha Pa Ma KomalGa, Ma KomalGa Re KomalGa, Sa Re Sa'
    },
    'Bhairav': {
        'aroha': 'Sa KomalRe Ga Ma Pa KomalDha Ni Sa',
        'abroha': 'Sa Ni KomalDha Pa Ma Ga KomalRe Sa',
        'pakad': 'KomalRe Ga Ma Pa, KomalDha Pa Ma Ga, Ma Ga KomalRe Ga, KomalRe Ga Ma Pa, KomalDha Ni Sa'
    },
    'Bhairavi': {
        'aroha': 'Sa KomalRe KomalGa Ma Pa KomalDha KomalNi Sa',
        'abroha': 'Sa KomalNi KomalDha Pa Ma KomalGa KomalRe Sa',
        'pakad': 'KomalRe KomalGa Ma KomalDha, KomalNi KomalDha Pa KomalDha, KomalNi KomalDha Pa Ma, KomalGa KomalRe Sa'
    },
    'Kalyan': {
        'aroha': 'Sa Re Ga TivraMa Pa Dha Ni Sa',
        'abroha': 'Sa Ni Dha Pa TivraMa Ga Re Sa',
        'pakad': 'Ga Ma Re Pa, TivraMa Pa Dha Ni, Dha Ni Sa Re, Ga TivraMa Re Sa'
    },
    'Khamaj': {
        'aroha': 'Sa Ga Ma Pa Dha Ni Sa',
        'abroha': 'S KomalNi Dha Pa Ma Ga Re Sa',
        'pakad': 'Ga Ma Pa Dha KomalNi Dha Ma Pa Dha Ma Ga'
    }
}

def compare_sequences(input_sequence, raga_sequences):
    match_results = {}
    for raga, sequences in raga_sequences.items():
        match_percentage = calculate_match_percentage(input_sequence, sequences)
        match_results[raga] = match_percentage
    return match_results

def calculate_match_percentage(input_sequence, sequences):
    input_notes = input_sequence.split()


    match_percentages = []

    for aspect, sequence in sequences.items():
        sequence_notes = sequence.split()
        common_notes = []

        # Check if each note in the sequence is present in the input in the correct order
        i, j = 0, 0
        while i < len(input_notes) and j < len(sequence_notes):
            if input_notes[i] == sequence_notes[j]:
                common_notes.append(input_notes[i])
                j += 1
            i += 1

        aspect_percentage = len(common_notes) / len(sequence_notes) * 100
        match_percentages.append(aspect_percentage)

    # Take the average of the match percentages for all aspects
    average_percentage = sum(match_percentages) / len(match_percentages)

    return round(average_percentage, 2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/notetracker")
def NoteTracker():
    return render_template('NoteTracker.html')
 

@app.route('/process_sequence', methods=['POST'])
def process_sequence():
    data = request.get_json()
    input_sequence = data.get('sequence', '')
  
    numbered_sequence = ' '.join(str(surs_numbers[sur]) for sur in input_sequence.split())

    print('Received sequence from frontend:', numbered_sequence)

    match_results = compare_sequences(input_sequence, raga_sequences)

    return jsonify({'numbered_sequence': numbered_sequence, 'match_results': match_results})


if __name__ == '__main__':
    app.run(debug=True)
    app.config["TEMPLATES_AUTO_RELOAD"] = True
