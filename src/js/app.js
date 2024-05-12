import activityPage from '../html/activity.html'
import mapPage from '../html/map.html'
import timePage from '../html/time.html'
import { init } from '../js/map.js'

document.addEventListener('DOMContentLoaded', function () {
  const activityLink = document.getElementById('activityLink')
  const mapLink = document.getElementById('mapLink')
  const timerLink = document.getElementById('timerLink')
  const content = document.getElementById('content')

  function showPage(page) {
    content.innerHTML = ''
    if (page === 'activity') {
      content.innerHTML = activityPage
    } else if (page === 'map') {
      content.innerHTML = mapPage
      init()
    } else if (page === 'timer') {
      content.innerHTML = timePage
    }
  }

  activityLink.addEventListener('click', function () {
    showPage('activity')
    highlightLink(activityLink)
  })

  mapLink.addEventListener('click', function () {
    showPage('map')
    highlightLink(mapLink)
  })

  timerLink.addEventListener('click', function () {
    showPage('timer')
    highlightLink(timerLink)
  })

  function highlightLink(link) {
    const links = document.querySelectorAll('ul li a')
    links.forEach(function (item) {
      item.classList.remove('active')
    })
    link.classList.add('active')
  }

  // Показываем первую страницу по умолчанию
  showPage('activity')
  highlightLink(activityLink)
})
