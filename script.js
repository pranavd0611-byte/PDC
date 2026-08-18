document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a, .hub-card, .back-to-hub');
    const tabContents = document.querySelectorAll('.tab-content');

    const switchTab = (targetId) => {
        // Remove active class from main/dropdown links
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active-tab'));

        // Target corresponding nav element if it exists
        const targetLink = document.querySelector(`.nav-links a[data-tab="${targetId}"]`);
        const targetContent = document.getElementById(targetId);

        if (targetLink) {
            targetLink.classList.add('active');
        } else {
            // If sub-page is accessed from hub, optionally highlight the parent dropdown button
            const parentDropdown = document.querySelector('.dropbtn');
            if (parentDropdown) parentDropdown.classList.add('active');
        }

        if (targetContent) {
            targetContent.classList.add('active-tab');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-tab') || link.getAttribute('data-target');
            if (targetId) {
                switchTab(targetId);
                history.pushState(null, '', `#${targetId}`);
            }
        });
    });

    // Check for hash on initial page load
    if (window.location.hash) {
        const initialTab = window.location.hash.substring(1);
        switchTab(initialTab);
    }
});
