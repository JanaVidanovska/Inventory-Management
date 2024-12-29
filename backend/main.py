from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid
from enum import Enum
from datetime import datetime

app = Flask(__name__)
CORS(app)

class Type(Enum):
    ComputerEquipment = "Computer Equipment"
    Furniture = "Furniture"
    CommunicationEquipment = "Communication Equipment"
    Machinery = "Machinery"

class State(Enum):
    InUser = "In User"
    Lost = "Lost"
    Deprecated = "Deprecated"
    Broken = "Broken"


inventory_items = []

@app.route("/api/inventory", methods=['GET'])
def get_inventory_items():
    return jsonify({"inventory_items": inventory_items})

@app.route("/api/inventory", methods=['POST'])
def add_inventory_item():
    id = str(uuid.uuid4())
    added_at = get_current_timestamp()
    updated_at = added_at
    type = request.json.get("type")
    description = request.json.get("description")
    state = request.json.get("state")

    new_item = {
        "id": id,
        "type": type,
        "description": description,
        "added_at": added_at,
        "state": state,
        "updated_at": updated_at,
    }
    inventory_items.append(new_item)
    return jsonify(new_item), 201

@app.route("/api/inventory/<item_id>", methods=['PUT'])
def update_inventory_item(item_id):
    item = next((item for item in inventory_items if item['id'] == item_id), None)
    if item:
        data = request.get_json()
        item.update(data)
        item['updated_at'] = get_current_timestamp()
        return jsonify(item), 200
    return jsonify({"error": "Item not found"}), 404

@app.route("/api/inventory/<id>", methods=['DELETE'])
def delete_inventory_item(id):
    global inventory_items
    inventory_items = [item for item in inventory_items if item['id']!=id]
    return jsonify({"message": "Item deleted successfully"}), 200

def get_current_timestamp():
    return datetime.now().strftime("%d/%m/%Y at %H:%M:%S")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)