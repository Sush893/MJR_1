import requests
import json

# Test the API
def test_search_api():
    print("Testing /search endpoint...")
    
    try:
        url = "http://localhost:5000/search"
        payload = {"query": "agriculture"}
        headers = {"Content-Type": "application/json"}
        
        print(f"Sending request to {url}")
        print(f"Payload: {payload}")
        
        response = requests.post(url, json=payload, headers=headers)
        
        print(f"Status code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response data: {json.dumps(data, indent=2)}")
            print(f"Number of results: {len(data)}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Exception: {e}")

def test_debug_api():
    print("\nTesting /debug endpoint...")
    
    try:
        url = "http://localhost:5000/debug"
        
        print(f"Sending request to {url}")
        
        response = requests.get(url)
        
        print(f"Status code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Total records: {data.get('total_records', 0)}")
            print(f"Columns: {data.get('columns', [])}")
            if 'sample_data' in data and data['sample_data']:
                print(f"First sample: {json.dumps(data['sample_data'][0], indent=2)}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    test_debug_api()
    test_search_api() 