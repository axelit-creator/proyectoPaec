window.addEventListener('scroll', () => {
  const card = document.querySelector('.card');
  const charts = document.querySelector('.charts-section');

  if (window.scrollY > 150) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(-50px)';
    charts.classList.add('visible');
  } else {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    charts.classList.remove('visible');
  }
});
