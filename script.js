document.addEventListener("DOMContentLoaded", () => {
 // 1. 3D-анимация при наведении (Tilt effect)
 const cards = document.querySelectorAll('.tilt-card');

 cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
   const rect = card.getBoundingClientRect();
   const x = e.clientX - rect.left;
   const y = e.clientY - rect.top;
   const centerX = rect.width / 2;
   const centerY = rect.height / 2;
   
   const rotateX = ((y - centerY) / centerY) * -8;
   const rotateY = ((x - centerX) / centerX) * 8;
   
   card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
   card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
   card.style.transition = "transform 0.5s ease";
  });
  
  card.addEventListener('mouseenter', () => {
   card.style.transition = "none";
  });
 });

 // 2. Анимация печатающегося хакерского текста для описаний
 const decodeElements = document.querySelectorAll('.decode-text');
 const charset = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789!@#$*";

 const decodeText = (element) => {
  const targetText = element.getAttribute('data-target');
  let iteration = 0;
  
  const interval = setInterval(() => {
   element.innerText = targetText
    .split("")
    .map((letter, index) => {
     if(index < iteration) return targetText[index];
     return charset[Math.floor(Math.random() * charset.length)];
    })
    .join("");
   
   if(iteration >= targetText.length) clearInterval(interval);
   iteration += 1 / 2; // Скорость появления букв
  }, 25);
 };

 // Текст декодируется, когда карточка появляется при прокрутке
 const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    decodeText(entry.target);
    observer.unobserve(entry.target);
   }
  });
 }, { threshold: 0.2 });

 decodeElements.forEach(el => observer.observe(el));
});
