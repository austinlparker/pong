$(document).ready(function() {
    var p1 = undefined;
    var p2 = undefined;
    var winner = undefined;
    var loser = undefined;
    var inGame = 0;
    var gameFinished = 0;

    if (!inGame) {

    $('body').on('click', function(item) {
        if (inGame === 1) {
            if (winner) {
                if (gameFinished) {
                    return;
                }
                console.log(winner, loser);
                sendWinResponse(winner, loser);
                gameFinished = 1;
            }
            //console.log(item.target);
            if ($(item.target).attr('id') == 'p1Score') {
                console.log('increment p1')
                $(item.target).text(parseInt($(item.target).text()) + 1);
                if ($(item.target).text() === "21") {
                    console.log('p1 win');
                    var winName = $('.p1game h4').text().split(" ");
                    //console.log(winName);
                    winner = {
                        firstName: winName[0],
                        lastName: winName[1],
                        score: $('h1#p1Score').text()
                    };
                    var loseName = $('.p2game h4').text().split(" ");
                    loser = {
                        firstName: loseName[0],
                        lastName: loseName[1],
                        score: $('h1#p2Score').text()
                    };
                };
            }
            if ($(item.target).attr('id') == 'p2Score') {
                console.log('increment p2')
                $(item.target).text(parseInt($(item.target).text()) + 1);
                if ($(item.target).text() === "21") {
                    console.log('p2 win');
                    var winName = $('.p2game p').text().split(" ");
                    console.log(winName);
                    winner = {
                        firstName: winName[0],
                        lastName: winName[1],
                        score: $('h1#p2Score').text()
                    };
                    var loseName = $('.p1game p').text().split(" ");
                    loser = {
                        firstName: loseName[0],
                        lastName: loseName[1],
                        score: $('h1#p1Score').text()
                    };
                };
            }
            return;
        }
        //console.log($(item.target));
        if ($(item.target).attr('id') === "player1") {
            $(item.target).clone().appendTo('.p1game');
            $(item.target).addClass('selected');
            p1 = item.target; }
        if ($(item.target).attr('id') === "player2") {
            $(item.target).clone().appendTo('.p2game');
            $(item.target).addClass('selected');
            p2 = item.target; }
        //console.log(item.target);
        //console.log(typeof(p1));
        console.log('p1 - ' + p1);
        console.log('p2 - ' + p2);
        //console.log($(p1).attr('id'));
        if ($(p1).attr('id') === "player1" && $(p2).attr('id') === "player2"){
            console.log('firing hide/show');
            $('#selectPlayer').toggleClass('hidden');
            $('#gameProgressView').toggleClass('hidden');
            inGame = 1;
            };
        console.log(inGame);
        });
    }

});

function sendWinResponse(winner, loser) {
    $.post('/game/new', { 'winner': winner, 'loser': loser}, function(res) {
        alert(res);
    });
}