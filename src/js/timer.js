const sessionStorage = window.sessionStorage

// Функция, которая обновляет таймер каждую секунду
function updateTimer() {
  // Проверяем, есть ли сохраненное значение в sessionStorage
  let startTime
  let timer = document.getElementById('timer')

  if (sessionStorage.getItem('startTime')) {
    startTime = parseInt(sessionStorage.getItem('startTime'))
  } else {
    startTime = new Date().getTime() // Если нет сохраненного значения, устанавливаем текущее время
    sessionStorage.setItem('startTime', startTime) // Сохраняем время начала в sessionStorage
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

export { updateTimer }
