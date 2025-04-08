window.addEventListener('scroll', function() {
    const element = document.querySelector('.car>h2');
    const position = element.getBoundingClientRect(); 
  
    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add('visible'); 
    } 
  });
  

const element = document.querySelector('.boll>h2');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); 
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.5  
});

observer.observe(element);

  
  