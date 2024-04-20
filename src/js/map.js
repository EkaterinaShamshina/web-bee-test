const ymaps = window.ymaps

ymaps.ready(init)

function init() {
  var myMap = new ymaps.Map('map', {
    center: [56, 37],
    zoom: 8,
  })

  var geolocation = ymaps.geolocation

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

      // Выведем в консоль результат геокодирования.
      console.log(result.geoObjects.get(0).properties.get('metaDataProperty'))
    })
}
