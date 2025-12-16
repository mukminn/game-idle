#!/usr/bin/env python3
"""
Simple HTTP server for testing the Idle RPG game prototype.
Run this script and open http://localhost:8000 in your browser.
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Idle RPG Server started!")
        print(f"📡 Server running at http://localhost:{PORT}")
        print(f"🌐 Open http://localhost:{PORT} in your browser")
        print(f"⏹️  Press Ctrl+C to stop the server\n")
        
        # Try to open browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped.")
            httpd.shutdown()

if __name__ == "__main__":
    main()

