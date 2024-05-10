//Прелоадер

document.addEventListener('DOMContentLoaded', function () {
  const spinner = document.querySelector('.content > .spinner-border')
  const main = document.querySelector('main')
  if (spinner) {
    spinner.classList.add('d-none')
    main.classList.remove('d-none')
  }
})

//Яндекс-карта
const ymaps = window.ymaps
if (ymaps) {
  ymaps.ready(init)
}

function init() {
  var geolocation = ymaps.geolocation

  var myMap = new ymaps.Map('map', {
    center: [56, 37],
    zoom: 7,
  })

  geolocation
    .get({
      // Выставляем опцию для определения положения по ip
      provider: 'yandex',
      // Карта автоматически отцентрируется по положению пользователя.
      mapStateAutoApply: true,
      // Включим автоматическое геокодирование результата.
      autoReverseGeocode: true,
    })
    .then(function (result) {
      // Выведем результат геокодирования.
      myMap.geoObjects.add(result.geoObjects)

      var address = result.geoObjects.get(0).properties.get('text')
      document.getElementById('address').innerText = address
    })
}
