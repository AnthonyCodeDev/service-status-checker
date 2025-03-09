from flask import Flask, request, Response
import json
from ServiceStatusChecker import ServiceStatusChecker

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/check_status/<service_name>', methods=['GET'])
def check_status_route(service_name):
    # On vérifie que le nom du service est alphanumérique
    if not service_name.isalnum():
        return Response(json.dumps({"error": "Invalid service name"}, ensure_ascii=False),
                        status=400, mimetype="application/json")

    # Récupération de la langue via les query parameters (défaut : anglais)
    lang = request.args.get('language', 'en').lower()
    
    checker = ServiceStatusChecker(service_name=service_name)
    result = checker.check_status(lang=lang)
    
    # On construit la réponse JSON avec ensure_ascii=False pour éviter les échappements
    json_result = json.dumps(result, ensure_ascii=False)
    return Response(json_result, mimetype="application/json")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
