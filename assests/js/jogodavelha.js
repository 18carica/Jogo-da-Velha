// Variáveis para controlar o estado do jogo
let currentPlayer = 'X';
let player1Wins = 0;
let player2Wins = 0;
let player1Name = '';
let player2Name = '';

// Variável para verificar se um jogador está cadastrado
let jogadorCadastrado = false;
// Variável para acompanhar o modo de jogo
let jogador2 = false;
// Esconde game-board 
document.getElementById("game-board").style.visibility = 'hidden';
// Função para cadastrar um jogador 
function cadastrarJogador(jogador) {
    if (jogador == 1) {
        var elementoJogador = document.getElementById("player1");
        document.getElementById("saida1").innerHTML = elementoJogador.value + ' | X';
        jogadorCadastrado = true;
        elementoJogador.style.visibility = 'hidden';
        document.getElementById("cadastro1").style.visibility = 'hidden';
    }
    if (jogador == 2) {
        var elementoJogador = document.getElementById("player2");
        document.getElementById("saida2").innerHTML = elementoJogador.value + ' | O';
        elementoJogador.style.visibility = 'hidden';
        document.getElementById("cadastro2").style.visibility = 'hidden';
    }
    mostrarJogadorAtual();
}
// Função modeo de jogo
function ModoDeJogo(modoJogo) {
    var panel1 = document.getElementById("side-panel-1");
    var panel2 = document.getElementById("side-panel-2");
    var gameBoard = document.getElementById("game-board");

    if (modoJogo === 1) {
        panel1.style.visibility = 'visible';
        panel2.style.visibility = 'visible';
        gameBoard.style.visibility = 'visible';
        document.getElementById("player2").style.visibility = 'visible';
        document.getElementById("cadastro2").style.visibility = 'visible';
        jogador2 = false; // Agora, jogador2 refere-se ao computador
    } else if (modoJogo === 2) {
        panel1.style.visibility = 'visible';
        panel2.style.visibility = 'visible';
        gameBoard.style.visibility = 'visible';
        document.getElementById("saida2").innerHTML = "Computador";
        document.getElementById("player2").style.visibility = 'hidden';
        document.getElementById('cadastro2').style.visibility = 'hidden';
        jogador2 = true; // Agora, jogador2 refere-se a um segundo jogador humano
    }
}
// Função para exibir o jogador atual
function mostrarJogadorAtual() {
    document.getElementById('jogadorAtual').innerHTML = 'Jogador atual: ' + currentPlayer;
}
// Flag para rastrear se é a vez do jogador
let playerTurn = true;

function cellClick(cell, index) {
    if (cell.innerText === '' && !checkWinner() && playerTurn) {
        cell.innerText = currentPlayer;

        if (checkWinner()) {
            updateWinner();
            resetBoard();
        } else {
            playerTurn = false; // Desabilita cliques durante a jogada do computador
            // Verifica se está no modo "VS Computador" e é a vez do computador
            if (jogador2 && currentPlayer === 'X') {
                setTimeout(() => {
                    makeComputerMove();
                    playerTurn = true; // Habilita cliques após a jogada do computador
                }, 1000);
            } else if (!jogador2) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                mostrarJogadorAtual();
                playerTurn = true; // Habilita cliques para o próximo jogador
            }
        }
    }
}
// Função para realizar a jogada do computador
function makeComputerMove() {
    const emptyCells = document.querySelectorAll('.cell:empty');

    if (emptyCells.length > 0 && !checkWinner()) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomIndex];
        randomCell.innerText = 'O';

        if (checkWinner()) {
            setTimeout(() => {
                mostrarJogadorAtual();
                updateWinner();
                resetBoard();
            }, 500);
        } else {
            currentPlayer = 'X';
            mostrarJogadorAtual();
            playerTurn = true;
        }
    }
}
function checkWinner() {
    const cells = document.querySelectorAll('.cell');
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linha
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // coluna
        [0, 4, 8], [2, 4, 6]             // diagonal
    ];
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].innerText !== '' && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            return true;
        }
    }
    if ([...cells].every(cell => cell.innerText !== '')) {
        resetBoard();
    }
    return false;
}
// Função para atualizar o placar do vencedor
function updateWinner() {
    const winner = currentPlayer === 'X' ? 'O' : 'X';

    if (jogador2 && currentPlayer === 'X') {
        // Modo "VS Computador" - jogador humano vence
        player1Wins++;
        document.getElementById('player1-wins').innerText = `${player1Name} Vitórias: ${player1Wins}`;
    } else if (jogador2 && currentPlayer === 'O') {
        // Modo "VS Computador" - computador vence
        player2Wins++;
        document.getElementById('player2-wins').innerText = `Computador Vitórias: ${player2Wins}`;
    } else if (!jogador2 && winner === 'X') {
        // Modo 2 jogadores - jogador 1 vence
        player1Wins++;
        document.getElementById('player1-wins').innerText = `${player1Name} Vitórias: ${player1Wins}`;
    } else if (!jogador2 && winner === 'O') {
        // Modo 2 jogadores - jogador 2 vence
        player2Wins++;
        document.getElementById('player2-wins').innerText = `${player2Name} Vitórias: ${player2Wins}`;
    }
}
// Função para resetar o tabuleiro após uma partida
function resetBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerText = '');
}
// Função para reiniciar o placar
function resetPlacar() {
    player1Wins = 0;
    player2Wins = 0;
    document.getElementById('player1-wins').innerText = `${player1Name} Vitórias: ${player1Wins}`;
    document.getElementById('player2-wins').innerText = `${player2Name} Vitórias: ${player2Wins}`;
}
// Função "Reiniciar"
document.querySelector('.reset button').addEventListener('click', resetPlacar);