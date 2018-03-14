console.log('Starting up');

var gProjs;

var $document = $(document);
$document.ready(init);


function init() {

  gProjs = getProjs();
  renderTodos(gProjs);

}

function renderTodos(projs) {

  //modal
  renderModals($('.modal-container'));
  //portfolio
  renderPortfolios($('.portfolio-container'));

}

function getProjs() {

  var projs = [

    {
      "id": "minesweeper",
      "name": "Minesweeper",
      "title": "Better pop those mines",
      "desc": "lorem ipsum lorem ipsum lorem ipsum", "url": "projs/sokoban",
      "publishedAt": 1448693940000,
      "labels": ["Matrixes", "keyboard events"],
    },

    {
      "id": "sokoban",
      "name": "Sokoban",
      "title": "Better push those boxes",
      "desc": "lorem ipsum lorem ipsum lorem ipsum", "url": "projs/Sokoban",
      "publishedAt": 1448693940001,
      "labels": ["Matrixes", "keyboard events"],
    },

    {
      "id": "pacman",
      "name": "Pacman",
      "title": "Better push those boxes",
      "desc": "lorem ipsum lorem ipsum lorem ipsum", "url": "projs/Sokoban",
      "publishedAt": 1448693940002,
      "labels": ["Matrixes", "keyboard events"],
    },

    {
      "id": "guess the logo",
      "name": "Guess the logo",
      "title": "Better push those boxes",
      "desc": "lorem ipsum lorem ipsum lorem ipsum", "url": "projs/Sokoban",
      "publishedAt": 1448693940003,
      "labels": ["Matrixes", "keyboard events"],
    },

    {
      "id": "chess",
      "name": "Chess",
      "title": "Better push those boxes",
      "desc": "lorem ipsum lorem ipsum lorem ipsum", "url": "projs/Sokoban",
      "publishedAt": 1448693940003,
      "labels": ["Matrixes", "keyboard events"],
    }
  ]

  return projs;

}


function renderPortfolios($elPortfolios) {

  var strHtmls = `
    <section class="bg-light" id="portfolio">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading">Portfolio</h2>
          <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
        </div>
      </div>
      <div class="row">
      `;

  gProjs.forEach(function (gProjs, idx) {
    var strHtml = `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx + 1}">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src="proj/${gProjs.id}/img/${gProjs.id}.png" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${gProjs.name}</h4>
            <p class="text-muted">${gProjs.title}</p>
          </div>
        </div>
      `;
    strHtmls += strHtml;
  });
  strHtmls += `
       </div>
       </div>
       </section>
        ` ;

  $elPortfolios.html(strHtmls);
}



function renderModals($elModals) {

  var strHtmls = '';

  gProjs.forEach(function (gProjs, idx) {
    var strHtml = `
    <div class="portfolio-modal modal fade" id="portfolioModal${idx + 1}" tabindex="-1" role="dialog" aria-hidden="true">
       <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${gProjs.name}</h2>
                <p class="item-intro text-muted">${gProjs.title}</p>
                <img class="img-fluid d-block mx-auto" src="proj/${gProjs.id}/img/${gProjs.id}.png" alt="">
                <p>${gProjs.desc}</p>
                <h3>key-words:</h3>
                  <ul class="list-inline">
                  <li>${gProjs.labels[0]}</li>
                  <li>${gProjs.labels[1]}</li>
                </ul>
                <a href="proj/${gProjs.id}/index.html" class="icon-block">
                <button>Play</button>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      `;
    strHtmls += strHtml;
  });
  $elModals.html(strHtmls);
}

function contactMe(){

  var inputEmail = $("input[type=email]").val();
  var inputSubject = $("input[type=subject]").val();
  var inputMessage = $("input[type=message]").val();

  $("#contact button").
  html(`<a href="https://mail.google.com/mail/?view=cm&fs=1&to=${inputEmail}&su=${inputSubject}&body=${inputMessage}" style="color:inherit">Submit</a>`);

}

