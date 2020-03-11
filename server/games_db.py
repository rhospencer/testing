import sqlite3

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class DB:
    def __init__(self):
        self.connection = sqlite3.connect('pickleball_games.db')
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def createTable(self):
        # self.cursor.execute('''DROP TABLE IF EXISTS games''')
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS games(id INTEGER PRIMARY KEY AUTOINCREMENT, game_name TEXT, player1 TEXT, player2 TEXT, player3 TEXT, player4 TEXT, team1_score INTEGER, team2_score INTEGER, team1_serving INT, server1_serving INT, team1_right TEXT, team1_left TEXT, team2_right TEXT, team2_left TEXT, server TEXT);''')
        self.connection.commit()

    def newGame(self, game_name, player1, player2, player3, player4):
        data = [game_name, player1, player2, player3, player4, player1, player2, player3, player4, player1]
        self.cursor.execute('''INSERT INTO games (game_name, player1, player2, player3, player4, team1_score, team2_score, team1_serving, server1_serving, team1_right, team1_left, team2_right, team2_left, server) VALUES (?, ?, ?, ?, ?, 0, 0, 1, 0, ?, ?, ?, ?, ?);''', data)
        self.connection.commit()
        id = self.cursor.lastrowid
        print(id)
        return id

    def allGames(self):
        self.cursor.execute('''SELECT * FROM games ORDER BY id DESC;''')
        games = self.cursor.fetchall()
        return games

    def oneGame(self, id):
        self.cursor.execute('''SELECT * FROM games WHERE id=?;''', [id])
        game = self.cursor.fetchone()
        print(game)
        return game

    def deleteGame(self, id):
        self.cursor.execute('''DELETE FROM games WHERE id=?;''', [id])
        self.connection.commit()

    def updateGame(self, team1_score, team2_score, team1_serving, server1_serving, team1_right, team1_left, team2_right, team2_left, server, id):
        data = [team1_score, team2_score, team1_serving, server1_serving, team1_right, team1_left, team2_right, team2_left, server, id]
        self.cursor.execute('''UPDATE games SET team1_score=?, team2_score=?, team1_serving=?, server1_serving=?, team1_right=?, team1_left=?, team2_right=?, team2_left=?, server=? WHERE id=?;''', data)
        self.connection.commit()

database = DB()
database.createTable()