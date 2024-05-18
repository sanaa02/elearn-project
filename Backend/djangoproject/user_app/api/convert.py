import base64

with open('tess.csv', 'rb') as file:
    csv_content = file.read()

base64_encoded_csv = base64.b64encode(csv_content).decode('utf-8')
print(base64_encoded_csv)

