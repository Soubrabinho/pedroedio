// Arquivo para controlar o contador de tempo do relacionamento

// Função para configurar a data de início do relacionamento
function setStartDate(year, month, day, hour = 0, minute = 0, second = 0) {
    // Mês em JavaScript é baseado em zero (0-11)
    const adjustedMonth = month - 1;
    return new Date(year, adjustedMonth, day, hour, minute, second);
}

// Data de início do relacionamento: Primeiro domingo de 2025 (05/01/2025)
// Formato: Ano, Mês (1-12), Dia, [Hora (opcional)], [Minuto (opcional)], [Segundo (opcional)]
const startDate = setStartDate(2025, 1, 5); // 5 de Janeiro de 2025 (Primeiro domingo)

// Função para calcular a diferença de tempo
function calculateTimeDifference(startDate) {
    const now = new Date();
    const diff = now - startDate;
    
    // Cálculos básicos
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    
    // Cálculo de dias, meses e anos
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.floor(diff / millisecondsPerDay);
    
    // Cálculo mais preciso para meses e anos considerando diferentes durações de meses
    let yearDiff = now.getFullYear() - startDate.getFullYear();
    let monthDiff = now.getMonth() - startDate.getMonth();
    
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    
    // Ajuste para o dia do mês
    if (now.getDate() < startDate.getDate()) {
        monthDiff--;
        // Se estamos no mês negativo, ajuste o ano
        if (monthDiff < 0) {
            yearDiff--;
            monthDiff += 12;
        }
    }
    
    // Cálculo de dias considerando o ajuste de meses
    let dayDiff = now.getDate() - startDate.getDate();
    if (dayDiff < 0) {
        // Obter o último dia do mês anterior
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        dayDiff = now.getDate() + (lastMonth.getDate() - startDate.getDate());
    }
    
    return {
        years: yearDiff,
        months: monthDiff,
        days: dayDiff,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        totalDays: totalDays
    };
}

// Função para atualizar o contador na página
function updateCounter() {
    const timeDiff = calculateTimeDifference(startDate);
    
    // Atualiza os elementos HTML
    document.getElementById('years').textContent = timeDiff.years;
    document.getElementById('months').textContent = timeDiff.months;
    document.getElementById('days').textContent = timeDiff.days;
    document.getElementById('hours').textContent = timeDiff.hours;
    document.getElementById('minutes').textContent = timeDiff.minutes;
    document.getElementById('seconds').textContent = timeDiff.seconds;
    
    // Atualiza o contador de dias totais se existir
    const totalDaysElement = document.getElementById('totalDays');
    if (totalDaysElement) {
        totalDaysElement.textContent = timeDiff.totalDays;
    }
}

// Função para criar corações flutuantes
function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Posição aleatória na largura da tela
    const left = Math.random() * 100;
    heart.style.left = left + '%';
    heart.style.bottom = '0';
    
    // Tamanho aleatório
    const size = Math.random() * 20 + 10;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    
    // Cor aleatória (tons de rosa/vermelho)
    const colors = ['#ff4081', '#e91e63', '#d81b60', '#c2185b', '#ad1457'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.backgroundColor = color;
    heart.style.setProperty('--heart-color', color);
    
    // Duração aleatória da animação
    const duration = Math.random() * 4 + 3;
    heart.style.animation = `float ${duration}s ease-in-out infinite`;
    
    heartsContainer.appendChild(heart);
    
    // Remove o coração após a animação
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Inicializa as funções quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o contador a cada segundo
    setInterval(updateCounter, 1000);
    updateCounter(); // Executa imediatamente
    
    // Cria corações a cada 300ms
    setInterval(createHearts, 300);
});