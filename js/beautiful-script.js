// Beautiful Dental Clinic JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const mainNavigation = document.querySelector(".main-navigation")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      mainNavigation.classList.toggle("active")
      this.classList.toggle("active")
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
  const header = document.querySelector(".main-header")
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

  // Service cards animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe service items
  document.querySelectorAll(".service-item").forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(item)
  })

  // Observe rating items
  document.querySelectorAll(".rating-item").forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    observer.observe(item)
  })

  // Observe feature items
  document.querySelectorAll(".feature-item").forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-30px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(item)
  })

  // Counter animation for feature numbers
  function animateCounter(element, target) {
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = target
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current)
      }
    }, 20)
  }

  // Animate counters when they come into view
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const number = entry.target.textContent
          if (number === "19") {
            animateCounter(entry.target, 19)
          }
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".feature-number").forEach((counter) => {
    if (counter.textContent === "19") {
      counterObserver.observe(counter)
    }
  })

  // Add hover effect to rating stars
  document.querySelectorAll(".rating-stars").forEach((starsContainer) => {
    starsContainer.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)"
      this.style.transition = "transform 0.3s ease"
    })

    starsContainer.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })
  })

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroImage = document.querySelector(".hero-image")
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })

  // Phone number formatting
  const phoneInputs = document.querySelectorAll('input[type="tel"]')
  phoneInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.length > 0) {
        if (value.length <= 3) {
          value = `+7 (${value}`
        } else if (value.length <= 6) {
          value = `+7 (${value.slice(1, 4)}) ${value.slice(4)}`
        } else if (value.length <= 8) {
          value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7)}`
        } else {
          value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`
        }
      }
      e.target.value = value
    })
  })

  // Service item click tracking
  document.querySelectorAll(".service-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const serviceName = this.closest(".service-item").querySelector("h3").textContent
      console.log(`Service clicked: ${serviceName}`)
    })
  })

  // Rating items hover effect
  document.querySelectorAll(".rating-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px) scale(1.02)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Add CSS for loaded state
const style = document.createElement("style")
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .main-header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 1024px) {
        .main-navigation.active {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        
        .main-navigation.active ul {
            flex-direction: column;
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
