import pytest
from flask import Flask
from main import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_get_inventory(client):
    response = client.get('/api/inventory')
    assert response.status_code == 200
    assert 'inventory_items' in response.json

def test_post_inventory(client):
    new_item = {
        "type": "Computer Equipment",
        "description": "Test Item",
        "state": "In User"
    }
    response = client.post('/api/inventory', json=new_item)
    assert response.status_code == 201
    assert response.json['description'] == "Test Item"

def test_update_inventory(client):
    new_item = {
        "type": "Furniture",
        "description": "Test Update",
        "state": "Lost"
    }
    post_response = client.post('/api/inventory', json=new_item)
    item_id = post_response.json['id']

    updated_item = {
        "type": "Machinery",
        "description": "Updated Item",
        "state": "Deprecated"
    }
    response = client.put(f'/api/inventory/{item_id}', json=updated_item)
    assert response.status_code == 200
    assert response.json['description'] == "Updated Item"

def test_delete_inventory(client):
    new_item = {
        "type": "Communication Equipment",
        "description": "To Be Deleted",
        "state": "Broken"
    }
    post_response = client.post('/api/inventory', json=new_item)
    item_id = post_response.json['id']

    delete_response = client.delete(f'/api/inventory/{item_id}')
    assert delete_response.status_code == 200

    get_response = client.get('/api/inventory')
    assert all(item['id'] != item_id for item in get_response.json['inventory_items'])
