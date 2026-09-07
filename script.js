(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('#theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeButton) {
      themeButton.textContent = theme === 'dark' ? '☀' : '◐';
      themeButton.setAttribute('aria-label', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
    }
  };

  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });

  const buttons = [...document.querySelectorAll('.filter')];
  const cards = [...document.querySelectorAll('.project-card')];

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => item.classList.toggle('is-active', item === button));

      cards.forEach((card) => {
        const categories = (card.dataset.category || '').split(' ');
        const visible = filter === 'all' || categories.includes(filter);
        card.classList.toggle('is-hidden', !visible);
      });
    });
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
