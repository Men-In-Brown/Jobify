import json
import time
import random
import requests

company_names = [
    "Tech Innovations Inc.", "Globex Corporation", "Initech", "Cyberdyne Systems", "Stark Industries",
    "Wayne Enterprises", "Vandelay Industries", "Umbrella Corporation", "Wonka Industries", "Gringotts Bank",
    "Oscorp", "Nakatomi Corporation", "MomCorp", "Aperture Science", "Gekko & Co."
]

locations = [
    "New York", "San Francisco", "Chicago", "Los Angeles", "Austin",
    "Boston", "Seattle", "Miami", "Dallas", "Denver",
    "London", "Paris", "Berlin", "Tokyo", "Singapore"
]

industries = [
    "Technology", "Finance", "Healthcare", "Energy", "Manufacturing",
    "Retail", "Entertainment", "Media", "Education", "Real Estate"
]

descriptions = [
    "A leading company in the industry, known for its innovative solutions.",
    "A fast-growing startup with a dynamic team and a unique product.",
    "An established corporation with a global presence and a commitment to excellence.",
    "A forward-thinking business with a focus on sustainability and corporate responsibility.",
    "A tech-savvy organization with cutting-edge technology and a vibrant work culture."
]

websites = [
    "www.example.com", "www.example.org", "www.example.net", "www.example.biz", "www.example.co"
]

ceos = [
    "John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis",
    "Eva Green", "Frank White", "Grace Black", "Hannah Taylor", "Isaac King"
]

internships = []

for _ in range(50):
    internship = {
        "name": random.choice(company_names),
        "location": random.choice(locations),
        "industry": random.choice(industries),
        "size": random.randint(50, 5000),
        "description": random.choice(descriptions),
        "website": random.choice(websites),
        "foundedYear": random.randint(1950, 2020),
        "ceo": random.choice(ceos)
    }
    internships.append(internship)

print(internships)

endpoint_url = "http://localhost:8091/api/internships"

headers = {
    "Content-Type": "application/json",
}

for internship in internships:
    data = json.dumps(internship)
    response = requests.post(endpoint_url, data=data, headers=headers)
    time.sleep(0.01)
    
    # Optionally, print the response content
    print("Response content:", response.json())