from flask import Flask, render_template, request, jsonify
import csv

app = Flask(__name__, static_folder='static')


def get_unique_values(column_name):
    values = set()
    with open('restaurants.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row[column_name]:
                values.update(row[column_name].split(', '))
    return list(values)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_unique_values_for_all_columns')
def get_values():
    locations = get_unique_values('Location')
    meal_types = get_unique_values('Meal Type')
    dine_or_dash = get_unique_values('Dine or Dash')
    food_categories = get_unique_values('Food Category')
    return jsonify({
        'locations': locations,
        'mealTypes': meal_types,
        'dineOrDash': dine_or_dash,
        'foodCategories': food_categories
    })


@app.route('/search', methods=['POST'])
def search_restaurants():
    data = request.json
    location = data.get('location')
    mealType = data.get('mealType')
    dineOrDash = data.get('dineOrDash')
    foodCategory = data.get('foodCategory')

    results = []
    with open('restaurants.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if (not location or location in row['Location']) and \
               (not mealType or mealType in row['Meal Type']) and \
               (not dineOrDash or dineOrDash in row['Dine or Dash']) and \
               (not foodCategory or foodCategory in row['Food Category']):
                results.append(row)

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True, port=5050)
