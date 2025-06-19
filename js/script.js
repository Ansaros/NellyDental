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

document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 1
  let selectedService = null
  let selectedPrice = 0
  let quantity = 1

  // Calculator functionality
  function initCalculator() {
    // Service selection
    const serviceOptions = document.querySelectorAll(".service-option")
    serviceOptions.forEach((option) => {
      option.addEventListener("click", function () {
        serviceOptions.forEach((opt) => opt.classList.remove("selected"))
        this.classList.add("selected")
        selectedService = this.dataset.service
        selectedPrice = Number.parseInt(this.dataset.price)

        const nextBtn = document.querySelector(".nav-btn.next")
        nextBtn.disabled = false
      })
    })
  }

  // Quantity control
  window.changeQuantity = (delta) => {
    const quantityInput = document.getElementById("quantity")
    const newValue = quantity + delta

    if (newValue >= 1 && newValue <= 32) {
      quantity = newValue
      quantityInput.value = quantity
      updateCalculation()
    }
  }

  // Update calculation
  function updateCalculation() {
    const total = selectedPrice * quantity
    const fullPayment = Math.round(total * 0.95) // 5% discount
    const installment = Math.round(total / 6)

    document.getElementById("totalAmount").textContent = total.toLocaleString()
    document.getElementById("fullPayment").textContent = fullPayment.toLocaleString() + " ₸"
    document.getElementById("installment").textContent = installment.toLocaleString() + " ₸/мес"
  }

  // Step navigation
  window.nextStep = () => {
    if (currentStep < 3) {
      document.getElementById(`step${currentStep}`).classList.remove("active")
      currentStep++
      document.getElementById(`step${currentStep}`).classList.add("active")

      updateNavigation()

      if (currentStep === 3) {
        updateCalculation()
      }
    }
  }

  window.prevStep = () => {
    if (currentStep > 1) {
      document.getElementById(`step${currentStep}`).classList.remove("active")
      currentStep--
      document.getElementById(`step${currentStep}`).classList.add("active")

      updateNavigation()
    }
  }

  function updateNavigation() {
    const prevBtn = document.querySelector(".nav-btn.prev")
    const nextBtn = document.querySelector(".nav-btn.next")
    const bookBtn = document.querySelector(".nav-btn.book")

    prevBtn.style.display = currentStep > 1 ? "block" : "none"
    nextBtn.style.display = currentStep < 3 ? "block" : "none"
    bookBtn.style.display = currentStep === 3 ? "block" : "none"

    if (currentStep === 1) {
      nextBtn.disabled = !selectedService
    } else {
      nextBtn.disabled = false
    }
  }

  // Price tabs
  const priceTabs = document.querySelectorAll(".price-tab")
  const priceCategories = document.querySelectorAll(".price-category")

  priceTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const category = this.dataset.category

      priceTabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      priceCategories.forEach((cat) => {
        cat.classList.remove("active")
        if (cat.dataset.category === category) {
          cat.classList.add("active")
        }
      })
    })
  })

  // Modal functions
  window.openModal = () => {
    const modal = document.getElementById("modal")
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  window.closeModal = () => {
    const modal = document.getElementById("modal")
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }

  // Smooth scroll functions
  window.scrollToCalculator = () => {
    document.getElementById("calculator").scrollIntoView({
      behavior: "smooth",
    })
  }

  window.scrollToConsultation = () => {
    document.getElementById("consultation").scrollIntoView({
      behavior: "smooth",
    })
  }

  // Form handling
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Отправлено!"
      submitBtn.style.background = "#4CAF50"

      setTimeout(() => {
        submitBtn.textContent = originalText
        submitBtn.style.background = ""
        this.reset()

        if (this.closest(".modal-overlay")) {
          window.closeModal()
        }
      }, 2000)
    })
  })

  // Close modal on overlay click
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      window.closeModal()
    }
  })

  // Initialize
  initCalculator()
  updateNavigation()

  console.log("Minimal pricing page initialized")
})

document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 1
  let selectedService = null
  let selectedPrice = 0
  let quantity = 1

  // Initialize animations
  initAnimations()
  initCalculator()
  initPriceTabs()
  initForms()

  function initAnimations() {
    // Animate stats on scroll
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats()
          statsObserver.unobserve(entry.target)
        }
      })
    })

    const heroStats = document.querySelector(".hero-stats-ultra")
    if (heroStats) {
      statsObserver.observe(heroStats)
    }

    // Animate price items on scroll
    const priceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${Math.random() * 0.5}s`
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".price-item-holographic").forEach((item) => {
      priceObserver.observe(item)
    })
  }

  function animateStats() {
    const statNumbers = document.querySelectorAll(".stat-number")

    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.dataset.target)
      let current = 0
      const increment = target / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        stat.textContent = Math.floor(current)
      }, 20)
    })
  }

  function initCalculator() {
    // Service selection
    const serviceCards = document.querySelectorAll(".service-card-3d")
    serviceCards.forEach((card) => {
      card.addEventListener("click", function () {
        serviceCards.forEach((c) => c.classList.remove("selected"))
        this.classList.add("selected")
        selectedService = this.dataset.service
        selectedPrice = Number.parseInt(this.dataset.price)

        const nextBtn = document.querySelector(".nav-btn-3d.next")
        nextBtn.disabled = false

        // Add selection effect
        this.style.transform = "translateY(-10px) rotateX(10deg) scale(1.05)"
        setTimeout(() => {
          this.style.transform = "translateY(-10px) rotateX(10deg)"
        }, 200)
      })
    })

    // Generate teeth visual
    updateTeethVisual()
  }

  function updateTeethVisual() {
    const teethVisual = document.getElementById("teethVisual")
    if (!teethVisual) return

    teethVisual.innerHTML = ""
    for (let i = 0; i < 32; i++) {
      const tooth = document.createElement("div")
      tooth.className = "tooth-visual"
      if (i < quantity) {
        tooth.classList.add("selected")
      }
      teethVisual.appendChild(tooth)
    }
  }

  window.changeQuantity = (delta) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 32) {
      quantity = newQuantity
      document.getElementById("quantity").value = quantity
      updateTeethVisual()
      updateCalculation()
    }
  }

  function updateCalculation() {
    const total = selectedPrice * quantity
    const fullPayment = Math.round(total * 0.95)
    const installment = Math.round(total / 6)

    animateNumber(document.getElementById("totalPrice"), total)
    document.getElementById("fullPayment").textContent = fullPayment.toLocaleString() + " ₸"
    document.getElementById("installment").textContent = installment.toLocaleString() + " ₸/мес"
  }

  function animateNumber(element, target) {
    if (!element) return

    let current = 0
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current).toLocaleString()
    }, 30)
  }

  window.nextStep = () => {
    if (currentStep < 3) {
      document.querySelector(`.calculator-step-3d[data-step="${currentStep}"]`).classList.remove("active")
      currentStep++
      document.querySelector(`.calculator-step-3d[data-step="${currentStep}"]`).classList.add("active")

      updateProgress()
      updateNavigation()

      if (currentStep === 3) {
        updateCalculation()
      }
    }
  }

  window.prevStep = () => {
    if (currentStep > 1) {
      document.querySelector(`.calculator-step-3d[data-step="${currentStep}"]`).classList.remove("active")
      currentStep--
      document.querySelector(`.calculator-step-3d[data-step="${currentStep}"]`).classList.add("active")

      updateProgress()
      updateNavigation()
    }
  }

  function updateProgress() {
    const progressFill = document.getElementById("progressFill")
    const stepCounter = document.getElementById("currentStep")

    if (progressFill) {
      progressFill.style.width = `${(currentStep / 3) * 100}%`
    }

    if (stepCounter) {
      stepCounter.textContent = currentStep
    }
  }

  function updateNavigation() {
    const prevBtn = document.querySelector(".nav-btn-3d.prev")
    const nextBtn = document.querySelector(".nav-btn-3d.next")
    const bookBtn = document.querySelector(".nav-btn-3d.book")

    prevBtn.style.display = currentStep > 1 ? "block" : "none"
    nextBtn.style.display = currentStep < 3 ? "block" : "none"
    bookBtn.style.display = currentStep === 3 ? "block" : "none"

    if (currentStep === 1) {
      nextBtn.disabled = !selectedService
    } else {
      nextBtn.disabled = false
    }
  }

  function initPriceTabs() {
    const tabs = document.querySelectorAll(".tab-holographic")
    const categories = document.querySelectorAll(".price-category-holographic")

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const category = this.dataset.category

        tabs.forEach((t) => t.classList.remove("active"))
        this.classList.add("active")

        categories.forEach((cat) => {
          cat.classList.remove("active")
          if (cat.dataset.category === category) {
            cat.classList.add("active")
          }
        })

        // Add click effect
        this.style.transform = "translateY(-5px) scale(1.05)"
        setTimeout(() => {
          this.style.transform = "translateY(-3px)"
        }, 200)
      })
    })
  }

  function initForms() {
    const forms = document.querySelectorAll("form")

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault()

        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML

        submitBtn.innerHTML = "<span>ОТПРАВЛЕНО!</span>"
        submitBtn.style.background = "#4CAF50"

        setTimeout(() => {
          submitBtn.innerHTML = originalText
          submitBtn.style.background = ""
          this.reset()

          if (this.closest(".modal-futuristic")) {
            window.closeBookingModal()
          }
        }, 2000)
      })
    })
  }

  // Modal functions
  window.openBookingModal = () => {
    const modal = document.getElementById("bookingModal")
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  window.closeBookingModal = () => {
    const modal = document.getElementById("bookingModal")
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }

  // Smooth scroll function
  window.scrollToCalculator = () => {
    document.getElementById("calculator").scrollIntoView({
      behavior: "smooth",
    })
  }

  // Close modal on overlay click
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-futuristic")) {
      window.closeBookingModal()
    }
  })

  // Parallax effect for floating teeth
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const teeth = document.querySelectorAll(".floating-tooth")

    teeth.forEach((tooth, index) => {
      const speed = 0.5 + index * 0.1
      const yPos = -(scrolled * speed)
      tooth.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`
    })
  })

  // Add CSS animation class
  const style = document.createElement("style")
  style.textContent = `
    .animate-in {
      animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
  document.head.appendChild(style)

  console.log("Ultra beautiful pricing page initialized! 🚀")
})
document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 1
  let selectedService = null
  let selectedPrice = 0
  let quantity = 1

  // Initialize all functionality
  initAnimations()
  initCalculator()
  initPriceTabs()
  initForms()

  function initAnimations() {
    // Animate stats on scroll
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats()
          statsObserver.unobserve(entry.target)
        }
      })
    })

    const heroStats = document.querySelector(".hero-stats-clean")
    if (heroStats) {
      statsObserver.observe(heroStats)
    }

    // Animate elements on scroll
    const elementsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe price items
    document.querySelectorAll(".price-item-clean").forEach((item) => {
      elementsObserver.observe(item)
    })
  }

  function animateStats() {
    const statNumbers = document.querySelectorAll(".stat-number-clean")

    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.dataset.target)
      let current = 0
      const increment = target / 60
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        stat.textContent = Math.floor(current)
      }, 25)
    })
  }

  function initCalculator() {
    // Service selection
    const serviceCards = document.querySelectorAll(".service-card-clean")
    serviceCards.forEach((card) => {
      card.addEventListener("click", function () {
        serviceCards.forEach((c) => c.classList.remove("selected"))
        this.classList.add("selected")
        selectedService = this.dataset.service
        selectedPrice = Number.parseInt(this.dataset.price)

        const nextBtn = document.querySelector(".nav-btn-clean.next")
        nextBtn.disabled = false

        // Add selection animation
        this.style.transform = "translateY(-8px)"
        setTimeout(() => {
          this.style.transform = "translateY(-4px)"
        }, 200)
      })
    })

    // Generate teeth diagram
    updateTeethDiagram()
  }

  function updateTeethDiagram() {
    const upperTeeth = document.getElementById("upperTeeth")
    const lowerTeeth = document.getElementById("lowerTeeth")

    if (!upperTeeth || !lowerTeeth) return

    // Clear existing teeth
    upperTeeth.innerHTML = ""
    lowerTeeth.innerHTML = ""

    // Create upper teeth (16 teeth)
    for (let i = 0; i < 16; i++) {
      const tooth = document.createElement("div")
      tooth.className = "tooth-clean"
      if (i < Math.ceil(quantity / 2)) {
        tooth.classList.add("selected")
      }
      upperTeeth.appendChild(tooth)
    }

    // Create lower teeth (16 teeth)
    for (let i = 0; i < 16; i++) {
      const tooth = document.createElement("div")
      tooth.className = "tooth-clean"
      if (i < Math.floor(quantity / 2)) {
        tooth.classList.add("selected")
      }
      lowerTeeth.appendChild(tooth)
    }
  }

  window.changeQuantity = (delta) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 32) {
      quantity = newQuantity
      document.getElementById("quantity").value = quantity
      updateTeethDiagram()
      updateCalculation()
    }
  }

  function updateCalculation() {
    const total = selectedPrice * quantity
    const fullPayment = Math.round(total * 0.95)
    const installment = Math.round(total / 6)

    animateNumber(document.getElementById("totalPrice"), total)
    document.getElementById("fullPayment").textContent = fullPayment.toLocaleString() + " ₸"
    document.getElementById("installment").textContent = installment.toLocaleString() + " ₸/мес"
  }

  function animateNumber(element, target) {
    if (!element) return

    let current = 0
    const increment = target / 40
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current).toLocaleString()
    }, 25)
  }

  window.nextStep = () => {
    if (currentStep < 3) {
      document.querySelector(`.calculator-step-clean[data-step="${currentStep}"]`).classList.remove("active")
      currentStep++
      document.querySelector(`.calculator-step-clean[data-step="${currentStep}"]`).classList.add("active")

      updateStepIndicator()
      updateNavigation()

      if (currentStep === 3) {
        updateCalculation()
      }
    }
  }

  window.prevStep = () => {
    if (currentStep > 1) {
      document.querySelector(`.calculator-step-clean[data-step="${currentStep}"]`).classList.remove("active")
      currentStep--
      document.querySelector(`.calculator-step-clean[data-step="${currentStep}"]`).classList.add("active")

      updateStepIndicator()
      updateNavigation()
    }
  }

  function updateStepIndicator() {
    const indicators = document.querySelectorAll(".step-indicator-clean")
    indicators.forEach((indicator, index) => {
      if (index + 1 <= currentStep) {
        indicator.classList.add("active")
      } else {
        indicator.classList.remove("active")
      }
    })
  }

  function updateNavigation() {
    const prevBtn = document.querySelector(".nav-btn-clean.prev")
    const nextBtn = document.querySelector(".nav-btn-clean.next")
    const bookBtn = document.querySelector(".nav-btn-clean.book")

    prevBtn.style.display = currentStep > 1 ? "block" : "none"
    nextBtn.style.display = currentStep < 3 ? "block" : "none"
    bookBtn.style.display = currentStep === 3 ? "block" : "none"

    if (currentStep === 1) {
      nextBtn.disabled = !selectedService
    } else {
      nextBtn.disabled = false
    }
  }

  function initPriceTabs() {
    const tabs = document.querySelectorAll(".price-tab-clean")
    const categories = document.querySelectorAll(".price-category-clean")

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const category = this.dataset.category

        tabs.forEach((t) => t.classList.remove("active"))
        this.classList.add("active")

        categories.forEach((cat) => {
          cat.classList.remove("active")
          if (cat.dataset.category === category) {
            cat.classList.add("active")
          }
        })
      })
    })
  }

  function initForms() {
    const forms = document.querySelectorAll("form")

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault()

        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent

        submitBtn.textContent = "Отправлено!"
        submitBtn.style.background = "var(--primary-dark)"

        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.style.background = ""
          this.reset()

          if (this.closest(".modal-clean")) {
            window.closeModal()
          }
        }, 2000)
      })
    })
  }

  // Modal functions
  window.openModal = () => {
    const modal = document.getElementById("modal")
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  window.closeModal = () => {
    const modal = document.getElementById("modal")
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }

  // Smooth scroll functions
  window.scrollToCalculator = () => {
    document.getElementById("calculator").scrollIntoView({
      behavior: "smooth",
    })
  }

  window.scrollToConsultation = () => {
    document.getElementById("consultation").scrollIntoView({
      behavior: "smooth",
    })
  }

  // Initialize everything
  updateStepIndicator()
  updateNavigation()

  console.log("Clean minimalistic pricing page initialized! ✨")
})

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initAnimations()
  initForms()
  initScrollEffects()

  function initAnimations() {
    // Animate stats on scroll
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats()
          statsObserver.unobserve(entry.target)
        }
      })
    })

    const heroStats = document.querySelector(".hero-stats-beautiful")
    if (heroStats) {
      statsObserver.observe(heroStats)
    }

    // Animate elements on scroll
    const elementsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe service cards
    document.querySelectorAll(".service-card-beautiful").forEach((card) => {
      elementsObserver.observe(card)
    })

    // Observe testimonial cards
    document.querySelectorAll(".testimonial-card-beautiful").forEach((card) => {
      elementsObserver.observe(card)
    })

    // Observe about features
    document.querySelectorAll(".about-feature").forEach((feature) => {
      elementsObserver.observe(feature)
    })
  }

  function animateStats() {
    const statNumbers = document.querySelectorAll(".stat-number")

    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.dataset.target)
      let current = 0
      const increment = target / 60
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        stat.textContent = Math.floor(current)
      }, 25)
    })
  }

  function initForms() {
    const forms = document.querySelectorAll("form")

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault()

        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML

        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Заявка отправлена!
        `
        submitBtn.style.background = "#4CAF50"

        setTimeout(() => {
          submitBtn.innerHTML = originalText
          submitBtn.style.background = ""
          this.reset()
        }, 3000)
      })
    })
  }

  function initScrollEffects() {
    // Parallax effect for background circles
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const circles = document.querySelectorAll(".bg-circle")

      circles.forEach((circle, index) => {
        const speed = 0.5 + index * 0.1
        const yPos = -(scrolled * speed)
        circle.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`
      })
    })

    // Service card hover effects
    const serviceCards = document.querySelectorAll(".service-card-beautiful")
    serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.zIndex = "10"
      })

      card.addEventListener("mouseleave", function () {
        this.style.zIndex = "1"
      })
    })

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  // Add CSS animation class
  const style = document.createElement("style")
  style.textContent = `
    .service-card-beautiful {
      animation: fadeInUp 0.6s ease-out forwards;
      opacity: 0;
      transform: translateY(30px);
    }
    
    .service-card-beautiful.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .testimonial-card-beautiful {
      animation: fadeInUp 0.6s ease-out forwards;
      opacity: 0;
      transform: translateY(30px);
    }
    
    .testimonial-card-beautiful.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .about-feature {
      animation: fadeInLeft 0.6s ease-out forwards;
      opacity: 0;
      transform: translateX(-30px);
    }
    
    .about-feature.animate-in {
      opacity: 1;
      transform: translateX(0);
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `
  document.head.appendChild(style)

  console.log("Beautiful minimalistic main page initialized! ✨")
})
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initMobileMenu()
  initScrollEffects()
  initForms()
  initAnimations()

  function initMobileMenu() {
    const mobileToggle = document.getElementById("mobileMenuToggle")
    const navigation = document.querySelector(".main-navigation")

    if (mobileToggle && navigation) {
      mobileToggle.addEventListener("click", () => {
        navigation.classList.toggle("active")
        mobileToggle.classList.toggle("active")
      })
    }
  }

  function initScrollEffects() {
    // Header scroll effect
    const header = document.querySelector(".main-header")
    let lastScrollY = window.scrollY

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }

      lastScrollY = currentScrollY
    })

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  function initForms() {
    const forms = document.querySelectorAll("form")

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault()

        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent

        submitBtn.textContent = "ОТПРАВЛЕНО!"
        submitBtn.style.background = "#4CAF50"

        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.style.background = ""
          this.reset()
        }, 3000)
      })
    })
  }

  function initAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    // Observe service items
    document.querySelectorAll(".service-item").forEach((item) => {
      observer.observe(item)
    })

    // Observe feature items
    document.querySelectorAll(".feature-item").forEach((item) => {
      observer.observe(item)
    })

    // Service item hover effects
    const serviceItems = document.querySelectorAll(".service-item")
    serviceItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.style.zIndex = "10"
      })

      item.addEventListener("mouseleave", function () {
        this.style.zIndex = "1"
      })
    })
  }

  // Add CSS animation classes
  const style = document.createElement("style")
  style.textContent = `
    .service-item {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-item.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .feature-item {
      opacity: 0;
      transform: translateX(-30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-item.animate-in {
      opacity: 1;
      transform: translateX(0);
    }
    
    .main-header.scrolled {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
    }
    
    @media (max-width: 1024px) {
      .main-navigation {
        position: fixed;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
      }
      
      .main-navigation.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      
      .main-navigation ul {
        flex-direction: column;
        padding: 20px;
        gap: 16px;
      }
      
      .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
    }
  `
  document.head.appendChild(style)

  console.log("Elegant style page initialized! ✨")
})
