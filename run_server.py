import os
import logging
from waitress import serve
from app import app

if __name__ == '__main__':
    # Set up logging
    log_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'logs')
    os.makedirs(log_dir, exist_ok=True)
    
    logging.basicConfig(
        filename=os.path.join(log_dir, 'waitress.log'),
        level=logging.INFO,
        format='%(asctime)s %(levelname)s: %(message)s'
    )
    
    # Get port from environment or use default
    port = int(os.environ.get('PORT', 5000))
    
    # Print startup message
    print(f"Starting server on port {port}...")
    print("Press Ctrl+C to quit")
    
    # Start Waitress server
    serve(app, host='0.0.0.0', port=port, threads=4) 