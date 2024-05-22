import requests
import time

# Replace with your actual API endpoint URLs
get_endpoint_url = "http://localhost:8091/api/internships"
delete_endpoint_url = "http://localhost:8091/api/internships/{id}"

# Headers
headers = {
    "Content-Type": "application/json",
}

# Step 1: Fetch all internships
response = requests.get(get_endpoint_url, headers=headers)

if response.status_code == 200:
    internships = response.json()
    for internship in internships:
        ceo_is_null = not internship.get("ceo")
        founded_year_is_zero = internship.get("foundedYear") == 0
        
        # Step 2: Check if CEO is null or foundedYear is 0
        if ceo_is_null or founded_year_is_zero:
            # Step 3: Delete the internship if CEO is null or foundedYear is 0
            delete_url = delete_endpoint_url.format(id=internship["id"])
            delete_response = requests.delete(delete_url, headers=headers)
            if delete_response.status_code == 204:
                print(f"Deleted internship with ID: {internship['id']}")
            else:
                print(f"Failed to delete internship with ID: {internship['id']}. Status code: {delete_response.status_code}")
            time.sleep(0.01)  # Pause to avoid overwhelming the server
else:
    print(f"Failed to fetch internships. Status code: {response.status_code}")