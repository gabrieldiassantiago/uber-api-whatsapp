function pegardados () {
    const pegarendereco = document.querySelector('#location-input').value
    const pegarcomplemento = document.querySelector('#complemento').value
    const pegarcidade = document.querySelector("#locality-input").value
    const nomecliente = document.querySelector("#nome-client").value
    const enderecodestino = document.querySelector('#endereco_destino').value

    
    if (pegarendereco == ''){
      if(pegarcomplemento == '')
      if (pegarcidade == '')
      if (nomecliente == '')
      alert('O campo está vazio')
    }else
    window.open("https://wa.me/5512983217662?text="+ 'Olá, meu nome é ' + nomecliente
    + ' e preciso de uma corrida da ' + pegarendereco + ', ' + 'da cidade de ' +  pegarcidade + 'para ir até ' + ' ' +  enderecodestino )

  }


function initMap() {
  const CONFIGURATION = {
    "ctaTitle": "Enviar",
    "mapOptions": {"center":{"lat":37.4221,"lng":-122.0841},"fullscreenControl":true,"mapTypeControl":false,"streetViewControl":true,"zoom":11,"zoomControl":true,"maxZoom":22,"mapId":""},
    "mapsApiKey": "AIzaSyBQOjEMRa3cy9pGK2gRNC_B38aosc40ewk",
    "capabilities": {"addressAutocompleteControl":true,"mapDisplayControl":false,"ctaControl":true}
  };
  const componentForm = [
    'location',
    'locality',
    'administrative_area_level_1',
    'country'
    ];

  const getFormInputElement = (component) => document.getElementById(component + '-input');
  const autocompleteInput = getFormInputElement('location');
  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  });
  autocomplete.addListener('place_changed', function () {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert('No details available for input: \'' + place.name + '\'');
      return;
    }
    fillInAddress(place);
  });

  function fillInAddress(place) {  // optional parameter
    const addressNameFormat = {
      'street_number': 'short_name',
      'route': 'long_name',
      'locality': 'long_name',
      'administrative_area_level_1': 'short_name',
      'country': 'long_name',
      'postal_code': 'short_name',
    };
    const getAddressComp = function (type) {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return '';
    };
    getFormInputElement('location').value = getAddressComp('street_number') + ' '
              + getAddressComp('route');
    for (const component of componentForm) {
      // Location field is handled separately above as it has different logic.
      if (component !== 'location') {
        getFormInputElement(component).value = getAddressComp(component);
      }
    }
  }
}

