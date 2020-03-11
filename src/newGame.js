let gameName = document.querySelector('.game-name')
let player1 = document.querySelector('.player1')
let player2 = document.querySelector('.player2')
let player3 = document.querySelector('.player3')
let player4 = document.querySelector('.player4')
let button = document.querySelector('.add-new-game-button')

gameName.addEventListener('change', (event) => {
    gameName.value = event.target.value
})

player1.addEventListener('change', (event) => {
    player1.value = event.target.value
})

player2.addEventListener('change', (event) => {
    player2.value = event.target.value
})

player3.addEventListener('change', (event) => {
    player3.value = event.target.value
})

player4.addEventListener('change', (event) => {
    player4.value = event.target.value
})

button.addEventListener('click', (event) => {
    if (gameName.value === '' || player1.value === '' || player2.value === '' || player3.value === '' || player4.value === '') {
        alert('Please fill in all fields')
    } else {
        let data = `game_name=${encodeURIComponent(gameName.value)}&player1=${encodeURIComponent(player1.value)}&player2=${encodeURIComponent(player2.value)}&player3=${encodeURIComponent(player3.value)}&player4=${encodeURIComponent(player4.value)}`
        fetch('http://localhost:8080/games', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res) => {
            res.json().then((data) => {
                console.log(data)
                window.location.href = `./game.html?id=${data}`
            })
        }).catch(() => {
            alert('Unable to submit data')
        })
    }
})

