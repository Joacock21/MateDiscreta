
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particlesArray = [];
    const num = 85;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }

        draw() {
            ctx.fillStyle = `rgba(99,102,241,${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < num; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
}


function revealTitle() {
    const title = document.getElementById('mainTitle');
    if (title) title.style.animation = 'titleFadeIn 1.2s ease-out forwards';
}

const style = document.createElement('style');
style.textContent = `@keyframes titleFadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);


window.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Aplicación iniciada');

    
    initializeVariables();
    loadInfoGeneral();
    loadProfesor();
    loadStudents();

    
    console.log('⏳ Importando datos del Google Sheet...');
    importarDesdeGoogleSheets(GOOGLE_SHEET_URL);

    showSection('variables');
    setTimeout(revealTitle, 100);

    const subtitle = document.querySelector('.subtitle');
    if (subtitle) subtitle.style.animation = 'fadeIn 1s ease-out 0.5s forwards';
});


document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        switch (e.key) {
            case '1': showSection('variables'); break;
            case '2': showSection('plano'); break;
            case '3': showSection('modelos'); break;
            case '4': showSection('datos'); break;
            case '5': showSection('bibliografia'); break;
        }
    }
});


function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; 
        top: 20px; 
        right: 20px; 
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#f59e0b'};
        color: white; 
        border-radius: 10px; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000; 
        animation: slideInRight 0.3s ease; 
        font-weight: 500;
        max-width: 400px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

const notifStyle = document.createElement('style');
notifStyle.textContent = `
    @keyframes slideInRight { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
`;
document.head.appendChild(notifStyle);


window.copyToClipboard = function (text) {
    navigator.clipboard.writeText(text).then(() => showNotification('✅ Copiado'));
};

window.printPage = function () {
    window.print();
};

window.resetApp = function () {
    if (confirm('⚠️ ¿Resetear todo? Esta acción es irreversible.')) {
        localStorage.clear();
        location.reload();
    }
};