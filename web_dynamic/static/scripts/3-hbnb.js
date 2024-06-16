$(document).ready(function () {
    const check_boxes = {};
    const ameni = [];
    $('INPUT[type="checkbox"]').click(function () {
      if ($(this).prop('checked') === true) {
        check_boxes[$(this).attr('data-name')] = $(this).attr('data-id');
        ameni.push($(this).attr('data-name'));
      } else {
        delete check_boxes[$(this).attr('data-name')];
        ameni.splice(ameni.indexOf($(this).attr('data-name')), 1);
      }
      $('DIV.amenities h4').text(name.join(', '));
  });
const url = 'http://0.0.0.0:5001/api/v1/status/';
$.getJSON(url, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
        $('DIV#api_status').removeClass('available');
    }
    });
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        data: '{}',
        contentType: 'application/json',
        success: function (data) {
        for (let i = 0; i < data.length; i++) {
          const name = '<h2>' + data[i].name + '</h2>';
          const price_by_night = '<div class="price_by_night">' + data[i].price_by_night + '</div>';
          const title_square = '<div class="title_box">' + name + price_by_night + '</div>';
          let gues = ' Guests';
          let broom = ' Bedrooms';
          let bthroom = ' Bathrooms';
          if (data[i].max_guest === 1) gues = ' Guest';
          const guest = '<div class="max_guest">' + data[i].max_guest + gues + '</div>';
          if (data[i].number_rooms === 1) broom = ' Bedroom';
          const rooms = '<div class="number_rooms">' + data[i].number_rooms + broom + '</div>';
          if (data[i].number_bathrooms === 1) bthroom = ' Bathroom';
          const bathrooms = '<div class="number_bathrooms">' + data[i].number_bathrooms + bthroom + '</div>';
          const ThreeD = guest + rooms + bathrooms;
          const info = '<div class="information">' + ThreeD + '</div>';
          let d = 'safe';
          if (data[i].description !== d) d = 'None';
          const description = '<div class="description">' + d + '</div>';
          const article = '<article>' + title_square + info + description + '</article>';
          $('section.places').html(article);
        }
        }
      });
      });
