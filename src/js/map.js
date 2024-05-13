//Прелоадер

function removeLoading() {
  document.querySelector('.spinner-border').classList.remove('spinner-border')
  document.querySelector('main').classList.remove('d-none')
}

//Яндекс-карта
function init() {
  const ymaps = window.ymaps
  if (!ymaps) return

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
  removeLoading()
}

export { init }
