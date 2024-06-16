$(document).ready(function () {
    const check_boxes = [];
    const ameni = [];
    $('INPUT[type="checkbox"]').click(function () {
      if ($(this).prop('checked') === true) {
        check_boxes.push($(this).attr('data-id'));
        ameni.push($(this).attr('data-name'));
      } else {
        check_boxes.splice(check_boxes.indexOf($(this).attr('data-id')), 1);
        ameni.splice(ameni.indexOf($(this).attr('data-name')), 1);
      }
      $('DIV.amenities h4').text(ameni.join(', '));
    });
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.getJSON(url, function (data) {
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
          $('DIV#api_status').removeClass('available');
      }
      });
  
  function deliver_places (data) {
    for (let i = 0; i < data.length; i++) {
      const name = '<h2>' + data[i].name + '</h2>';
      const price_by_night = '<div class="price_by_night">' + data[i].price_by_night + '</div>';
      const title_box = '<div class="title_box">' + name + price_by_night + '</div>';
      let gues = ' Guests';
      let broo = ' Bedrooms';
      let bthroo = ' Bathrooms';
      if (data[i].max_guest === 1) gues = ' Guest';
      const guest = '<div class="max_guest">' + data[i].max_guest + gues + '</div>';
      if (data[i].number_rooms === 1) broo = ' Bedroom';
      const rooms = '<div class="number_rooms">' + data[i].number_rooms + broo + '</div>';
      if (data[i].number_bathrooms === 1) bthroo = ' Bathroom';
      const bathrooms = '<div class="number_bathrooms">' + data[i].number_bathrooms + bthroo + '</div>';
      const ThreeD = guest + rooms + bathrooms;
      const info = '<div class="information">' + ThreeD + '</div>';
      let d = 'safe';
      if (data[i].description !== d) d = 'None';
      const description = '<div class="description">' + d + '</div>';
      const article = '<article>' + title_box + info + description + '</article>';
      $('section.places').html(article);
    }
  }
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    success: function (data) {
    deliver_places(data);
      }
    });
  let dict = {};
  $('button').click(function () {
  dict = {'amenities': check_boxes};
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify(dict),
    contentType: 'application/json',
    success: function (data) {
    $('section.places').html('');
    deliver_places(data);
    }
    });
  });
  });
