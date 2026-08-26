/* Pensiunea Prestige — interacțiuni. Vanilla JS, fără dependințe. */
(function () {
  'use strict';

  var PHONE_WA = '40762685300';

  /* ---------------------------------------------------- Meniu mobil --- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        burger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        burger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        burger.focus();
      }
    });
  }

  /* ------------------------------------------------ Reveal la scroll --- */
  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* ------------------------------------ Formular -> mesaj WhatsApp --- */
  var form = document.querySelector('[data-wa-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var get = function (name) {
        var el = form.elements[name];
        return el && el.value ? el.value.trim() : '';
      };

      var nume     = get('nume');
      var tip      = get('tip');
      var persoane = get('persoane');
      var checkin  = get('checkin');
      var checkout = get('checkout');
      var mesaj    = get('mesaj');

      var linii = ['Bună ziua! Aș dori o ofertă de cazare la Pensiunea Prestige.'];
      linii.push('');
      if (nume)     linii.push('Nume: ' + nume);
      if (tip)      linii.push('Tip cazare: ' + tip);
      if (persoane) linii.push('Număr persoane: ' + persoane);
      if (checkin)  linii.push('Check-in: ' + formatDate(checkin));
      if (checkout) linii.push('Check-out: ' + formatDate(checkout));
      if (mesaj) {
        linii.push('');
        linii.push('Detalii: ' + mesaj);
      }
      linii.push('');
      linii.push('Vă mulțumesc!');

      var url = 'https://wa.me/' + PHONE_WA + '?text=' +
                encodeURIComponent(linii.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }

  function formatDate(iso) {
    var parts = iso.split('-');
    if (parts.length !== 3) { return iso; }
    return parts[2] + '.' + parts[1] + '.' + parts[0];
  }

  /* ------------------------------------------- Galerie: filtre + box --- */
  var gallery = document.querySelector('[data-gallery]');
  if (!gallery) { return; }

  var items = Array.prototype.slice.call(gallery.querySelectorAll('.gallery__item'));
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('.filter-btn'));

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.dataset.filter;
      filterBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      items.forEach(function (item) {
        item.hidden = !(filter === 'toate' || item.dataset.cat === filter);
      });
    });
  });

  /* Lightbox */
  var lb = document.querySelector('[data-lightbox]');
  if (!lb) { return; }

  var lbImg     = lb.querySelector('img');
  var lbCaption = lb.querySelector('figcaption');
  var btnPrev   = lb.querySelector('.lightbox__prev');
  var btnNext   = lb.querySelector('.lightbox__next');
  var btnClose  = lb.querySelector('.lightbox__close');
  var current   = 0;
  var lastFocus = null;

  function visibleItems() {
    return items.filter(function (i) { return !i.hidden; });
  }

  function show(index) {
    var list = visibleItems();
    if (!list.length) { return; }
    current = (index + list.length) % list.length;
    var item = list[current];
    var img = item.querySelector('img');
    lbImg.src = img.dataset.full || img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = item.querySelector('figcaption').textContent;
  }

  function open(item) {
    lastFocus = document.activeElement;
    show(visibleItems().indexOf(item));
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) { lastFocus.focus(); }
  }

  items.forEach(function (item) {
    item.addEventListener('click', function () { open(item); });
  });

  btnPrev.addEventListener('click', function () { show(current - 1); });
  btnNext.addEventListener('click', function () { show(current + 1); });
  btnClose.addEventListener('click', close);

  lb.addEventListener('click', function (e) {
    if (e.target === lb) { close(); }
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) { return; }
    if (e.key === 'Escape')     { close(); }
    if (e.key === 'ArrowLeft')  { show(current - 1); }
    if (e.key === 'ArrowRight') { show(current + 1); }
    if (e.key === 'Tab') {
      /* focus trap: ținem tab-ul între cele trei butoane */
      var focusable = [btnClose, btnPrev, btnNext];
      var idx = focusable.indexOf(document.activeElement);
      e.preventDefault();
      var next = e.shiftKey ? idx - 1 : idx + 1;
      focusable[(next + focusable.length) % focusable.length].focus();
    }
  });
})();
