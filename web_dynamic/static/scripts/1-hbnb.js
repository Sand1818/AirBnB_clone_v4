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
      $('DIV.amenities h4').text(ameni.join(', '));
    });
  });
