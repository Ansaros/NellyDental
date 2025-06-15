document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const menuToggle = document.getElementById("menuToggle")
  const body = document.body

  if (menuToggle) {
    // Create mobile nav element
    const mobileNav = document.createElement("div")
    mobileNav.className = "mobile-nav"

    // Get current page path
    const currentPath = window.location.pathname
    const isServicesPage = currentPath.includes("uslugi.html")
    const isPricesPage = currentPath.includes("ceny.html")
    const isCasesPage = currentPath.includes("keysy.html")
    const isDoctorsPage = currentPath.includes("vrachi.html")
    const isContactsPage = currentPath.includes("kontakty.html")
    const isMediaPage = currentPath.includes("media.html")

    mobileNav.innerHTML = `
            <button class="close-menu">&times;</button>
            <ul>
                <li><a href="uslugi.html" ${isServicesPage ? 'class="active"' : ""}>ВСЕ УСЛУГИ</a></li>
                <li><a href="#">СОЗДАНИЕ УЛЫБКИ</a></li>
                <li><a href="ceny.html" ${isPricesPage ? 'class="active"' : ""}>ЦЕНЫ</a></li>
                <li><a href="keysy.html" ${isCasesPage ? 'class="active"' : ""}>КЕЙСЫ</a></li>
                <li><a href="vrachi.html" ${isDoctorsPage ? 'class="active"' : ""}>ВРАЧИ</a></li>
                <li><a href="kontakty.html" ${isContactsPage ? 'class="active"' : ""}>КОНТАКТЫ</a></li>
                <li><a href="media.html" ${isMediaPage ? 'class="active"' : ""}>МЕДИА</a></li>
            </ul>
        `

    // Create overlay
    const overlay = document.createElement("div")
    overlay.className = "overlay"

    // Append to body
    body.appendChild(mobileNav)
    body.appendChild(overlay)

    // Toggle menu
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.add("active")
      overlay.classList.add("active")
      body.style.overflow = "hidden"
    })

    // Close menu
    const closeMenu = mobileNav.querySelector(".close-menu")
    closeMenu.addEventListener("click", () => {
      mobileNav.classList.remove("active")
      overlay.classList.remove("active")
      body.style.overflow = ""
    })

    // Close menu when clicking overlay
    overlay.addEventListener("click", () => {
      mobileNav.classList.remove("active")
      overlay.classList.remove("active")
      body.style.overflow = ""
    })
  }

  // Price tabs functionality (for prices page)
  const priceTabs = document.querySelectorAll(".price-tab")
  const priceTables = document.querySelectorAll(".price-table")

  if (priceTabs.length > 0) {
    priceTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        priceTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        this.classList.add("active")

        // Get category
        const category = this.getAttribute("data-category")

        // Hide all tables
        priceTables.forEach((table) => table.classList.remove("active"))

        // Show selected table
        const targetTable = document.getElementById(category)
        if (targetTable) {
          targetTable.classList.add("active")
        }
      })
    })
  }

  // Cases filter functionality (for cases page)
  const filterBtns = document.querySelectorAll(".filter-btn")
  const caseItems = document.querySelectorAll(".case-item")

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // Get filter
        const filter = this.getAttribute("data-filter")

        // Show/hide case items
        caseItems.forEach((item) => {
          if (filter === "all" || item.getAttribute("data-category").includes(filter)) {
            item.classList.remove("hidden")
          } else {
            item.classList.add("hidden")
          }
        })
      })
    })
  }

  // Before/After comparison slider (for cases page)
  const comparisonSliders = document.querySelectorAll(".comparison-slider")

  comparisonSliders.forEach((slider) => {
    const container = slider.closest(".before-after-container")
    if (!container) return

    const afterImage = container.querySelector(".after-image")
    if (!afterImage) return

    let isDragging = false

    slider.addEventListener("mousedown", (e) => {
      isDragging = true
      e.preventDefault()
    })

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return

      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = (x / rect.width) * 100

      if (percentage >= 0 && percentage <= 100) {
        slider.style.left = percentage + "%"
        afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`
      }
    })

    document.addEventListener("mouseup", () => {
      isDragging = false
    })

    // Touch events for mobile
    slider.addEventListener("touchstart", (e) => {
      isDragging = true
      e.preventDefault()
    })

    document.addEventListener("touchmove", (e) => {
      if (!isDragging) return

      const rect = container.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const percentage = (x / rect.width) * 100

      if (percentage >= 0 && percentage <= 100) {
        slider.style.left = percentage + "%"
        afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`
      }
    })

    document.addEventListener("touchend", () => {
      isDragging = false
    })
  })

  // Doctors filter dropdown (for doctors page)
  const filterDropdown = document.querySelector(".filter-dropdown")
  const filterButton = document.querySelector(".filter-dropdown .filter-btn")
  const dropdownLinks = document.querySelectorAll(".dropdown-content a")
  const doctorCards = document.querySelectorAll(".doctor-card")

  if (filterButton && filterDropdown) {
    filterButton.addEventListener("click", () => {
      filterDropdown.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!filterDropdown.contains(e.target)) {
        filterDropdown.classList.remove("active")
      }
    })

    // Filter doctors by specialization
    dropdownLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        // Update button text
        const buttonText = filterButton.querySelector("span")
        if (buttonText) {
          buttonText.textContent = this.textContent
        }

        // Remove active class from all links
        dropdownLinks.forEach((l) => l.classList.remove("active"))

        // Add active class to clicked link
        this.classList.add("active")

        // Close dropdown
        filterDropdown.classList.remove("active")

        // Get filter
        const filter = this.getAttribute("data-filter")

        // Show/hide doctor cards
        doctorCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-specialization") === filter) {
            card.classList.remove("hidden")
          } else {
            card.classList.add("hidden")
          }
        })
      })
    })
  }

  // Contact form functionality (for contacts page)
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const phone = formData.get("phone")
      const email = formData.get("email")
      const service = formData.get("service")
      const message = formData.get("message")

      // Simple validation
      if (!name || !phone || !service) {
        alert("Пожалуйста, заполните обязательные поля")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector(".submit-btn")
      const originalText = submitBtn.textContent

      submitBtn.textContent = "ОТПРАВЛЯЕМ..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("Спасибо за заявку! Мы свяжемся с вами в ближайшее время.")
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Map controls functionality (for contacts page)
  const mapControls = document.querySelectorAll(".map-control")

  mapControls.forEach((control) => {
    control.addEventListener("click", function () {
      const action = this.classList.contains("zoom-in")
        ? "zoom-in"
        : this.classList.contains("zoom-out")
          ? "zoom-out"
          : "location"

      // Add visual feedback
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)

      // Here you would implement actual map functionality
      console.log("Map action:", action)
    })
  })

  // Media tabs functionality (for media page)
  const mediaTabs = document.querySelectorAll(".media-tab")
  const mediaContents = document.querySelectorAll(".media-content")

  if (mediaTabs.length > 0) {
    mediaTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        mediaTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        this.classList.add("active")

        // Get tab name
        const tabName = this.getAttribute("data-tab")

        // Hide all content
        mediaContents.forEach((content) => content.classList.remove("active"))

        // Show selected content
        const targetContent = document.getElementById(tabName)
        if (targetContent) {
          targetContent.classList.add("active")
        }
      })
    })
  }

  // Video play button functionality (for media page)
  const playButtons = document.querySelectorAll(".play-button")

  playButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "translate(-50%, -50%) scale(0.9)"
      setTimeout(() => {
        this.style.transform = "translate(-50%, -50%) scale(1)"
      }, 150)

      // Here you would implement actual video playback
      console.log("Playing video...")

      // For demo purposes, show an alert
      alert("Видео будет воспроизведено")
    })
  })

  // Hero slider functionality (for main page)
  const heroSlides = document.querySelectorAll(".hero-slide")
  const heroIndicators = document.querySelectorAll(".hero-indicator")
  let currentSlide = 0

  function showSlide(index) {
    // Hide all slides
    heroSlides.forEach((slide) => slide.classList.remove("active"))
    heroIndicators.forEach((indicator) => indicator.classList.remove("active"))

    // Show current slide
    if (heroSlides[index]) {
      heroSlides[index].classList.add("active")
    }
    if (heroIndicators[index]) {
      heroIndicators[index].classList.add("active")
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length
    showSlide(currentSlide)
  }

  // Auto-advance slides
  if (heroSlides.length > 1) {
    setInterval(nextSlide, 5000)

    // Manual navigation
    heroIndicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
      })
    })
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Scroll to top button
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = "↑"
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #A374AA;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
    `

  document.body.appendChild(scrollToTopBtn)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = "1"
      scrollToTopBtn.style.visibility = "visible"
    } else {
      scrollToTopBtn.style.opacity = "0"
      scrollToTopBtn.style.visibility = "hidden"
    }
  })

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Add scroll animation for elements
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(`
            .service-card, 
            .about-content, 
            .tagline h2, 
            .category-card, 
            .price-table, 
            .consultation-card, 
            .case-item, 
            .doctor-card, 
            .feature-item, 
            .publication-item, 
            .media-item, 
            .interview-item, 
            .press-kit-item,
            .hero-content,
            .stats-item,
            .testimonial-item
        `)

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial styles for animation
  const animatedElements = document.querySelectorAll(`
        .service-card, 
        .about-content, 
        .tagline h2, 
        .category-card, 
        .price-table, 
        .consultation-card, 
        .case-item, 
        .doctor-card, 
        .feature-item, 
        .publication-item, 
        .media-item, 
        .interview-item, 
        .press-kit-item,
        .stats-item,
        .testimonial-item
    `)

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)

  // Form validation helper
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  function validatePhone(phone) {
    const re = /^[+]?[0-9\s\-$$$$]{10,}$/
    return re.test(phone)
  }

  // Generic form handler for all forms
  const allForms = document.querySelectorAll("form")

  allForms.forEach((form) => {
    if (form.id === "contactForm") return // Skip contact form as it's handled separately

    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(form)
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]')

      if (submitBtn) {
        const originalText = submitBtn.textContent || submitBtn.value
        submitBtn.textContent = "Отправляем..."
        submitBtn.disabled = true

        // Simulate form submission
        setTimeout(() => {
          alert("Форма отправлена успешно!")
          form.reset()
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }, 1500)
      }
    })
  })

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // Close mobile menu with Escape key
    if (e.key === "Escape") {
      const mobileNav = document.querySelector(".mobile-nav.active")
      const overlay = document.querySelector(".overlay.active")

      if (mobileNav && overlay) {
        mobileNav.classList.remove("active")
        overlay.classList.remove("active")
        body.style.overflow = ""
      }
    }
  })

  // Print styles handler
  window.addEventListener("beforeprint", () => {
    // Hide unnecessary elements when printing
    const elementsToHide = document.querySelectorAll(".mobile-nav, .overlay, .scroll-to-top")
    elementsToHide.forEach((el) => (el.style.display = "none"))
  })

  window.addEventListener("afterprint", () => {
    // Restore elements after printing
    const elementsToShow = document.querySelectorAll(".mobile-nav, .overlay, .scroll-to-top")
    elementsToShow.forEach((el) => (el.style.display = ""))
  })

  // Performance optimization: Debounce scroll events
  let scrollTimeout
  const originalScrollHandler = window.onscroll

  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    scrollTimeout = setTimeout(() => {
      animateOnScroll()
    }, 10)
  })

  // Initialize tooltips (if any)
  const tooltips = document.querySelectorAll("[data-tooltip]")

  tooltips.forEach((tooltip) => {
    tooltip.addEventListener("mouseenter", function () {
      const tooltipText = this.getAttribute("data-tooltip")
      const tooltipElement = document.createElement("div")
      tooltipElement.className = "tooltip"
      tooltipElement.textContent = tooltipText
      tooltipElement.style.cssText = `
                position: absolute;
                background-color: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
            `

      document.body.appendChild(tooltipElement)

      const rect = this.getBoundingClientRect()
      tooltipElement.style.left = rect.left + "px"
      tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 5 + "px"
    })

    tooltip.addEventListener("mouseleave", () => {
      const tooltipElement = document.querySelector(".tooltip")
      if (tooltipElement) {
        tooltipElement.remove()
      }
    })
  })

  console.log("Nelly Dental Clinic website initialized successfully!")
})

// Additional utility functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.backgroundColor = "#10B981"
      break
    case "error":
      notification.style.backgroundColor = "#EF4444"
      break
    case "warning":
      notification.style.backgroundColor = "#F59E0B"
      break
    default:
      notification.style.backgroundColor = "#A374AA"
  }

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1"
    notification.style.transform = "translateX(0)"
  }, 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.opacity = "0"
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

// Cookie consent (if needed)
function initCookieConsent() {
  if (!localStorage.getItem("cookieConsent")) {
    const cookieBanner = document.createElement("div")
    cookieBanner.className = "cookie-banner"
    cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с использованием файлов cookie.</p>
                <button class="cookie-accept">Принять</button>
            </div>
        `
    cookieBanner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #333;
            color: white;
            padding: 20px;
            z-index: 10000;
        `

    document.body.appendChild(cookieBanner)

    cookieBanner.querySelector(".cookie-accept").addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "true")
      cookieBanner.remove()
    })
  }
}

// Initialize cookie consent
// initCookieConsent();
