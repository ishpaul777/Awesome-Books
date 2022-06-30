// Event: Navigations
const showList = document.querySelector('.collection');

const addMore = document.querySelectorAll('.add-more');

const contact = document.querySelector('.contact');

showList.addEventListener('click', () => {
  document.querySelector('.book-table').classList.add('active');
  document.querySelector('.input-books').classList.remove('active');
  document.querySelector('.contact-info').classList.remove('active');
  showList.classList.add('active');
  document.querySelector('.add-more').classList.remove('active');
  contact.classList.remove('active');
  document.querySelector('.heading').innerHTML = 'Your <span class="highlight">Collection</span>';
});

addMore.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.input-books').classList.add('active');
    document.querySelector('.book-table').classList.remove('active');
    document.querySelector('.contact-info').classList.remove('active');
    document.querySelector('.add-more').classList.add('active');
    showList.classList.remove('active');
    contact.classList.remove('active');
    document.querySelector('.heading').innerHTML = 'Add a <span class="highlight">Book</span>';
  });
});

contact.addEventListener('click', () => {
  document.querySelector('.contact-info').classList.add('active');
  document.querySelector('.book-table').classList.remove('active');
  document.querySelector('.input-books').classList.remove('active');
  contact.classList.add('active');
  showList.classList.remove('active');
  document.querySelector('.add-more').classList.remove('active');
  document.querySelector('.heading').innerHTML = 'Contact<span class="highlight">Me</span>';
});
