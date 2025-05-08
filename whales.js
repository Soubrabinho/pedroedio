// Arquivo para controlar a animação de baleias nadando

// Função para criar baleias nadando
function createWhales() {
    const whalesContainer = document.getElementById('whales');
    const whale = document.createElement('div');
    whale.classList.add('swimming-whale');
    
    // Posição aleatória na altura da tela
    const top = Math.random() * 80 + 10; // Entre 10% e 90% da altura
    whale.style.top = top + '%';
    
    // Definir se a baleia vai da esquerda para direita ou vice-versa
    const direction = Math.random() > 0.5 ? 'right' : 'left';
    
    if (direction === 'right') {
        whale.style.left = '-150px'; // Começa fora da tela à esquerda
        whale.style.transform = 'scaleX(1)'; // Não inverte a baleia
    } else {
        whale.style.right = '-150px'; // Começa fora da tela à direita
        whale.style.transform = 'scaleX(-1)'; // Inverte a baleia horizontalmente
    }
    
    // Tamanho aleatório
    const size = Math.random() * 50 + 50; // Entre 50px e 100px
    whale.style.width = size + 'px';
    whale.style.height = (size / 2) + 'px';
    
    // Cor aleatória (tons de azul)
    const colors = ['#0277BD', '#01579B', '#0288D1', '#039BE5', '#29B6F6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    whale.style.backgroundColor = color;
    
    // Criar a forma da baleia usando SVG
    whale.innerHTML = `
        <svg viewBox="0 0 200 100" width="100%" height="100%">
            <path d="M20,50 C20,20 60,20 100,20 C140,20 180,30 180,50 C180,70 140,80 100,80 C60,80 20,80 20,50 Z" fill="${color}"/>
            <path d="M180,50 L190,30" stroke="${color}" stroke-width="5"/>
            <circle cx="40" cy="40" r="5" fill="#E1F5FE"/>
            <path d="M100,20 C100,20 100,0 120,10" fill="${color}"/>
        </svg>
    `;
    
    // Duração aleatória da animação
    const duration = Math.random() * 15 + 10; // Entre 10 e 25 segundos
    
    // Animar a baleia atravessando a tela
    if (direction === 'right') {
        whale.animate([
            { left: '-150px' },
            { left: '100%' }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        });
    } else {
        whale.animate([
            { right: '-150px' },
            { right: '100%' }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        });
    }
    
    whalesContainer.appendChild(whale);
    
    // Remove a baleia após a animação
    setTimeout(() => {
        whale.remove();
    }, duration * 1000);
}

// Inicializa as funções quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Cria baleias a cada 2 segundos
    setInterval(createWhales, 2000);
});
