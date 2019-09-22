Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [],
});

const app = new Vue({
  el: '#ghost-app',
  router,
  template: `<div class='app'>
              <div class='splashscreen'>
                <div class='splashscreen__inner'>
                  <h1 class='splashscreen__header'>
                    <span class='title__krista'>Krista Perry's</span>
                    <span class='title__appname'>Ghost App!</span>
                  </h1>
                </div>
                <img class='splashscreen__logo' src='./img/splashscreen/grave.png' alt='ghost machine logo'>
              </div>
                <div class='app__inner'>
                  <button class='about__button' @click='aboutToggle($event)' aria-expanded='false'><span>About This App</span></button>
                  <div class='about' aria-hidden='true'>
                    <div class='about__inner'>
                      <div class='about__content'>
                        <h2 class='about__header'>About Ghost Machine</h2>
                        <div class='about-slider'>
                          <img class='about__img' src='./img/about/bio.jpg' alt='Krista and Rob, in ghost attire'>
                          <img class='about__img' src='./img/about/bio2.jpg' alt='Krista and Rob, in ghost attire'>
                        </div>
                        <div class='about__desc'>
                          <p>Ghost machine was designed and developed with love over the course of several months. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint beatae odit magnam dolorem repudiandae ab, excepturi laboriosam voluptates fugit, quas, eveniet adipisci quibusdam tempora suscipit eos ad et aliquam similique! A sentence that should give you incentive to donate.</p>
                        </div>
                        <div class='about__donate'>
                          <p>All donations go to keeping this site alive and putting food in our bellies.</p>
                          <a href='https://paypal.me/ghostapp' target="_blank"><span>Donate!</span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class='app__top'>
                    <div class='control__left'>
                      <button :class='{ jsloading: hat.loading }' v-on:click='updateFilterIndex(hat, false)'><span>Hat-</span></button>
                      <button :class='{ jsloading: head.loading }' v-on:click='updateFilterIndex(head, false)'><span>Head-</span></button>
                      <button :class='{ jsloading: sheet.loading }' v-on:click='updateFilterIndex(sheet, false)'><span>Sheet-</span></button>
                      <button :class='{ jsloading: shoes.loading }' v-on:click='updateFilterIndex(shoes, false)'><span>Shoes-</span></button>
                    </div>

                    <div class='ghost-container'>
                      <div class='ghost'>
                        <div class='ghost__body'>
                          <div v-if='hat.choice !== 0' class='ghost__hat' :class="'ghost__hat--' + hat.choice">
                            <img :src="'./img/hat/' + hat.choice + '.png'" alt="ghost hat" draggable='false'>
                          </div>
                          <div class='ghost__head' :class="'ghost__head--' + head.choice" >
                            <img :src="'./img/head/' + head.choice + '.png'" alt='ghost head' draggable='false'>
                          </div>
                          <div class='ghost__sheet' :class="'ghost__sheet--' + sheet.choice">
                            <img :src="'./img/sheet/' + sheet.choice + '.png'" alt='ghost sheet' draggable='false'>
                          </div>
                          <div v-if='shoes.choice !== 0' class='ghost__shoes' :class="'ghost__shoes--' + shoes.choice">
                            <img :src="'./img/shoes/' + shoes.choice + '.png'" draggable='false'>
                          </div>
                        </div>
                      </div>
                      <div class='ghost-print'>
                        <img class='ghost-print__bg' src='./img/splashscreen/bg.png' alt='ghost machine background'>

                        <div class='ghost-print__logo'>
                          <img class='logo' src='./img/splashscreen/grave.png' alt='ghost machine logo'>
                          <p class='hashtag'>#kpghostmachine</p>
                        </div>
                      </div>
                    </div>

                    <div class='control__right'>
                        <button :class='{ jsloading: hat.loading }' v-on:click='updateFilterIndex(hat, true)'><span>Hat+</span></button>
                        <button :class='{ jsloading: head.loading }' v-on:click='updateFilterIndex(head, true)'><span>Head+</span></button>
                        <button :class='{ jsloading: sheet.loading }' v-on:click='updateFilterIndex(sheet, true)'><span>Sheet+</span></button>
                        <button :class='{ jsloading: shoes.loading }' v-on:click='updateFilterIndex(shoes, true)'><span>Shoes+</span></button>
                      </div>
                    </div>

                    <div class='app__bottom'>
                      <button v-on:click='randomize()'><span>Randomize</span></button>
                      <button v-on:click='print()'><span>Print</span></button>
                    </div>

                    <img class='app__bg' src='./img/splashscreen/bg.png' alt='ghost machine background'>
                  </div>
             </div>`,
  data: {
    visited: false,
    results: [],
    hat: {
      filename: 'hat',
      choice: 0,
      optionct: 7,
      loading: false,
    },
    head: {
      filename: 'head',
      choice: 0,
      optionct: 16, // total - 1
      loading: false,
    },
    sheet: {
      filename: 'sheet',
      choice: 0,
      optionct: 11,
      loading: false,
    },
    shoes: {
      filename: 'shoes',
      choice: 0,
      optionct: 3,
      loading: false,
    },
  },

  created: function created() {},

  mounted: function () {
    // Splashscreen session logic
    if (!sessionStorage.getItem("visited")) {
      sessionStorage.setItem("visited", "true");
      this.splashscreen();
    }
  },

  methods: {
    loadImage(obj, index) {
      // If hat or shoe has index of 0 (No hat or shoe option selected), skip loading of image
      if (index === 0 && (obj.filename === 'hat' || obj.filename === 'shoes')) {
        obj.choice = index;
        obj.loading = false;
      } else {
        const newImg = new Image;
        newImg.src = `./img/${obj.filename}/${index}.png`;
        newImg.onload = function () {
          obj.choice = index;
          obj.loading = false;
        }
      }
    },

    updateFilterIndex(obj, isIncrementing) {
      let $tempChoice = obj.choice;
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

    randomize() {
      const _this = this;

      function randomizeOption(obj) {
        obj.loading = true;
        let sameNum = true;
        while (sameNum) {
          let randomNum = Math.floor((Math.random() * obj.optionct) + 0);
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

    print() {
      const $ghostContainer = document.querySelector(".ghost-container");
      $ghostContainer.classList.add('js-print');

      html2canvas($ghostContainer).then(canvas => {
        canvas.toBlob(function(blob) {
          saveAs(blob, 'ghost.png');
          $ghostContainer.classList.remove('js-print');
        });
      });
    },

    splashscreen() {
      const splash = document.getElementsByClassName('splashscreen')[0];
      const app = document.getElementsByClassName('app')[0];

      app.classList.add('js-firstvisit');
      splash.classList.add('js-grow');

      setTimeout(() => {
        splash.classList.remove('js-grow');
      }, 5000);

      setTimeout(() => {
        app.classList.add('js-show');
      }, 5300);
    },

    aboutToggle(e) {
      const $about = document.getElementsByClassName('about')[0];

      if (e.target.getAttribute('aria-expanded') === 'false') {
        e.target.setAttribute('aria-expanded', 'true');
        $about.setAttribute('aria-hidden', 'false');
      } else {
        e.target.setAttribute('aria-expanded', 'false');
        $about.setAttribute('aria-hidden', 'true');
      }
    }
  }
})