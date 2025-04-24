document.addEventListener('DOMContentLoaded', function () {
    // ===================== //
    // 1. BOTÃO "VOLTAR AO TOPO"
    // ===================== //
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        backToTopButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===================== //
    // 2. SCROLL SUAVE NOS LINKS
    // ===================== //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ===================== //
    // 3. FECHAR MENU MOBILE AO CLICAR
    // ===================== //
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).toggle();
            }
        });
    });

    // ===================== //
    // 4. PLAYER DE MÚSICA SIMPLES
    // ===================== //
    const playButton = document.querySelector('.player-controls .btn-ldr');
    const progressBar = document.querySelector('.progress-bar');
    let progressInterval;

    if (playButton) {
        playButton.addEventListener('click', function () {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-play')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                simulateProgress();
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                clearInterval(progressInterval);
            }
        });
    }

    function simulateProgress() {
        let width = parseInt(progressBar.style.width) || 0;
        progressInterval = setInterval(() => {
            if (width >= 100) {
                clearInterval(progressInterval);
                playButton.querySelector('i').classList.remove('fa-pause');
                playButton.querySelector('i').classList.add('fa-play');
                width = 0;
            } else {
                width += 1;
                progressBar.style.width = width + '%';
            }
        }, 200);
    }

    // ===================== //
    // 5. ANIMAÇÃO AO ROLAR PARA ELEMENTOS
    // ===================== //
    const revealElements = document.querySelectorAll('.section-title, .lyric-card, .gallery-item, .album-card');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ===================== //
    // 6. TEMA SALVO COM LOCALSTORAGE
    // ===================== //
    const themeToggle = document.getElementById('themeToggle'); // Crie um botão com esse ID

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('ldr-theme');
            localStorage.setItem('ldr-theme', document.body.classList.contains('ldr-theme') ? 'on' : 'off');
        });
    }

    if (localStorage.getItem('ldr-theme') === 'off') {
        document.body.classList.remove('ldr-theme');
    }
});
