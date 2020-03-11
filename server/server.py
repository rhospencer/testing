from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse
from games_db import DB
import json

class MyRequestHandler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin",  "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Accept, Content-Type, Origin")
        self.end_headers()

    def do_GET(self):
        resourceName, resourceId = self.parsePath()
        if resourceName == "games":
            if resourceId:
                length = self.headers["Content-Length"]

                db = DB()
                game = db.oneGame(resourceId)
                self.send_response(200)

                #headers
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                #body
                self.wfile.write(bytes(json.dumps(game), "utf-8"))
                return
            else:
                db = DB()
                allGames = db.allGames()
                self.send_response(200)
                # headers
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                # body
                self.wfile.write(bytes(json.dumps(allGames), "utf-8"))
                return
        else:
            self.send_error(404)
            pass

    def do_POST(self):
        if self.path == "/games":
            db = DB()
            length = self.headers["Content-Length"]
            body = self.rfile.read(int(length)).decode("utf-8")
            parsed_body = parse_qs(body)
            game_name = parsed_body["game_name"][0]
            player1 = parsed_body["player1"][0]
            player2 = parsed_body["player2"][0]
            player3 = parsed_body["player3"][0]
            player4 = parsed_body["player4"][0]
            id = db.newGame(game_name, player1, player2, player3, player4)
            #headers
            self.send_response(201)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            # body
            self.wfile.write(bytes(json.dumps(id), "utf-8"))
            return
        else:
            self.send_error(404)
            pass

    def do_PUT(self):
        resourceName, resourceId = self.parsePath()
        if resourceName == "games":
            if resourceId:
                db = DB()
                length = self.headers["Content-Length"]
                body = self.rfile.read(int(length)).decode("utf-8")
                parsed_body = parse_qs(body)
                team1_score = parsed_body["team1_score"][0]
                team2_score = parsed_body["team2_score"][0]
                team1_serving = parsed_body["team1_serving"][0]
                server1_serving = parsed_body["server1_serving"][0]
                team1_right = parsed_body["team1_right"][0]
                team1_left = parsed_body["team1_left"][0]
                team2_right = parsed_body["team2_right"][0]
                team2_left = parsed_body["team2_left"][0]
                server = parsed_body["server"][0]
                db.updateGame(team1_score, team2_score, team1_serving, server1_serving, team1_right, team1_left, team2_right, team2_left, server, resourceId)
                self.send_response(201)
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Content-Type", "application/json")
                self.end_headers()
        else:
            self.send_error(404)
            pass

    def do_DELETE(self):
        resourceName, resourceId = self.parsePath()
        if resourceName == "games":
            if resourceId:
                length = self.headers["Content-Length"]

                db = DB()
                db.deleteGame(str(resourceId))
                self.send_response(201)
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
        else:
            self.send_error(404)
            pass

    def parsePath(self):
        if self.path.startswith("/"):
            parts = self.path[1:].split("/")
            resourceName = parts[0]
            resourceId = None
            if len(parts) > 1:
                resourceId = parts[1]
            return (resourceName, resourceId)
        return False






def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)

    print("Listening...")
    server.serve_forever()

run()

