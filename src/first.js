window.addEventListener('load',
  function () {

    let LS = localStorage.getItem('data');
    console.log(LS)
    if (LS) {
      window.location = "http://localhost/gmaps/profile.html"
    }

  }, false);

function redirect() {

  window.location = "http://localhost/gmaps/ind.html";

};