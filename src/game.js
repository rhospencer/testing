let serverName = document.querySelector('.server-name');
let serverNumber = document.querySelector('.server-number');
let team1_right = document.querySelector('.team1-right');
let team1_left = document.querySelector('.team1-left');
let team2_left = document.querySelector('.team2-left');
let team2_right = document.querySelector('.team2-right');
let gameName = document.querySelector('.game-name-game');
let team1_score = document.querySelector('.team1-score');
let team2_score = document.querySelector('.team2-score');
let team1_point = document.querySelector('.team1-point');
let team2_point = document.querySelector('.team2-point');


let getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
    }
	return params;
};

let param = getParams(window.location)
console.log(param)

let gameInfo = null


onLoad = () => {
    fetch(`http://localhost:8080/games/${param.id}`).then((res) => {
            res.json().then((data) => {
                console.log(data)
                serverName.innerHTML = `Server: ${data.server}`
                if (data.server1_serving) {
                    serverNumber.innerHTML = `Server Number: 1`
                } else {
                    serverNumber.innerHTML = `Server Number: 2`
                }
                team1_right.innerHTML = data.team1_right
                team1_left.innerHTML = data.team1_left
                team2_left.innerHTML = data.team2_left
                team2_right.innerHTML = data.team2_right
                gameName.innerHTML = data.game_name
                team1_score.innerHTML = data.team1_score
                team2_score.innerHTML = data.team2_score
                gameInfo = data
                console.log(gameInfo)
            })
        }).catch((err) => {
            alert('Unable to retrieve game data')
        })
}

sendData = () => {
    let data = `team1_score=${encodeURIComponent(team1_score.innerHTML)}&team2_score=${encodeURIComponent(team2_score.innerHTML)}&team1_serving=${encodeURIComponent(gameInfo.team1_serving)}&server1_serving=${encodeURIComponent(gameInfo.server1_serving)}&team1_right=${encodeURIComponent(team1_right.innerHTML)}&team1_left=${encodeURIComponent(team1_left.innerHTML)}&team2_right=${encodeURIComponent(team2_right.innerHTML)}&team2_left=${encodeURIComponent(team2_left.innerHTML)}&server=${encodeURIComponent(gameInfo.server)}`
    fetch(`http://localhost:8080/games/${param.id}`, {
        method: 'PUT',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).catch((err) => {
        alert('Unable to send data')
    })
}

deleteGame = () => {
    fetch(`http://localhost:8080/games/${param.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res) => {
        window.location.href = `./index.html`
    }).catch((err) =>  {
        console.log(err)
        alert('Unable to delete data')
    })
}

finishGame = (player1, player2, winningTeam, loosingTeam) => {
    console.log('test')
    alert(`${player1} & ${player2} win!
    ${winningTeam} - ${loosingTeam}`)
    deleteGame()
}

team1_point.addEventListener('click', (event) => {
    handlePoint('team1')
})

team2_point.addEventListener('click', (event) => {
    handlePoint('team2')
})

handlePoint = (team) => {
    if (team === 'team1') {
        if(gameInfo.team1_serving === 1) {
            team1_score.innerHTML = +team1_score.innerHTML +1
            gameInfo.team1_score = +gameInfo.team1_score +1
            if(gameInfo.team1_score < 11) {
                let temp_right = gameInfo.team1_right
                let temp_left = gameInfo.team1_left
                team1_right.innerHTML = temp_left
                team1_left.innerHTML = temp_right
                gameInfo.team1_right = temp_left
                gameInfo.team1_left = temp_right
                sendData()
            } else {
                finishGame(gameInfo.player1, gameInfo.player2, gameInfo.team1_score, gameInfo.team2_score)
                return
            }
        } else {
            if(gameInfo.server1_serving === 1) {
                if(gameInfo.server === gameInfo.team2_right) {
                    gameInfo.server1_serving = 0
                    gameInfo.server = gameInfo.team2_left
                    serverNumber.innerHTML = "Server Number: 2"
                    serverName.innerHtml = `Server: ${gameInfo.team2_left}`
                    sendData()
                } else {
                    gameInfo.server1_serving = 0
                    gameInfo.server = gameInfo.team2_right
                    serverNumber.innerHTML = "Server Number: 2"
                    serverName.innerHtml = `Server: ${gameInfo.team2_right}`
                    sendData()
                }
            } else {
                gameInfo.team1_serving = 1
                gameInfo.server1_serving = 1
                gameInfo.server = gameInfo.team1_right
                serverNumber.innerHTML = "Server Number: 1"
                serverName.innerHtml = `Server: ${gameInfo.team1_right}`

                sendData()
            }
        }
    } else {
        if(gameInfo.team1_serving === 0) {
            team2_score.innerHTML = +team2_score.innerHTML +1
            gameInfo.team2_score = +gameInfo.team2_score +1
            if(gameInfo.team2_score < 11) {
                let temp_right = gameInfo.team2_right
                let temp_left = gameInfo.team2_left
                team2_right.innerHTML = temp_left
                team2_left.innerHTML = temp_right
                gameInfo.team2_right = temp_left
                gameInfo.team2_left = temp_right
                sendData()
            } else {
                finishGame(gameInfo.player3, gameInfo.player4, gameInfo.team2_score, gameInfo.team1_score)
                return
            }
        } else {
            if(gameInfo.server1_serving === 1) {
                if(gameInfo.server === gameInfo.team1_right) {
                    gameInfo.server1_serving = 0
                    gameInfo.server = gameInfo.team1_left
                    serverNumber.innerHTML = "Server Number: 2"
                    serverName.innerHtml = `Server: ${gameInfo.team1_left}`
                    sendData()
                } else {
                    gameInfo.server1_serving = 0
                    gameInfo.server = gameInfo.team1_right
                    serverNumber.innerHTML = "Server Number: 2"
                    serverName.innerHtml = `Server: ${gameInfo.team1_right}`
                    sendData()
                }
            } else {
                gameInfo.team1_serving = 0
                gameInfo.server1_serving = 1
                gameInfo.server = gameInfo.team2_right
                serverNumber.innerHTML = "Server Number: 1"
                serverName.innerHtml = `Server: ${gameInfo.team2_right}`
                sendData()
            }
        }
    }
}

onLoad()



