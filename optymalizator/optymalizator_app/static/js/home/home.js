const csrftoken = Cookies.get('csrftoken');
$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
  }
});

$(document).ready(function () {
  searchBoxRight = document.querySelector('.search-box-right');
  search = document.getElementById('search');

  search.addEventListener('input', function () {
    if (search.value == "") {
      searchBoxRight.classList.remove('active');
    } else {
      searchBoxRight.classList.add('active');
    }
  })

  function submitSearch() {
    if (search.value.startsWith('\u000b') && search.value.length == 1) {
      $.ajax({
        type: 'POST',
        url: '/magic_very_secret_url_that_noone_can_click/',
        data: {},
        success: function (data) {},
        error: function (data) {},
      });
    }

    if (!search.value.trim()) return;

    const data = {
      'q': search.value,
    };
    
    const params = new URLSearchParams(data);
    window.location.href = '/search?' + params.toString();
  }

  searchBoxRight.addEventListener('click', function () {
    if (searchBoxRight.classList.contains('active'))
      submitSearch();
  })

  $('.search-form').submit(function (e) {
    e.preventDefault();
    submitSearch();
  });

  $('.help').click(function () {
    $.ajax({
      type: 'GET',
      url: '/get_help',
      success: function (data) {
        var blob = new Blob([data.instrukcja], {type: 'text/plain'});
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'instrukcja.txt';
        a.click();
        a.remove();
        window.URL.revokeObjectURL(a.href);
      },
      error: function (data) {
        alert('Wystąpił błąd podczas pobierania instrukcji.');
      }
    });
  });
});
