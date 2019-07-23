document.addEventListener('DOMContentLoaded', (event) => {
  const insert = document.querySelector('.side-nav-mobile-dropdown')
  const dropdown = document.querySelector('.side-nav-main-navigation')
  const heightContainer = document.querySelector('.side-nav-mobile-wrapper')

  let open = false
  insert.addEventListener('click', () => {
    if (open) {
      heightContainer.style.height = 0 + 'px'
      insert.classList.remove('side-mobile-open')
      open = false
    } else {
      const targetHeight = dropdown.offsetHeight
      heightContainer.style.height = targetHeight + 'px'
      insert.classList.add('side-mobile-open')
      open = true
    }
  })

  const foot = document.querySelector('footer')
  const sideNavInfo = document.querySelector('.side-short-info')
  const bla = document.querySelector('.side-nav-footer-links')
  const sideNav = sideNavInfo.parentNode

  const mq = window.matchMedia('(max-width: 900px)')

  const mediaQueryHandler = (mq) => {
    if (mq.matches) {
      foot.insertBefore(sideNavInfo, bla)
    } else {
      sideNav.appendChild(sideNavInfo)
    }
  }

  mq.addListener(mediaQueryHandler)
  mediaQueryHandler(mq)
})
