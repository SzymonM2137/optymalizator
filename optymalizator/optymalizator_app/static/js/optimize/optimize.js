const csrftoken = Cookies.get('csrftoken');
$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
  }
});

$(document).ready(function() {
  topBtn = document.querySelector(".top-btn");
  backBtn = document.querySelector(".back-btn");

  // show button only when user scrolls down
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      topBtn.classList.add("active");

      topBtn.addEventListener("click", () => {
        window.scrollTo(0, 0);
      });
    } else {
      topBtn.classList.remove("active");

      topBtn.removeEventListener("click", () => {
        window.scrollTo(0, 0);
      });
    }
  });

  backBtn.addEventListener("click", () => {
    window.history.back();
  });
});

function load_optimize_results() {
  data = {
    'id': new URLSearchParams(window.location.search).get('id'),
    'lvl': '',
    'ord': '',
  };

  document.querySelectorAll("input:checked").forEach((item) => {
    if (item.name == 'ref_level') {
      data['lvl'] = item.value;
    } else if (item.name == 'ordinance') {
      data['ord'] = item.value;
    }
  });

  $.ajax({
    type: 'GET',
    url: '/get-optimize-results',
    data: data,
    success: function(response) {
      html = '';
      if (response.length == 0) {
        html += '<h1 align="center">Nie znaleziono odpowiedników</h1>';
      } else {
        response.drugs.forEach((item) => {
          html += '<li class="card" data-id="' + item.pk + '">';
          html += '<p class="ean">EAN: 0' + item.ean + '</p>';
          html += '<div class="main-content">';
          html += '<div class="left">';
          html += '<p>' + item.nazwa + '</p>';
          html += '<p>' + item.postac + '</p>';
          html += '<p>' + item.dawka + '</p>';
          html += '<p>' + item.zawartosc_opakowania + '</p>';
          html += '<p>' + item.zakres_wskazan + '</p>';
          html += '</div>';
          html += '<div class="right">';
          html += '<p>' + item.cena + '</p>';
          html += '</div>';
          html += '</div>';
          html += '</li>';
        });
      }
      $('.optimize-results').html(html);
    },
  });
}

$(document).on('click', '.confirm-btn', function() {
  load_optimize_results();
});
