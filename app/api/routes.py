from flask import Blueprint, request, jsonify
import requests
from dotenv import load_dotenv
import os

load_dotenv()

api = Blueprint('api', __name__)

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