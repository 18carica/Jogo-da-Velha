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
// Função para cadastrar um jogador com base no número do jogador
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
// Função para definir o modo de jogo e ajustar a visibilidade do jogador
function ModoDeJogo(modoJogo) {
    document.getElementById("side-panel-1").style.visibility = 'visible';
    document.getElementById("side-panel-2").style.visibility = 'visible';
    document.getElementById("game-board").style.visibility = 'visible';
    var labelSaida = document.getElementById("saida2");
    var elementoJogador = document.getElementById("player2");
    if (modoJogo === 1) {
        labelSaida.innerHTML = "Jogador 2:";
        elementoJogador.style.visibility = 'visible';
        document.getElementById("cadastro2").style.visibility = 'visible';
        jogador2 = true; // Jogador humano
    }
    if (modoJogo === 2) {
        labelSaida.innerHTML = "Computador";
        elementoJogador.style.visibility = 'hidden';
        document.getElementById('cadastro2').style.visibility = 'hidden';
        jogador2 = false; // Jogador computador
    }
}
// Função para exibir o jogador atual
function mostrarJogadorAtual() {
    document.getElementById('jogadorAtual').innerHTML = 'Jogador atual: ' + currentPlayer;
}
// Função para lidar com um clique em uma célula do tabuleiro
function cellClick(cell) {
    if (cell.innerText === '' && !checkWinner()) {
        cell.innerText = currentPlayer;
        if (checkWinner()) {
            updateWinner();
            resetBoard();
        } else {
            if (currentPlayer === 'X') {
                currentPlayer = 'O';
            } else {
                currentPlayer = 'X';
                // PC
                // makeComputerMove();
            }
        }
    }
}
// Função para realizar a jogada do computador (ainda não funciona)
function makeComputerMove() {
    const emptyCells = document.querySelectorAll('.cell:empty');

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomIndex];
        randomCell.innerText = currentPlayer;
        if (checkWinner()) {
            updateWinner();
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            mostrarJogadorAtual(); // Adicionei para mostrar o jogador atual após a jogada do computador
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
    if (winner === 'X') {
        player1Wins++;
        document.getElementById('player1-wins').innerText = `${player1Name}Vitórias ${player1Wins}`;
    } else {
        player2Wins++;
        document.getElementById('player2-wins').innerText = `${player2Name}Vitórias ${player2Wins}`;
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
// Associe a função ao evento de clique do botão "Reiniciar"
document.querySelector('.reset button').addEventListener('click', resetPlacar);

