// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle")
  const mainNav = document.querySelector(".main-nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active")
      menuToggle.classList.toggle("active")
    })
  }

  // Smooth scrolling for anchor links
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

  // Header scroll effect
  const header = document.querySelector(".header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    lastScrollTop = scrollTop
  })

  // Animate elements on scroll
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

  // Observe elements for animation
  document.querySelectorAll(".service-item, .testimonial-card, .rating-card, .feature-item").forEach((el) => {
    observer.observe(el)
  })

  // Counter animation for rating scores
  function animateCounters() {
    const counters = document.querySelectorAll(".rating-score")

    counters.forEach((counter) => {
      const target = Number.parseFloat(counter.textContent)
      const increment = target / 100
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          counter.textContent = target.toFixed(1)
          clearInterval(timer)
        } else {
          counter.textContent = current.toFixed(1)
        }
      }, 20)
    })
  }

  // Trigger counter animation when ratings section is visible
  const ratingsSection = document.querySelector(".ratings-section")
  if (ratingsSection) {
    const ratingsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters()
            ratingsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    ratingsObserver.observe(ratingsSection)
  }

  // Parallax effect for hero section
  const heroSection = document.querySelector(".hero-main")
  const heroImage = document.querySelector(".hero-image")

  if (heroSection && heroImage) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.5

      if (scrolled < heroSection.offsetHeight) {
        heroImage.style.transform = `translateY(${parallax}px)`
      }
    })
  }

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })

  // Service cards hover effect
  const serviceCards = document.querySelectorAll(".service-item")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Testimonial cards rotation effect
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
  })

  // Rating cards pulse effect
  const ratingCards = document.querySelectorAll(".rating-card")
  ratingCards.forEach((card, index) => {
    card.addEventListener("mouseenter", function () {
      const stars = this.querySelectorAll(".star")
      stars.forEach((star, starIndex) => {
        setTimeout(() => {
          star.style.transform = "scale(1.2)"
          star.style.color = "#ffc107"
        }, starIndex * 100)
      })
    })

    card.addEventListener("mouseleave", function () {
      const stars = this.querySelectorAll(".star")
      stars.forEach((star) => {
        star.style.transform = "scale(1)"
      })
    })
  })

  // Add scroll-to-top button
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = "↑"
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `

  document.body.appendChild(scrollToTopBtn)

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = "1"
      scrollToTopBtn.style.visibility = "visible"
    } else {
      scrollToTopBtn.style.opacity = "0"
      scrollToTopBtn.style.visibility = "hidden"
    }
  })

  // Form validation and submission
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simple form validation
      const inputs = this.querySelectorAll("input[required], select[required]")
      let isValid = true

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.style.borderColor = "#e53e3e"
        } else {
          input.style.borderColor = ""
        }
      })

      if (isValid) {
        // Show success message
        const successMessage = document.createElement("div")
        successMessage.textContent = "Спасибо! Мы свяжемся с вами в ближайшее время."
        successMessage.style.cssText = `
                    background: #48bb78;
                    color: white;
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 15px;
                    text-align: center;
                `

        this.appendChild(successMessage)
        this.reset()

        setTimeout(() => {
          successMessage.remove()
        }, 5000)
      }
    })
  })
})

