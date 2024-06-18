from flask import Blueprint, request, jsonify
import requests
from dotenv import load_dotenv
import os
from models import User



load_dotenv()

api = Blueprint('api', __name__)

@api.route('/users', methods=['POST'])
def create_user():
    email = request.json.get('email')
    password = request.json.get('password')
    wallet_address = request.json.get('walletAddress')

    user = User.create(email, password, wallet_address)
    if user:
        return jsonify({'success': True, 'user_id': user.id})
    else:
        return jsonify({'success': False, 'error': 'Failed to create user'}), 400

@api.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user = User.get(user_id)
    if user:
        return jsonify({'success': True, 'email': user.email})
    else:
        return jsonify({'success': False, 'error': 'User not found'}), 404

@api.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    email = request.json.get('email')
    password = request.json.get('password')
    wallet_address = request.json.get('walletAddress') 

    user = User.update(user_id, email, password, wallet_address)
    if user:
        return jsonify({'success': True, 'user_id': user.id})
    else:
        return jsonify({'success': False, 'error': 'Failed to update user'}), 400

@api.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    success = User.delete(user_id)
    if success:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Failed to delete user'}), 400
    

@api.route('/broadcast-transaction', methods=['POST'])
def broadcast_transaction():
    raw_tx = request.json.get('signedMessage')

    if not raw_tx:
        return jsonify({'success': False, 'error': 'No signed message provided'}), 400

    api_url = "https://open-api-testnet.unisat.io/v2/inscribe/order/create"
    api_key = os.getenv('API_KEY')

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    payload = {
        "receiveAddress": "tb1ptpaxdwftcjjelnsjxnuw7dw9gqqkk9x39fj2pgwmw9rl2scwz4uqpfu284",
        "feeRate": 1,
        "outputValue": 546,
        "files": [
            {
                "filename": "inscription_file.txt",
                "dataURL": f"data:text/plain;charset=utf-8;base64,{raw_tx}"
            }
        ],
        "devAddress": "tb1pvrsdqke2jhc84sk273c8lvhcfxkzlngwxvhrh2f3lnjltzmcyflq6v4v9v",
        "devFee": 0
    }

    try:
        response = requests.post(api_url, headers=headers, json=payload)
        response_data = response.json()

        if response.ok and response_data.get('code') == 0:
            return jsonify({'success': True, 'data': response_data['data']})
        else:
            error_msg = response_data.get('msg', 'Unknown error')
            return jsonify({'success': False, 'error': error_msg}), 400

    except requests.exceptions.RequestException as e:
        return jsonify({'success': False, 'error': f"Failed to create inscription order: {str(e)}"}), 500

    except Exception as e:
        return jsonify({'success': False, 'error': f"Unexpected error: {str(e)}"}), 500