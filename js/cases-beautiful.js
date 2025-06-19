document.addEventListener("DOMContentLoaded", () => {
  // Counter animation for hero stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-beautiful")

  counters.forEach((counter) => {
    const dataCount = counter.getAttribute("data-count")
    const target = Number.parseInt(dataCount)
    const numberElement = counter.querySelector(".stat-number")

    // Защита от некорректных значений
    if (isNaN(target) || !numberElement) return

    // Получаем суффикс (например, + или %)
    const initialText = numberElement.textContent
    const suffix = initialText.replace(/[0-9]/g, "").trim()

    let current = 0
    const increment = target / 100

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      numberElement.textContent = Math.floor(current) + suffix
    }, 20)
  })
}


  // Trigger counter animation when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        heroObserver.unobserve(entry.target)
      }
    })
  })

  const heroSection = document.querySelector(".cases-hero-beautiful")
  if (heroSection) {
    heroObserver.observe(heroSection)
  }

  // Filter functionality
  const filterTabs = document.querySelectorAll(".filter-tab-beautiful")
  const caseCards = document.querySelectorAll(".case-card-beautiful")

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      filterTabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      this.classList.add("active")

      // Get filter value
      const filter = this.getAttribute("data-filter")

      // Filter cases with animation
      caseCards.forEach((card, index) => {
        const categories = card.getAttribute("data-category")

        if (filter === "all" || categories.includes(filter)) {
          setTimeout(() => {
            card.style.display = "block"
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"

            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            }, 50)
          }, index * 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(-20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Before/After slider functionality
  const sliders = document.querySelectorAll(".before-after-slider")

  sliders.forEach((slider) => {
    const handle = slider.querySelector(".slider-handle")
    const afterImg = slider.querySelector(".after-img")
    let isDragging = false

    function updateSlider(x) {
      const rect = slider.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100))

      handle.style.left = percentage + "%"
      afterImg.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`
    }

    // Mouse events
    handle.addEventListener("mousedown", (e) => {
      isDragging = true
      e.preventDefault()
    })

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        updateSlider(e.clientX)
      }
    })

    document.addEventListener("mouseup", () => {
      isDragging = false
    })

    // Touch events
    handle.addEventListener("touchstart", (e) => {
      isDragging = true
      e.preventDefault()
    })

    document.addEventListener("touchmove", (e) => {
      if (isDragging) {
        updateSlider(e.touches[0].clientX)
      }
    })

    document.addEventListener("touchend", () => {
      isDragging = false
    })

    // Click to position
    slider.addEventListener("click", (e) => {
      if (e.target !== handle) {
        updateSlider(e.clientX)
      }
    })
  })

  // Showcase thumbnails functionality
  const thumbnails = document.querySelectorAll(".thumbnail")
  const showcaseImages = document.querySelectorAll(".showcase-image img")

  const showcaseData = [
    {
      before:
        "../img/do6.jfif",
      after: "../img/posle6.jfif",
      title: "Коронки цирконевые",
      description: "Виниры + имплантация",
      tags: ["Виниры E-max", "К"],
    },
    {
      before:
        "../img/do7.jfif",
      after:
        "../img/posle7.jfif",
      title: "Исправление прикуса",
      description: "Брекет-система",
      tags: ["Брекеты", "Ортодонтия"],
    },
    {
      before:
        "../img/do3.png",
      after:
        "../img/posle3.png",
      title: "Лечение кариеса",
      description: "Реставрация зубов",
      tags: ["Пломбы", "Терапия"],
    },
  ]

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked thumbnail
      this.classList.add("active")

      // Update showcase content
      const data = showcaseData[index]
      if (data) {
        const beforeImg = document.querySelector(".showcase-image.before img")
        const afterImg = document.querySelector(".showcase-image.after img")
        const title = document.querySelector(".showcase-info h3")
        const description = document.querySelector(".showcase-info p")
        const tagsContainer = document.querySelector(".showcase-tags")

        if (beforeImg) beforeImg.src = data.before
        if (afterImg) afterImg.src = data.after
        if (title) title.textContent = data.title
        if (description) description.textContent = data.description

        if (tagsContainer) {
          tagsContainer.innerHTML = ""
          data.tags.forEach((tag) => {
            const tagElement = document.createElement("span")
            tagElement.className = "tag"
            tagElement.textContent = tag
            tagsContainer.appendChild(tagElement)
          })
        }
      }
    })
  })

  // Load more functionality
  const loadMoreBtn = document.querySelector(".load-more-btn-beautiful")
  const casesCounter = document.querySelector(".cases-counter-beautiful")
  let visibleCases = 6
  const totalCases = 24

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      visibleCases += 6

      if (visibleCases >= totalCases) {
        visibleCases = totalCases
        this.style.display = "none"
      }

      if (casesCounter) {
        casesCounter.textContent = `Показано ${visibleCases} из ${totalCases} кейсов`
      }

      // Add loading animation
      this.innerHTML = "<span>Загружаем...</span>"

      setTimeout(() => {
        this.innerHTML = '<span>Показать еще кейсы</span><div class="btn-icon">↓</div>'
      }, 1000)
    })
  }

  // Smooth scroll animations
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

  // Observe all case cards for animation
  caseCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Observe story cards
  const storyCards = document.querySelectorAll(".story-card-beautiful")
  storyCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Parallax effect for floating shapes
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const shapes = document.querySelectorAll(".shape, .cta-shape")

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1
      const yPos = -(scrolled * speed)
      shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`
    })
  })

  // Add hover effects to case cards
  caseCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10"
    })

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "1"
    })
  })

  console.log("Beautiful cases page initialized successfully!")
})
