/* ================================================
   ORIIFACE DENTAL - MAIN JS
   Navigation, scroll, lightbox, form, timeline
   ================================================ */

(function () {
  'use strict';

  // --- DOM Elements ---
  var header = document.getElementById('header');
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileLinks = document.querySelectorAll('.mobile-nav__link');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');
  var galleryImages = document.querySelectorAll('[data-lightbox]');
  var contactForm = document.getElementById('contact-form');
  var timelineItems = document.querySelectorAll('.timeline__item[data-animate]');

  // --- Header scroll shadow ---
  var lastScroll = 0;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (y > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Hamburger menu ---
  function toggleMobileNav() {
    var isOpen = mobileNav.classList.contains('mobile-nav--open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  function openMobileNav() {
    mobileNav.classList.add('mobile-nav--open');
    hamburger.classList.add('hamburger--active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('mobile-nav--open');
    hamburger.classList.remove('hamburger--active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMobileNav);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileNav();
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Lightbox ---
  galleryImages.forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.add('lightbox--open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileNav();
    }
  });

  // --- Contact form ---
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('form-name').value.trim();
    var phone = document.getElementById('form-phone').value.trim();
    var service = document.getElementById('form-service').value;

    if (!name || !phone || !service) {
      return;
    }

    // Build WhatsApp message
    var time = document.getElementById('form-time').value.trim();
    var message = 'Hi, I would like to book an appointment at Oriiface Dental Care.\n\n';
    message += 'Name: ' + name + '\n';
    message += 'Phone: ' + phone + '\n';
    message += 'Service: ' + document.getElementById('form-service').selectedOptions[0].text + '\n';
    if (time) {
      message += 'Preferred Time: ' + time + '\n';
    }

    var whatsappUrl = 'https://wa.me/919540670276?text=' + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank');

    // Show thank you
    var formEl = this;
    formEl.innerHTML = '<div style="text-align:center;padding:2rem 0"><h3 style="font-family:var(--font-heading);margin-bottom:0.5rem;color:var(--color-primary)">Request Sent</h3><p style="color:var(--color-text-light)">We will get back to you shortly. You can also reach us at 095406 70276.</p></div>';
  });

  // --- Scroll reveal animations ---
  function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    var windowHeight = window.innerHeight;

    reveals.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      var triggerPoint = windowHeight - 80;
      if (top < triggerPoint) {
        el.classList.add('revealed');
      }
    });

    // Timeline items
    timelineItems.forEach(function (item, index) {
      var top = item.getBoundingClientRect().top;
      var triggerPoint = windowHeight - 60;
      if (top < triggerPoint) {
        setTimeout(function () {
          item.classList.add('animate-in');
        }, index * 150);
      }
    });
  }

  // Add reveal class to sections
  var revealSections = document.querySelectorAll(
    '.about__grid, .credentials, .timeline, ' +
    '.service-card, ' +
    '.why-card, ' +
    '.review-card, ' +
    '.gallery__item, ' +
    '.contact__grid'
  );

  revealSections.forEach(function (el) {
    el.classList.add('reveal');
  });

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  // Trigger once on load
  setTimeout(revealOnScroll, 100);

  // --- Active nav link highlighting (Multi-page) ---
  var navLinks = document.querySelectorAll('.nav__link');
  var currentPath = window.location.pathname;
  var currentPage = currentPath.split("/").pop();
  if (currentPage === "" || currentPage === "/" || currentPage === "index.html") {
    currentPage = "index.html";
  }

  navLinks.forEach(function (link) {
    link.classList.remove('nav__link--active');
    var linkHref = link.getAttribute('href');
    
    // Exact match for most pages, or if we are on index handling the anchor links
    if (linkHref === currentPage || (currentPage === "index.html" && linkHref.startsWith("index.html"))) {
      link.classList.add('nav__link--active');
    }
  });
})();
