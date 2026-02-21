const tabuleiro = document.getElementById('tabuleiro');
const celulas = document.querySelectorAll('.celula');
const statusMsg = document.getElementById('mensagem');
const scoreXMsg = document.getElementById('scoreX');
const scoreOMsg = document.getElementById('scoreO');
const btnReset = document.getElementById('reset');

let vezDoX = true;
let placarX = 0;
let placarO = 0;
let jogoAtivo = true;

const vitorias = [
    [0,1,2], [3,4,5], [6,7,8], // horizontais
    [0,3,6], [1,4,7], [2,5,8], // verticais
    [0,4,8], [2,4,6]           // diagonais
];

function clique(e) {
    const celula = e.target;
    if (celula.textContent !== "" || !jogoAtivo) return;

    const jogador = vezDoX ? 'X' : 'O';
    celula.textContent = jogador;
    celula.classList.add(jogador.toLowerCase());

    if (checarVitoria(jogador)) {
        fimDeRodada(jogador);
    } else if (checarEmpate()) {
        statusMsg.textContent = "Empate!";
        setTimeout(resetarTabuleiro, 1500);
    } else {
        vezDoX = !vezDoX;
        statusMsg.textContent = `Vez do ${vezDoX ? 'X' : 'O'}`;
    }
}

function checarVitoria(jogador) {
    return vitorias.some(comb => {
        return comb.every(index => celulas[index].textContent === jogador);
    });
}

function checarEmpate() {
    return [...celulas].every(c => c.textContent !== "");
}

function fimDeRodada(vencedor) {
    jogoAtivo = false;
    statusMsg.textContent = `Jogador ${vencedor} venceu!`;
    
    if (vencedor === 'X') placarX++;
    else placarO++;

    scoreXMsg.textContent = placarX;
    scoreOMsg.textContent = placarO;

    if (placarX === 10 || placarO === 10) {
        setTimeout(() => {
            alert(`🏆 PARABÉNS! O Jogador ${vencedor} é o grande campeão com 10 pontos!`);
            location.reload(); // Reinicia tudo
        }, 100);
    } else {
        setTimeout(resetarTabuleiro, 1500);
    }
}

function resetarTabuleiro() {
    celulas.forEach(c => {
        c.textContent = "";
        c.classList.remove('x', 'o');
    });
    vezDoX = true;
    statusMsg.textContent = "Vez do X";
    jogoAtivo = true;
}

celulas.forEach(c => c.addEventListener('click', clique));
btnReset.addEventListener('click', () => location.reload());