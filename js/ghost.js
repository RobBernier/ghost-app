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
                <div class='app__inner'>
                  <div class='app__top'>
                    <div class='control__left'>
                      <button v-on:click='updateFilterIndex(hat, false)'><span>Hat-</span></button>
                      <button v-on:click='updateFilterIndex(head, false)'><span>Head-</span></button>
                      <button v-on:click='updateFilterIndex(pattern, false)'><span>Pants-</span></button>
                      <button v-on:click='updateFilterIndex(shoes, false)'><span>Shoes-</span></button>
                    </div>

                    <div class='ghost-container'>
                      <div class='ghost'>
                        <div class='ghost__body'>
                          <div class='ghost__hat' :class="'ghost__hat--' + hat.options[hat.choice]">
                            <img :src="'./img/hats/' + hat.options[hat.choice] + '.png'">
                          </div>
                          <div class='ghost__head' :class="'ghost__head--' + head.options[head.choice]">
                            <img :src="'./img/head/' + head.options[head.choice] + '.png'">
                          </div>
                          <div v-if='pattern.choice !== 0' class='ghost__pattern' :class="'ghost__pattern--' + pattern.options[pattern.choice]">
                            <img :src="'./img/pattern/' + pattern.options[pattern.choice] + '.png'">
                          </div>
                          <div class='ghost__shoes' :class="'ghost__shoes--' + shoes.options[shoes.choice]">
                            <img :src="'./img/shoes/' + shoes.options[shoes.choice] + '.png'">
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class='control__right'>
                        <button v-on:click='updateFilterIndex(hat, true)'><span>Hat+</span></button>
                        <button v-on:click='updateFilterIndex(head, true)'><span>Head+</span></button>
                        <button v-on:click='updateFilterIndex(pattern, true)'><span>Panttern+</span></button>
                        <button v-on:click='updateFilterIndex(shoes, true)'><span>Shoes+</span></button>
                      </div>
                    </div>

                    <div class='app__bottom'>
                      <button v-on:click='randomize()'><span>Randomize</span></button>
                    </div>
                  </div>
             </div>`,
  data: {
    results: [],
    hat:{
      choice: 0,
      options: [
        '1',
        '2',
        '3',
      ],   
    },
    head:{
      choice: 0,
      options: [
        '1',
        '2',
        '3',
      ],   
    }, 
    pattern:{
      choice: 0,
      options: [
        '0',
        '1',
        '2',
        '3',
      ],   
    },
    shoes:{
      choice: 0,
      options: [
        '1',
        '2',
        '3',
      ],   
    },
  },

  created: function created() {
    // const $this = this;
    // const $jsonURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/calendar`;

    // this.$http.get($jsonURL)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     const resultArr = [];

    //     for (let key in data) {
    //       resultArr.push(data[key]);
    //     }

    //     // Remove old events
    //     const now = new Date();
    //     now.setHours(0,0,0,0);

    //     for (let i = resultArr.length - 1; i >= 0; i--) {
    //       if (new Date(resultArr[i].field_event_daterange_start_timestamp) < now) {
    //         resultArr.splice(i, 1);
    //       }
    //     }

    //     // Break hosts into array
    //     for (let i = 0; i < resultArr.length; i++) {
    //       resultArr[i].field_event_host_id = resultArr[i].field_event_host_id.split('|');
    //       resultArr[i].field_event_host_name = resultArr[i].field_event_host_name.split('|');
    //     }

    //     // Splice image to get image markup only
    //     for (let i = 0; i < resultArr.length; i++) {
    //       const img = resultArr[i].field_event_img.replace('Image', '');
    //       resultArr[i].field_event_img = img;
    //     }

    //     // Get start time and end tie for frontend
    //     for (let i = 0; i < resultArr.length; i++) {
    //       const srtTime = moment(resultArr[i].field_event_daterange_start_timestamp).format("HH:mm a");
    //       const endTime = moment(resultArr[i].field_event_daterange_end_timestamp).format("HH:mm a");

    //       resultArr[i].srtTime = srtTime;
    //       resultArr[i].endTime = endTime;
    //     }

    //     // Get array of all event and host types, Get all start dates and save to array for calendar
    //     $this.eventTypes = $this.getTypes(resultArr);
    //     $this.eventHosts = $this.getHosts(resultArr);
    //     $this.getDates(resultArr, $this);

    //     // console.log($jsonURL);
    //     // console.log(resultArr);
    //     $this.results = resultArr;
    //   });
  },

  mounted: function() {
  },

  methods: {
    updateFilterIndex(obj, isIncrementing) {
      if (isIncrementing) {
        if (obj.choice === obj.options.length - 1) {
          obj.choice = 0;
        } else {
          obj.choice++;
        }
      }
      else {
        if (obj.choice === 0) {
          obj.choice = obj.options.length - 1;
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
          let randomNum = Math.floor((Math.random() * obj.options.length) + 0);
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
    }
  }
})