const localStorage = window.localStorage
// Функция, которая обновляет таймер каждую секунду
function updateTimer() {
  var startTime

  // Проверяем, есть ли сохраненное значение в localStorage
  if (localStorage.getItem('startTime')) {
    startTime = parseInt(localStorage.getItem('startTime'))
  } else {
    startTime = new Date().getTime() // Если нет сохраненного значения, устанавливаем текущее время
    localStorage.setItem('startTime', startTime) // Сохраняем время начала в localStorage
  }

  // Функция для обновления таймера
  function displayTimer() {
    var currentTime = new Date().getTime()
    var timeElapsed = new Date(currentTime - startTime)

    var hours = timeElapsed.getUTCHours()
    var minutes = timeElapsed.getUTCMinutes()
    var seconds = timeElapsed.getUTCSeconds()

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    document.getElementById('timer').textContent =
      hours + ':' + minutes + ':' + seconds
  }

  displayTimer() // Показываем таймер сразу

  // Обновляем таймер каждую секунду
  setInterval(displayTimer, 1000)
}

updateTimer() // Запускаем таймер при загрузке страницы
