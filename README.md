# Pickleball Score Keeper App 

This app is used to help keep track of the flow during a pickleball match. The app was originally intended to be used in a tournament setting to help judges keep track of score, servers, and player positions on the court, however, it can also be used to help new players understand the same. Users can start a new game and input the players names as well as a nickname for the game. A match will load with the appropriate data in place as well as where the players should be positioned. As the game goes on the user will interact with the app after each point is scored and the app will update the score, the server, and the position of the players until one team reaches 11.

## Resource

### Games

Attributes:
* game_id(ing)
    * Given to each game by database and auto-increments
* game_name(string)
* player1(string)
* player2(string)
* player3(string)
* player4(string)
* team1_score(int)
    * Starts at 0
* team2_score(int)
    * Starts at 0
* team1_serving(int)
    * Starts at 1 to signify true as if a boolean
* server1_serving(int)
    * Starts a 0 to signify false as if a boolean
* team1_right(string)
    * Starts as player1
* team1_left(string)
    * Starts as player2
* team2_right(string)
    * Starts as player3
* team2_left(string)
    * Starts as player4
* server(string)
    * Starts as player1

## Database Schema
```CREATE TABLE IF NOT EXISTS games(```
```id INTEGER PRIMARY KEY AUTOINCREMENT,```  
``` game_name TEXT,```  
``` player1 TEXT,```  
``` player2 TEXT,```  
``` player3 TEXT,```  
``` player4 TEXT,```  
``` team1_score INTEGER,```  
``` team2_score INTEGER,```  
``` team1_serving INT,```  
``` server1_serving INT,```  
``` team1_right TEXT,```  
``` team1_left TEXT,```  
``` team2_right TEXT,```  
``` team2_left TEXT,```  
``` server TEXT); ```  

## Endpoints
Name | Method | Path
------------ | ------------ | ------------
Retrieve all games | GET | /games
Retrieve one game | GET | /games/&lt;id&gt;
Create new game | POST | /games
Update game | PUT | /games/&lt;id&gt;
Delete game | DELETE | /games/&lt;id&gt;