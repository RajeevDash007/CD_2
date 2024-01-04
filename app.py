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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_sequence', methods=['POST'])
def process_sequence():
    data = request.get_json()
    sequence = data.get('sequence', '')

    # Assign numbers to surs
    numbered_sequence = ' '.join(str(surs_numbers[sur]) for sur in sequence.split())

    print('Received sequence from frontend:', numbered_sequence)

    return jsonify({'numbered_sequence': numbered_sequence})

if __name__ == '__main__':
    app.run(debug=True)