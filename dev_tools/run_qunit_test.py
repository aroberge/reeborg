'''This program starts a server, opens a specially written version
of Reeborg's World that runs a series of functional tests in a browser
using the QUnit framework.

The server can be stopped "nicely".
'''
# adapted for Python 3 from the solution written for Python 2 at
# http://stackoverflow.com/questions/10085996/shutdown-socketserver-serve-forever-in-one-thread-python-application/22533929#22533929
import http.server
import socketserver
import _thread
import webbrowser

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/stop_server'):
            print("Server is going down!")
            def stop_me_please(server):
                server.shutdown()
            _thread.start_new_thread(stop_me_please, (httpd,))
            self.send_error(500)
        else:
            super().do_GET()

class MyTCPServer(socketserver.TCPServer):
    def server_bind(self):
       import socket
       self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
       self.socket.bind(self.server_address)

print("""
    Click button on page or enter /stop_server for path in browser
    to stop server session.
    """)
server_address = ('', 8800)

url = "http://localhost:8800/tests/integration_tests/reeborg_qunit_offline.html?lang=en&mode=python"
# Note: this is where chrome is located on my computer; your results may vary.
chrome_path = '"C:/Program Files/Google/Chrome/Application/chrome.exe" %s --incognito'
try:
    webbrowser.get(chrome_path).open_new(url)
except:
    print("Could not open chrome in incognito mode")
    webbrowser.open_new(url)

httpd = MyTCPServer(server_address, MyHandler)
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    pass
httpd.server_close()
