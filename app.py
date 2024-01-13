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
    }
}

def compare_sequences(input_sequence, raga_sequences):
    match_results = {}
    for raga, sequences in raga_sequences.items():
        match_percentage = calculate_match_percentage(input_sequence, sequences)
        match_results[raga] = match_percentage
    return match_results

def calculate_match_percentage(input_sequence, sequences):
    input_set = set(input_sequence.split())
    aroha_set = set(sequences['aroha'].split())
    abroha_set = set(sequences['abroha'].split())
    pakad_set = set(sequences['pakad'].replace(',', '').split())

    common_aroha = len(input_set.intersection(aroha_set))
    common_abroha = len(input_set.intersection(abroha_set))
    common_pakad = len(input_set.intersection(pakad_set))

    total_elements = len(input_set)

    # Calculate percentage match for each aspect (aroha, abroha, pakad)
    aroha_percentage = common_aroha / total_elements * 100
    abroha_percentage = common_abroha / total_elements * 100
    pakad_percentage = common_pakad / total_elements * 100

    # Take the average of the three percentages
    average_percentage = (aroha_percentage + abroha_percentage + pakad_percentage) / 3

    return round(average_percentage, 2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_sequence', methods=['POST'])
def process_sequence():
    data = request.get_json()
    input_sequence = data.get('sequence', '')

    # Assign numbers to surs
    numbered_sequence = ' '.join(str(surs_numbers[sur]) for sur in input_sequence.split())

    print('Received sequence from frontend:', numbered_sequence)

    # Compare input sequence with raga sequences
    match_results = compare_sequences(input_sequence, raga_sequences)

    return jsonify({'numbered_sequence': numbered_sequence, 'match_results': match_results})

if __name__ == '__main__':
    app.run(debug=True)
