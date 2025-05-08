// Arquivo para controlar o carrossel de imagens de fundo

document.addEventListener('DOMContentLoaded', function() {
    // Array com os caminhos das imagens para o carrossel
    const backgroundImages = [
        'foto1.jpg',
        'foto2.jpg',
        'foto3.jpg',
        'foto4.jpg',
        'foto5.jpg',
        'foto6.jpg',
        'ultrassom.jpg'
    ];
    
    // Índice da imagem atual
    let currentImageIndex = 0;
    
    // Tempo de transição em milissegundos (3 segundos)
    const transitionTime = 3000;
    
    // Criar elementos para o carrossel
    function setupCarousel() {
        // Criar o contêiner do carrossel
        const carouselContainer = document.createElement('div');
        carouselContainer.id = 'background-carousel';
        carouselContainer.style.position = 'fixed';
        carouselContainer.style.top = '0';
        carouselContainer.style.left = '0';
        carouselContainer.style.width = '100%';
        carouselContainer.style.height = '100%';
        carouselContainer.style.zIndex = '-10';
        carouselContainer.style.overflow = 'hidden';
        
        // Criar os dois elementos de imagem para fazer a transição suave
        for (let i = 0; i < 2; i++) {
            const imgElement = document.createElement('div');
            imgElement.className = 'carousel-image';
            imgElement.style.position = 'absolute';
            imgElement.style.top = '0';
            imgElement.style.left = '0';
            imgElement.style.width = '100%';
            imgElement.style.height = '100%';
            imgElement.style.backgroundSize = 'cover';
            imgElement.style.backgroundPosition = 'center';
            imgElement.style.backgroundRepeat = 'no-repeat';
            imgElement.style.transition = 'opacity 1s ease-in-out';
            imgElement.style.opacity = i === 0 ? '1' : '0';
            
            carouselContainer.appendChild(imgElement);
        }
        
        // Adicionar o carrossel ao body antes de qualquer outro conteúdo
        document.body.insertBefore(carouselContainer, document.body.firstChild);
        
        // Inicializar as imagens
        const images = document.querySelectorAll('.carousel-image');
        images[0].style.backgroundImage = `url('${backgroundImages[0]}')`;
        images[1].style.backgroundImage = `url('${backgroundImages[1]}')`;
        
        // Iniciar o carrossel
        startCarousel();
    }
    
    // Função para alternar entre as imagens
    function startCarousel() {
        const images = document.querySelectorAll('.carousel-image');
        
        setInterval(() => {
            // Determinar qual imagem está visível e qual está oculta
            const visibleIndex = images[0].style.opacity === '1' ? 0 : 1;
            const hiddenIndex = visibleIndex === 0 ? 1 : 0;
            
            // Avançar para a próxima imagem no array
            currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
            
            // Atualizar a imagem oculta com a próxima do carrossel
            images[hiddenIndex].style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
            
            // Fazer a transição de opacidade
            images[visibleIndex].style.opacity = '0';
            images[hiddenIndex].style.opacity = '1';
        }, transitionTime);
    }
    
    // Inicializar o carrossel
    setupCarousel();
});
