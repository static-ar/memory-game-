$(document).ready(function () {
    var symbols = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🥝", "🍍"]
    var cards = symbols.concat(symbols)
    cards.sort(function () {
        return 0.5 - Math.random()
    })
    var firstCard = null
    var secondCard = null
    var lockBoard = false
    var moves = 0
    var matchedPairs = 0
    var timer = 0
    var timerStarted = false
    var interval
    for (var i = 0; i < cards.length; i++) {
        var card = $("<div></div>")
        card.addClass("card")
        card.attr("data-symbol", cards[i])
        card.text("")
        $("#gameBoard").append(card)
    }
    $(".card").click(function () {
        if (lockBoard) return
        if ($(this).hasClass("flipped")) return
        if (!timerStarted) {
            timerStarted = true
            interval = setInterval(function () {
                timer++
                $("#timer").text(timer)
            }, 1000)
        }
        $(this).addClass("flipped")
        $(this).text($(this).attr("data-symbol"))
        if (firstCard == null) {
            firstCard = $(this)
        }
        else {
            secondCard = $(this)
            moves++
            $("#moves").text(moves)
            lockBoard = true
            if (firstCard.attr("data-symbol") == secondCard.attr("data-symbol")) {
                $("#matchSound")[0].play()
                matchedPairs++
                firstCard = null
                secondCard = null
                lockBoard = false
                if (matchedPairs == symbols.length) {
                    clearInterval(interval)
                    $("#winMessage").fadeIn()
                }
            }
            else {
                $("#wrongSound")[0].play()
                setTimeout(function () {
                    firstCard.removeClass("flipped")
                    secondCard.removeClass("flipped")
                    firstCard.text("")
                    secondCard.text("")
                    firstCard = null
                    secondCard = null
                    lockBoard = false
                }, 1000)
            }
        }
    })
})
