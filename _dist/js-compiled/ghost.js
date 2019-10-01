"use strict";

/* global Vue */

/* global VueResource */

/* global VueRouter */
Vue.use(VueResource);
Vue.use(VueRouter);
var router = new VueRouter({
  mode: 'history',
  routes: []
});
var app = new Vue({
  el: '#ghost-app',
  router: router,
  template: "<div class='app'>\n              <div class='splashscreen'>\n                <div class='splashscreen__inner'>\n                  <h1 class='splashscreen__header'>\n                    <span class='title__krista'>Krista Perry's</span>\n                    <span class='title__appname'>Ghost App!</span>\n                  </h1>\n                </div>\n                <img class='splashscreen__logo' src='./img/splashscreen/grave.png' alt='ghost machine logo'>\n              </div>\n                <div class='app__inner'>\n                  <button class='about__button' @click='aboutToggle($event)' aria-expanded='false'>\n                    <img class='open' src='./img/icons/about.png' alt='about section'>\n                    <img class='close' src='./img/icons/close.png' alt='about section'>\n                    <span>About This App</span>\n                  </button>\n                  <div class='about' aria-hidden='true'>\n                    <div class='about__inner'>\n                      <div class='about__content'>\n                        <h2 class='about__header'>About Ghost Machine</h2>\n                        <div class='about-slider'>\n                          <img class='about__img' src='./img/about/bio-1.jpg' alt='Krista and Rob, in ghost attire'>\n                          <img class='about__img' src='./img/about/bio-2.jpg' alt='Krista and Rob, in ghost attire'>\n                        </div>\n                        <div class='about__desc'>\n                          <p>Ghost Machine began as a silly no-name illustration series by artist Krista Perry throughout 2016 and 17. After much encouragement from her web developing partner Robert Bernier, the two joined forces to create an app that would allow others to create and share their own ghosts.</p>\n                        </div>\n                        <div class='about__donate'>\n                          <p>All donations go to replenishing their kitty\u2019s litter and keeping food in their bellies.</p>\n                          <a href='https://paypal.me/ghostapp' target=\"_blank\">\n                            <img src='./img/icons/donate.png' alt='donate'>\n                            <span>Donate</span>\n                          </a>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                  <div class='app__top'>\n                    <div class='control__left'>\n                      <button :class='{ jsloading: hat.loading }' v-on:click='updateFilterIndex(hat, false)'>\n                        <img src='./img/icons/arrow.png' alt='increment hat'>\n                        <span>Hat-</span>\n                      </button>\n                      <button :class='{ jsloading: head.loading }' v-on:click='updateFilterIndex(head, false)'>\n                        <img src='./img/icons/arrow.png' alt='increment head'>\n                        <span>Head-</span>\n                      </button>\n                      <button :class='{ jsloading: sheet.loading }' v-on:click='updateFilterIndex(sheet, false)'>\n                        <img src='./img/icons/arrow.png' alt='increment sheet'>\n                        <span>Sheet-</span>\n                      </button>\n                      <button :class='{ jsloading: shoes.loading }' v-on:click='updateFilterIndex(shoes, false)'>\n                        <img src='./img/icons/arrow.png' alt='increment shoes'>\n                        <span>Shoes-</span>\n                      </button>\n                    </div>\n\n                    <div class='ghost-container'>\n                      <div class='ghost'>\n                        <div class='ghost__body'>\n                          <div v-if='hat.choice !== 0' class='ghost__hat' :class=\"'ghost__hat--' + hat.choice\">\n                            <img :src=\"'./img/hat/' + hat.choice + '.png'\" alt=\"ghost hat\" draggable='false'>\n                          </div>\n                          <div class='ghost__head' :class=\"'ghost__head--' + head.choice\" >\n                            <img :src=\"'./img/head/' + head.choice + '.png'\" alt='ghost head' draggable='false'>\n                          </div>\n                          <div class='ghost__sheet' :class=\"'ghost__sheet--' + sheet.choice\">\n                            <img :src=\"'./img/sheet/' + sheet.choice + '.png'\" alt='ghost sheet' draggable='false'>\n                          </div>\n                          <div v-if='shoes.choice !== 0' class='ghost__shoes' :class=\"'ghost__shoes--' + shoes.choice\">\n                            <img :src=\"'./img/shoes/' + shoes.choice + '.png'\" draggable='false'>\n                          </div>\n                        </div>\n                      </div>\n                      <div class='ghost-print'>\n                        <img class='ghost-print__bg' src='./img/splashscreen/bg-lg.jpg' alt='ghost machine background'>\n\n                        <div class='ghost-print__logo'>\n                          <img class='logo' src='./img/splashscreen/grave.png' alt='ghost machine logo'>\n                          <p class='hashtag'>#kpghostmachine</p>\n                        </div>\n                      </div>\n                    </div>\n\n                    <div class='control__right'>\n                        <button :class='{ jsloading: hat.loading }' v-on:click='updateFilterIndex(hat, true)'>\n                          <img src='./img/icons/arrow.png' alt='increment hat'>\n                          <span>Hat+</span>\n                        </button>\n                        <button :class='{ jsloading: head.loading }' v-on:click='updateFilterIndex(head, true)'>\n                          <img src='./img/icons/arrow.png' alt='increment head'>\n                          <span>Head+</span>\n                        </button>\n                        <button :class='{ jsloading: sheet.loading }' v-on:click='updateFilterIndex(sheet, true)'>\n                          <img src='./img/icons/arrow.png' alt='increment sheet'>\n                          <span>Sheet+</span>\n                        </button>\n                        <button :class='{ jsloading: shoes.loading }' v-on:click='updateFilterIndex(shoes, true)'>\n                          <img src='./img/icons/arrow.png' alt='increment arrow'>\n                          <span>Shoes+</span>\n                        </button>\n                      </div>\n                    </div>\n\n                    <div class='app__bottom'>\n                      <button class='control__randomize' v-on:click='randomize()'>\n                        <img src='./img/icons/random.png' alt='randomize ghost'>\n                        <span>Randomize</span>\n                      </button>\n                      <button class='control__print' v-on:click='print()'>\n                        <img src='./img/icons/print.png' alt='print ghost'>\n                        <span>Print</span>\n                      </button>\n                    </div>\n\n                    <picture class='app__bg'>\n                        <source srcset=\"./img/splashscreen/bg-lg.jpg\" media=\"(min-width: 1025px)\" />\n                        <img srcset='./img/splashscreen/bg.jpg' alt=\"ghost background\" />\n                    </picture>\n                    <div class='countdown' :class=\"'countdown--' + printCount\">\n                      <div class='timer'>\n                        <div class='timer--3'>\n                          <img src='./img/countdown/3.png' alt='countdown number 3'>\n                        </div>\n                        <div class='timer--2'>\n                          <img src='./img/countdown/2.png' alt='countdown number 2'>\n                        </div>\n                        <div class='timer--1'>\n                          <img src='./img/countdown/1.png' alt='countdown number 1'>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n             </div>",
  data: {
    visited: false,
    printCount: 3,
    results: [],
    printing: false,
    hat: {
      filename: 'hat',
      choice: 0,
      optionct: 26,
      loading: false
    },
    head: {
      filename: 'head',
      choice: 0,
      optionct: 25,
      // total - 1
      loading: false
    },
    sheet: {
      filename: 'sheet',
      choice: 0,
      optionct: 21,
      loading: false
    },
    shoes: {
      filename: 'shoes',
      choice: 0,
      optionct: 15,
      loading: false
    }
  },
  created: function created() {
    // Check for Router param; if available, update filters
    if (this.$route.query.hat) {
      this.routerUpdateFilters();
    }
  },
  mounted: function mounted() {
    // Splashscreen session logic
    if (!sessionStorage.getItem("visited")) {
      sessionStorage.setItem("visited", "true");
      this.splashscreen();
    }
  },
  methods: {
    loadImage: function loadImage(obj, index) {
      var _this = this; // If hat or shoe has index of 0 (No hat or shoe option selected), skip loading of image


      if (index === 0 && (obj.filename === 'hat' || obj.filename === 'shoes')) {
        obj.choice = index;
        obj.loading = false;

        _this.routerUpdate();
      } else {
        var newImg = new Image();
        newImg.src = "./img/".concat(obj.filename, "/").concat(index, ".png");

        newImg.onload = function () {
          obj.choice = index;
          obj.loading = false;

          _this.routerUpdate();
        };
      }
    },
    updateFilterIndex: function updateFilterIndex(obj, isIncrementing) {
      var $tempChoice = obj.choice;
      obj.loading = true;

      if (isIncrementing) {
        if (obj.choice === obj.optionct) {
          $tempChoice = 0;
        } else {
          $tempChoice++;
        }
      } else {
        if (obj.choice === 0) {
          $tempChoice = obj.optionct;
        } else {
          $tempChoice--;
        }
      }

      this.loadImage(obj, $tempChoice);
      return false;
    },
    randomize: function randomize() {
      var _this = this;

      function randomizeOption(obj) {
        obj.loading = true;
        var sameNum = true;

        while (sameNum) {
          var randomNum = Math.floor(Math.random() * obj.optionct + 0);

          if (randomNum !== obj.choice) {
            sameNum = false;

            _this.loadImage(obj, randomNum);
          }
        }
      }

      randomizeOption(this.hat);
      randomizeOption(this.head);
      randomizeOption(this.sheet);
      randomizeOption(this.shoes);
    },
    print: function print() {
      var _this2 = this;

      if (this.printing === false) {
        var $ghostContainer = document.querySelector(".ghost-container");
        var $printCounter = document.querySelector(".countdown");
        var $app = document.querySelector(".app");
        this.printCount = 3;
        this.printing = true;
        $app.classList.add('js-printing');
        var timer = setInterval(function () {
          if (_this2.printCount > 1) {
            _this2.printCount--;
          } else {
            window.devicePixelRatio = 3;
            $ghostContainer.classList.add('js-print');
            $app.classList.remove('js-printing');
            $app.classList.add('js-flash');
            $printCounter.classList.remove('js-visible');
            _this2.printing = false;
            html2canvas($ghostContainer).then(function (canvas) {
              canvas.toBlob(function (blob) {
                var file = new Blob([blob], {
                  type: 'image/jpg'
                });
                saveAs(file, 'ghost.jpg');
                $ghostContainer.classList.remove('js-print');
                $app.classList.remove('js-flash');
                window.devicePixelRatio = 1;
                this.printCount = 3;
              });
            });
            clearInterval(timer);
          }
        }, 1000);
      }
    },
    splashscreen: function splashscreen() {
      var splash = document.getElementsByClassName('splashscreen')[0];
      var app = document.getElementsByClassName('app')[0];
      app.classList.add('js-firstvisit');
      splash.classList.add('js-grow');
      setTimeout(function () {
        splash.classList.remove('js-grow');
      }, 5000);
      setTimeout(function () {
        app.classList.add('js-show');
      }, 5300);
    },
    aboutToggle: function aboutToggle(e) {
      var $about = document.getElementsByClassName('about')[0];

      if (e.target.getAttribute('aria-expanded') === 'false') {
        e.target.setAttribute('aria-expanded', 'true');
        $about.setAttribute('aria-hidden', 'false');
      } else {
        e.target.setAttribute('aria-expanded', 'false');
        $about.setAttribute('aria-hidden', 'true');
      }
    },
    routerUpdateFilters: function routerUpdateFilters() {
      this.hat.choice = this.$route.query.hat;
      this.head.choice = this.$route.query.head;
      this.sheet.choice = this.$route.query.sheet;
      this.shoes.choice = this.$route.query.shoes;
    },
    routerUpdate: function routerUpdate() {
      this.$router.push({
        query: {
          hat: this.hat.choice,
          head: this.head.choice,
          sheet: this.sheet.choice,
          shoes: this.shoes.choice
        }
      });
    }
  }
});