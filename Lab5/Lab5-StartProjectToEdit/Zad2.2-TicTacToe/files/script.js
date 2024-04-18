function restart() {
    console.log("restart");

    $('#game_map').empty();

    for (let i = 0; i < num_of_cols * num_of_rows; ++i) {
        let cell = $("<div></div>")
            .addClass("cell")
            .appendTo("#game_map")
            .attr("id", i);
        if (i % num_of_cols === 0) {
            cell.before('<div class="clear"></div>');
        }
    }

    $("#game_map .cell")
        .on("click", playMove)
        .on('mouseover', hoverCell)
        .on('mouseout', leaveCell);
    initTurn();
}

function initTurn() {
    $('#player_name').text(players[current_player].name)
    $('#player_mark').text(players[current_player].mark)

}

function hoverCell() {
    $(this).addClass('hover');
    return false;
};
function leaveCell() {
    $(this).removeClass('hover');
    return false;
};


function checkAndProcessWin() {
    const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
    [2, 5, 8], [0, 4, 8], [6, 4, 2]];
    for (let k in wins) {
        pattern = wins[k];
        let p = $("#" + pattern[0]).text()
            + $("#" + pattern[1]).text()
            + $("#" + pattern[2]).text();
        if (p === "XXX") return true;
        if (p === "OOO") return true;
    }
    return false;
}

function playMove() {
    $(this).addClass(players[current_player].style)
        .addClass("marked")
        .text(players[current_player].mark)
        .trigger("mouseout")
        .off("click mouseover mouseout");
    //sprawdzenie czy nie nastąpił koniec gry
    if (!checkAndProcessWin()) {
        current_player = (++current_player) % players.length;
        initTurn();
    } else {
        alert("Koniec gry");
        $('#player_wins' + current_player).text(++players[current_player].wins);
        restart();
    }
    return false;
};

let player1 = {
    mark: 'X',
    name: 'Player 1',
    style: 'player1_cell',
    score_el: 'player1_wins',
    wins: 0
};
// The second player
let player2 = {
    mark: 'O',
    name: 'Player 2',
    style: 'player2_cell',
    score_el: 'player2_wins',
    wins: 0
};
const players = [player1, player2];
let current_player = 0;
const num_of_cols = 3;
const num_of_rows = 3;




$(document).ready(function () {
    restart()
    $('#player_wins0').text('0');
    $('#player_wins1').text('0');
});
