var lookup = {
  "street_number": $('#checkout_shipping_address_address1'),
  "route": $('#checkout_shipping_address_address1'),
  "fullAddress": $('#checkout_shipping_address_address1'),
  "locality": $('#checkout_shipping_address_city'),
  "administrative_area_level_1": $('#checkout_shipping_address_province'),
  "country": $('#checkout_shipping_address_country'),
  "postal_code": $('#checkout_shipping_address_zip')
};

var placeSearch;
var autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(
        $('#checkout_shipping_address_address1').on('focus', geolocate)[0]
      ),
      {types: ['geocode']}
  );

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  for (var component in componentForm) {
    lookup[component].val('');
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  var fullAddress = ' ';
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    var val = place.address_components[i][componentForm[addressType]];
    if (componentForm[addressType]) {
      switch (addressType) {
        case 'street_number':
          fullAddress = val + fullAddress;
          break;
        case 'route':
          fullAddress = fullAddress + val;
          break;
        case 'locality':
          lookup.locality.val(val);
          break;
        case 'administrative_area_level_1':
          lookup.administrative_area_level_1.val(val);
          break;
        case 'country':
          lookup.country.val(val);
          break;
        case 'postal_code':
          lookup.postal_code.val(val);
          break;
      }
    }
  }
  lookup.fullAddress.val(fullAddress);
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
