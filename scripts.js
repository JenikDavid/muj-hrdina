const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = navMenu?.querySelectorAll('a') ?? [];

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!expanded));
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuBtn?.setAttribute('aria-expanded', 'false');
    });
});

document.addEventListener('click', event => {
    if (navMenu && menuBtn && !navMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        navMenu.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
});

function loadJsonLd(url) {
    fetch(url)
        .then(response => response.text())
        .then(json => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = json;
            document.head.appendChild(script);
        })
        .catch(() => {
            // JSON-LD metadata nebylo možné načíst.
        });
}

loadJsonLd('schema.jsonld');
