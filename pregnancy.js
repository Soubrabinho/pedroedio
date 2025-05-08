// Arquivo para controlar o contador de gravidez

// Função para configurar datas importantes
function setDate(year, month, day, hour = 0, minute = 0, second = 0) {
    // Mês em JavaScript é baseado em zero (0-11)
    const adjustedMonth = month - 1;
    return new Date(year, adjustedMonth, day, hour, minute, second);
}

// Data do primeiro encontro: 05/01/2025
const firstMeetDate = setDate(2025, 1, 5);

// Data de início da gravidez: 19/02/2025 (calculada para que complete 12 semanas em 13/05/2025)
const pregnancyStartDate = setDate(2025, 2, 19);

// Data de 12 semanas: 13/05/2025
const twelveWeeksDate = setDate(2025, 5, 13);

// Calcular data prevista de nascimento (aproximadamente 40 semanas após concepção)
function calculateDueDate(startDate) {
    const dueDate = new Date(startDate);
    dueDate.setDate(startDate.getDate() + 280); // 40 semanas = 280 dias
    return dueDate;
}

const dueDate = calculateDueDate(pregnancyStartDate);

// Função para calcular a diferença de tempo da gravidez
function calculatePregnancyTime() {
    const now = new Date();
    const diff = now - pregnancyStartDate;
    
    // Cálculos básicos
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    
    // Cálculo de dias e semanas
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.floor(diff / millisecondsPerDay);
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    
    return {
        weeks: weeks,
        days: remainingDays,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        totalDays: totalDays
    };
}

// Função para formatar a data em formato brasileiro
function formatDateBR(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para atualizar o contador de gravidez na página
function updatePregnancyCounter() {
    const pregnancyTime = calculatePregnancyTime();
    
    // Atualiza os elementos HTML
    document.getElementById('pregnancy-weeks').textContent = pregnancyTime.weeks;
    document.getElementById('pregnancy-days').textContent = pregnancyTime.days;
    document.getElementById('pregnancy-hours').textContent = pregnancyTime.hours;
    document.getElementById('pregnancy-minutes').textContent = pregnancyTime.minutes;
    document.getElementById('pregnancy-seconds').textContent = pregnancyTime.seconds;
    
    // Atualiza a data prevista de nascimento
    document.getElementById('due-date').textContent = formatDateBR(dueDate);
}

// Inicializa as funções quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o contador a cada segundo
    setInterval(updatePregnancyCounter, 1000);
    updatePregnancyCounter(); // Executa imediatamente
    
    // Preenche as datas importantes
    document.getElementById('first-meet-date').textContent = formatDateBR(firstMeetDate);
    document.getElementById('pregnancy-start-date').textContent = formatDateBR(pregnancyStartDate);
});
