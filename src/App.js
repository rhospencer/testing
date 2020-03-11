let games = []

deleteGame = (id) => {
    fetch(`http://localhost:8080/games/${id}`, {
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

let loadGames = () => {
    fetch('http://localhost:8080/games').then((res) => {
        res.json().then((data) => {
            games = data
            let gameList = document.querySelector(".game-list");
            console.log(gameList)
            games.forEach((el) => {
                console.log(el)
                let listItem = document.createElement("div");
                let gameName = document.createElement("h1")
                let players = document.createElement("h2")
                let score = document.createElement("h2")
                let deleteGameButton = document.createElement("h4")
                deleteGameButton.addEventListener('click', (event) => {
                    deleteGame(el.id)
                })
                let link = document.createElement("a")
                let attribute = document.createAttribute("href");
                let classAttribute = document.createAttribute("class")
                console.log(typeof el.id)
                attribute.value = `./game.html?id=${el.id}`
                classAttribute.value = "game-holder"
                link.setAttributeNode(attribute)
                listItem.setAttributeNode(classAttribute)
                gameName.innerHTML = el.game_name;
                players.innerHTML = `${el.player1} and ${el.player2} vs ${el.player3} and ${el.player4}`
                score.innerHTML = `${el.team1_score} - ${el.team2_score}`
                deleteGameButton.innerHTML = 'Delete'
                listItem.appendChild(gameName)
                listItem.appendChild(players)
                listItem.appendChild(score)
                link.appendChild(listItem)
                gameList.appendChild(link)
                gameList.appendChild(deleteGameButton)
            })
        })
    })
}

loadGames()