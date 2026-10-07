/**
 * Shine & Smilez Care — Interactive Script
 * Production-ready vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Clinic Configurations (Centralized & Demo-ready)
  const CLINIC_CONFIG = {
    name: 'Shine & Smilez Care',
    marathiName: 'शाइन & स्माइलेज केयर',
    phoneDisplay: '079779 23031',
    phoneTel: '+917977923031',
    // WhatsApp configuration (Indian country code 91 prefix)
    whatsappPhone: '917977923031',
    whatsappMessage: 'Hello Shine & Smilez Care, I would like to book a dental consultation. Please share the available appointment slots.',
    address: 'Lodha Supremus, 203 A, New Cuff Parade, Opp. Wadala Truck Terminus, Sion, Mumbai, Maharashtra 400037',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Shine+and+Smilez+Care+Lodha+Supremus+Wadala+Mumbai'
  };

  // 2. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNavPanel = document.querySelector('.mobile-nav-panel');

  if (mobileToggle && mobileNavPanel) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNavPanel.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when clicking any link
    mobileNavPanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavPanel.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 4. WhatsApp Links Configuration
  const whatsappButtons = document.querySelectorAll('.js-whatsapp-link');
  const encodedWaMsg = encodeURIComponent(CLINIC_CONFIG.whatsappMessage);
  const waUrl = `https://wa.me/${CLINIC_CONFIG.whatsappPhone}?text=${encodedWaMsg}`;
  
  whatsappButtons.forEach(btn => {
    btn.setAttribute('href', waUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // 5. FAQ Accordion Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const body = item.querySelector('.faq-body');

    if (trigger && body) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close other items for neat accordion behavior
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            otherItem.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 6. Gallery Filtering
  const filterTabs = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');

      filterTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 7. Lightbox Modal
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  const openLightbox = (src, caption) => {
    if (!lightboxModal || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = caption || 'Dental Clinic Photo';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightboxModal.classList.add('is-active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || img?.alt;
      if (img) openLightbox(img.src, title);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // 8. Treatment Details Modal
  const TREATMENT_DATA = {
    'implants': {
      title: 'Dental Implants',
      desc: 'Dental implants are artificial tooth roots placed into the jaw to hold a replacement tooth or bridge. They provide a sturdy, long-term foundation for patients looking to replace one or more missing teeth.',
      consultation: 'During your consultation at Shine & Smilez Care, Dr. Sudhanshu Joshi and our clinical team evaluate bone density, bite alignment, and overall oral health before designing an individualized treatment approach.'
    },
    'aligners': {
      title: 'Clear Aligners',
      desc: 'Clear aligners are custom-crafted transparent plastic trays designed to gradually shift teeth into their desired positions. They offer a discreet and removable alternative to traditional braces.',
      consultation: 'We assess teeth crowding, spacing, and bite alignment to determine if clear aligners are the appropriate solution for your dental goals.'
    },
    'braces': {
      title: 'Orthodontic Braces',
      desc: 'Traditional and ceramic braces utilize brackets and archwires to correct complex teeth misalignments, spacing issues, and jaw discrepancies with reliable precision.',
      consultation: 'Our clinical team conducts comprehensive photographic and radiographic diagnostics to chart out an effective alignment timeline.'
    },
    'rct': {
      title: 'Root Canal Treatment (RCT)',
      desc: 'Root canal treatment is performed to save a severely damaged or infected tooth by carefully cleaning and sealing the interior pulp chamber and root canals.',
      consultation: 'Dr. Richa Joshi and Dr. Sudhanshu Joshi explain each phase of the procedure in detail, ensuring complete patient comfort and relief from tooth pain.'
    },
    'wisdom': {
      title: 'Wisdom Tooth Extraction',
      desc: 'Surgical or non-surgical removal of impacted, painful, or misaligned third molars to prevent infection, cyst formation, and damage to neighboring teeth.',
      consultation: 'Led by Oral & Maxillofacial Surgeon Dr. Sudhanshu Joshi, procedures are planned with advanced diagnostics to ensure smooth, calm surgical care and clear post-op guidance.'
    },
    'surgery': {
      title: 'Oral & Maxillofacial Surgery',
      desc: 'Specialized surgical management of conditions, injuries, and defects involving the jaws, facial structures, oral tissues, and complex dental impactions.',
      consultation: 'Surgeries are performed following thorough clinical evaluation in a modern, hygienic clinical environment at Lodha Supremus, Wadala.'
    },
    'cosmetic': {
      title: 'Cosmetic Dentistry',
      desc: 'A range of aesthetic dental treatments including tooth bonding, porcelain veneers, enamel recontouring, and professional teeth brightening tailored to your natural smile.',
      consultation: 'We focus on conservative aesthetic enhancements that respect the long-term health and functional integrity of your natural dentition.'
    },
    'pediatric': {
      title: 'Pediatric Dentistry',
      desc: 'Gentle, attentive dental examinations, preventive fluorides, pit & fissure sealants, and cavity treatments designed specifically for children and teenagers.',
      consultation: 'Our team maintains a calm, friendly atmosphere to help young patients build positive lifelong dental habits without fear.'
    },
    'snoring': {
      title: 'Snoring & Sleep Solutions',
      desc: 'Custom oral appliances designed to help maintain an open airway during sleep, offering comfort for patients experiencing mild to moderate obstructive snoring.',
      consultation: 'A comprehensive oral airway examination helps determine whether a dental sleep appliance is suitable in coordination with your sleep specialist.'
    }
  };

  const treatmentModal = document.getElementById('treatment-modal');
  const treatmentModalTitle = document.getElementById('treatment-modal-title');
  const treatmentModalDesc = document.getElementById('treatment-modal-desc');
  const treatmentModalConsult = document.getElementById('treatment-modal-consult');
  const treatmentModalClose = document.getElementById('treatment-modal-close');
  const treatmentModalBookBtn = document.getElementById('treatment-modal-book-btn');

  const openTreatmentModal = (treatmentKey) => {
    const data = TREATMENT_DATA[treatmentKey];
    if (!data || !treatmentModal) return;

    if (treatmentModalTitle) treatmentModalTitle.textContent = data.title;
    if (treatmentModalDesc) treatmentModalDesc.textContent = data.desc;
    if (treatmentModalConsult) treatmentModalConsult.textContent = data.consultation;

    if (treatmentModalBookBtn) {
      treatmentModalBookBtn.onclick = () => {
        closeTreatmentModal();
        const appointmentSection = document.getElementById('appointment');
        const treatmentSelect = document.getElementById('treatment-select');
        if (treatmentSelect) {
          // match dropdown value
          for (let opt of treatmentSelect.options) {
            if (opt.text.toLowerCase().includes(data.title.toLowerCase().split(' ')[0])) {
              treatmentSelect.value = opt.value;
              break;
            }
          }
        }
        appointmentSection?.scrollIntoView({ behavior: 'smooth' });
      };
    }

    treatmentModal.classList.add('is-active');
    treatmentModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeTreatmentModal = () => {
    if (!treatmentModal) return;
    treatmentModal.classList.remove('is-active');
    treatmentModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-open-treatment').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-treatment');
      if (key) openTreatmentModal(key);
    });
  });

  treatmentModalClose?.addEventListener('click', closeTreatmentModal);
  treatmentModal?.addEventListener('click', (e) => {
    if (e.target === treatmentModal) {
      closeTreatmentModal();
    }
  });

  // Global Esc key to close any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeTreatmentModal();
    }
  });

  // 9. Appointment Form Validation & Demo Submission
  const appointmentForms = document.querySelectorAll('.js-appointment-form');

  appointmentForms.forEach(form => {
    const feedbackBox = form.querySelector('.form-feedback') || form.parentElement?.querySelector('.form-feedback');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic client-side validation
      const nameInput = form.querySelector('input[name="full_name"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      const dateInput = form.querySelector('input[name="preferred_date"]');
      const timeSelect = form.querySelector('select[name="preferred_time"]');
      const treatmentSelect = form.querySelector('select[name="treatment"]');

      const nameVal = nameInput?.value.trim();
      const phoneVal = phoneInput?.value.trim();

      if (!nameVal || nameVal.length < 2) {
        showFeedback(feedbackBox, 'Please enter your full name.', 'error');
        nameInput?.focus();
        return;
      }

      // Check phone: at least 10 digits
      const cleanedPhone = phoneVal ? phoneVal.replace(/[^0-9]/g, '') : '';
      if (!cleanedPhone || cleanedPhone.length < 10) {
        showFeedback(feedbackBox, 'Please enter a valid 10-digit mobile phone number.', 'error');
        phoneInput?.focus();
        return;
      }

      // Submission simulation
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Submitting Request...</span>';

        setTimeout(() => {
          showFeedback(feedbackBox, 'Thank you! Your appointment request has been received. Our team will contact you shortly.', 'success');
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 600);
      }
    });
  });

  function showFeedback(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = `form-feedback is-${type}`;
    element.style.display = 'block';

    if (type === 'success') {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // Set min date for appointment picker to today
  const datePickers = document.querySelectorAll('input[type="date"]');
  const todayIso = new Date().toISOString().split('T')[0];
  datePickers.forEach(input => {
    input.setAttribute('min', todayIso);
  });
});
