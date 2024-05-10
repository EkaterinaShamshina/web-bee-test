const localStorage = window.localStorage
const sessionStorage = window.sessionStorage

// Функция, которая обновляет таймер каждую секунду
function updateTimer() {
  // Проверяем, есть ли сохраненное значение в localStorage
  let startTime
  let timer = document.getElementById('timer')

  if (localStorage.getItem('startTime')) {
    startTime = parseInt(localStorage.getItem('startTime'))
  } else {
    startTime = new Date().getTime() // Если нет сохраненного значения, устанавливаем текущее время
    localStorage.setItem('startTime', startTime) // Сохраняем время начала в localStorage
  }

  // Функция для обновления таймера
  function displayTimer() {
    if (timer) {
      var currentTime = new Date().getTime()
      var timeElapsed = new Date(currentTime - startTime)

      var hours = timeElapsed.getUTCHours()
      var minutes = timeElapsed.getUTCMinutes()
      var seconds = timeElapsed.getUTCSeconds()

      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      timer.textContent = hours + ':' + minutes + ':' + seconds
    }
  }
  // Обновляем таймер каждую секунду
  setInterval(displayTimer, 1000)
}
// Запуск отсчета времени при загрузке страницы
window.onload = function () {
  updateTimer()
}
// Сброс значения таймера при закрытии страницы
window.onbeforeunload = function () {
  let startTime = new Date().getTime()
  sessionStorage.setItem('startTime', startTime.toString())
}
// При закрытии вкладки обнуляем таймер
window.onunload = function () {
  sessionStorage.removeItem('startTime')
}
