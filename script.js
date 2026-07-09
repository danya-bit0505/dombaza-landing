// Данные по зонам доставки
var zones = [
  { name: 'Москва и область', price: '300 ₽', days: '1–2 дня' },
  { name: 'Санкт-Петербург',   price: '500 ₽', days: '2–3 дня' },
  { name: 'Остальная Россия',  price: 'от 700 ₽', days: '3–7 дней' }
];

var stops = document.querySelectorAll('.tape-stop');
var zoneName = document.getElementById('zoneName');
var zonePrice = document.getElementById('zonePrice');
var zoneDays = document.getElementById('zoneDays');

function selectZone(index){
  var zone = zones[index];
  zoneName.textContent = zone.name;
  zonePrice.textContent = zone.price;
  zoneDays.textContent = zone.days;
  stops.forEach(function(btn){
    btn.setAttribute('aria-pressed', btn.dataset.zone === String(index) ? 'true' : 'false');
  });
}

stops.forEach(function(btn){
  btn.addEventListener('click', function(){ selectZone(Number(btn.dataset.zone)); });
});
selectZone(0);

// Форма — только мокап-подтверждение, никакие данные никуда не отправляются.
// Реальную доставку заявок (email/Telegram/CRM) нужно подключать отдельно.
var form = document.getElementById('orderForm');
var confirmPanel = document.getElementById('orderConfirm');
form.addEventListener('submit', function(e){
  e.preventDefault();
  if (!form.checkValidity()){
    form.reportValidity();
    return;
  }
  form.style.display = 'none';
  confirmPanel.classList.add('is-visible');
  confirmPanel.setAttribute('tabindex', '-1');
  confirmPanel.focus();
});

// Плавное появление секций при скролле
var revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function(el){ io.observe(el); });
} else {
  revealEls.forEach(function(el){ el.classList.add('is-visible'); });
}
