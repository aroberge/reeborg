'''This program starts a server, opens a specified version of
Reeborg's World. It can use the default version or an offline version
that uses libraries (jQuery, etc.) copied in the repository so that
it can be used without an Internet connection.

With either the "online" or "offline" version, a series of integration
tests, using QUnit, can be run with the result displayed in the browser.

By default, a button is added to stop the server;
this can be changed if needed.
'''
# adapted for Python 3 in parts from the solution written for Python 2 at
# http://stackoverflow.com/questions/10085996/shutdown-socketserver-serve-forever-in-one-thread-python-application/22533929#22533929

import http.server
import socketserver
import _thread
import webbrowser
import datetime

FILENAME = "reeborg.html"
SERVER_BUTTON = """
<script>
    function __stop_server() {
       var button = document.getElementById("stop-server");
       var request = new XMLHttpRequest();
       request.open("GET", "/stop_server");
       request.send();
       button.innerHTML = "Server stopped";
    }
</script>
<style>
    #stop-server {
        position: absolute;
        top: 0;
        left: 0;
        background-color: red;
        z-index: 10000;
    }
</style>
<body>
  <button id="stop-server" onclick="__stop_server()">click to stop server</button>
"""
QUNIT_BEGIN = """
    <div id="qunit"></div>
    <div id="qunit-fixture"></div>

    <div style="display:none;"> <!-- hides default display -->
"""
QUNIT_END = """
    </div>
    <script src="//code.jquery.com/qunit/qunit-1.18.0.js"></script>
    <script src="qunit_test/js/test_utils.js" defer></script>
    <script src="qunit_test/js/all_qunit_tests.js" defer></script>
    </body>
"""
QUNIT_STYLE = """
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.18.0.css">
</head>
"""


class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/stop_server'):
            print("Server is going down!")
            def stop_me_please(server):
                server.shutdown()
            _thread.start_new_thread(stop_me_please, (reeborg_server,))
            self.send_error(500)
        elif FILENAME in self.path:
            self.serve_main_file()
        else:
            super().do_GET()

    def serve_main_file(self):
        '''modifies html file to add button to stop server'''

        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()

        with open(FILENAME, 'r', encoding="utf-8") as main_file:
            lines = main_file.readlines()

        new_lines = []
        for line in lines:
            if '</head>' in line  and ARGS and ARGS.qunit:
                line = QUNIT_STYLE
            elif "<body>" in line:
                if not ARGS.no_button:
                    line = SERVER_BUTTON
                if ARGS and ARGS.qunit:
                    line += QUNIT_BEGIN
            elif "</body>" in line and ARGS and ARGS.qunit:
                line = QUNIT_END

            new_lines.append(line)

        self.wfile.write(bytes(''.join(new_lines), "utf-8"))


class MyTCPServer(socketserver.TCPServer):
    def server_bind(self):
       import socket
       self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
       self.socket.bind(self.server_address)

def main(port, host):
    global reeborg_server
    server_address = ('', port)

    # different URL forces the browser to load a fresh version of the file
    prevent_cache = "?" + str(datetime.datetime.now())

    if ARGS.firefox:
        webbrowser.register('firefox',
            None,
            webbrowser.BackgroundBrowser(
            'C:/Program Files/mozilla firefox/firefox.exe'))
        browser = webbrowser.get('firefox')
    else:
        browser = webbrowser.get()

    browser.open_new(host + FILENAME + prevent_cache)

    reeborg_server = MyTCPServer(server_address, MyHandler)
    try:
        reeborg_server.serve_forever()
    except KeyboardInterrupt:
        pass
    reeborg_server.server_close()

if __name__ == "__main__":
    import argparse
    port = 8700
    raw_host = "http://localhost:%d/"
    parser = argparse.ArgumentParser(
            description=__doc__)
    parser.add_argument("--qunit", help="Runs QUnit test version",
            action="store_true")
    parser.add_argument("--offline", help="Runs completely local version " +
            "which is useful if there is no internet connection""",
            action="store_true")
    parser.add_argument("--no_button",
            help="Do not add stop_server button.\n" +
            "Use %sstop_server as URL to stop the server" % raw_host % port,
            action="store_true")
    parser.add_argument("--port", help="local port to use; default=%d" % port,
            type=int, default=port)
    parser.add_argument("--firefox", help="Opens in Firefox on my Windows computer",
            action="store_true")
    ARGS = parser.parse_args()

    host = raw_host % ARGS.port

    if ARGS.offline:
        FILENAME = "reeborg_offline.html"
    if ARGS.no_button:
        print("Use %s/stop_server as URL to stop the server" % host)

    main(ARGS.port, host)
