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
                  <h1>
                    <span class='title__krista'>Krista Perry's</span>
                    <span class='title__appname'>Ghost App!</span>
                  </h1>
                </div>
              </div>
                <div class='app__inner'>
                  <div class='app__top'>
                    <div class='control__left'>
                      <button v-on:click='updateFilterIndex(hat, false)'><span>Hat-</span></button>
                      <button v-on:click='updateFilterIndex(head, false)'><span>Head-</span></button>
                      <button v-on:click='updateFilterIndex(pattern, false)'><span>Sheet-</span></button>
                      <button v-on:click='updateFilterIndex(shoes, false)'><span>Shoes-</span></button>
                    </div>

                    <div class='ghost-container'>
                      <div class='ghost'>
                        <div class='ghost__body'>
                          <div v-if='hat.choice !== 0' class='ghost__hat' :class="'ghost__hat--' + hat.choice">
                            <img :src="'./img/hats/' + hat.choice + '.png'">
                          </div>
                          <div class='ghost__head' :class="'ghost__head--' + head.choice">
                            <img :src="'./img/head/' + head.choice + '.png'">
                          </div>
                          <div v-if='pattern.choice !== 0' class='ghost__pattern' :class="'ghost__pattern--' + pattern.choice">
                            <img :src="'./img/pattern/' + pattern.choice + '.png'">
                          </div>
                          <div v-if='shoes.choice !== 0' class='ghost__shoes' :class="'ghost__shoes--' + shoes.choice">
                            <img :src="'./img/shoes/' + shoes.choice + '.png'">
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class='control__right'>
                        <button v-on:click='updateFilterIndex(hat, true)'><span>Hat+</span></button>
                        <button v-on:click='updateFilterIndex(head, true)'><span>Head+</span></button>
                        <button v-on:click='updateFilterIndex(pattern, true)'><span>Sheet+</span></button>
                        <button v-on:click='updateFilterIndex(shoes, true)'><span>Shoes+</span></button>
                      </div>
                    </div>

                    <div class='app__bottom'>
                      <button v-on:click='randomize()'><span>Randomize</span></button>
                    </div>
                  </div>
             </div>`,
  data: {
    visited: false,
    results: [],
    hat:{
      choice: 0,
      optionct: 3,   
    },
    head:{
      choice: 1,
      optionct: 10,  // total - 1
    }, 
    pattern:{
      choice: 0,
      optionct: 3,    
    },
    shoes:{
      choice: 0,
      optionct: 3,   
    },
  },

  created: function created() {
  },

  mounted: function() {
    // Splashscreen session logic
    if (!sessionStorage.getItem("visited")) {
      sessionStorage.setItem("visited", "true");
      this.splashscreen();
    }
  },

  methods: {
    updateFilterIndex(obj, isIncrementing) {
      if (isIncrementing) {
        if (obj.choice === obj.optionct) {
          obj.choice = 0;
        } else {
          obj.choice++;
        }
      }
      else {
        if (obj.choice === 0) {
          obj.choice = obj.optionct;
        } else {
          obj.choice--;
        }
      }

      return false;
    },

    randomize() {
      function randomizeOption(obj) {
        let sameNum = true;
        while (sameNum) {
          let randomNum = Math.floor((Math.random() * obj.optionct) + 0);
          if (randomNum !== obj.choice) {
            obj.choice = randomNum;
            sameNum = false;
          }
        }
      }

      randomizeOption(this.hat);
      randomizeOption(this.head);
      randomizeOption(this.pattern);
      randomizeOption(this.shoes);
    },

    splashscreen() {
      const splash = document.getElementsByClassName('splashscreen')[0];
      const app = document.getElementsByClassName('app')[0];

      app.classList.add('js-firstvisit');
      splash.classList.add('js-grow');

      setTimeout(() => {
        splash.classList.remove('js-grow');
      }, 1000);

      setTimeout(() => {
        app.classList.add('js-show');
      }, 1300);
    }
  }
})