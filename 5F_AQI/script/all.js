;(function(Vue) {
  Vue.component('aqi-detail', {
    props: {
      aqi: {
        type: Object,
        require: true
      }
    },
    template: `<ul class="content__info" v-if="aqi">
                <li>
                  <div class="content__info__left">
                    <div class="content__info__ch">臭氧</div>
                    <div class="content__info__en">O3 (ppb)</div>
                  </div>
                  <div class="content__info__num">{{ aqi.O3 }}</div>
                </li>
                <li>
                  <div class="content__info__left">
                    <div class="content__info__ch">懸浮微粒</div>
                    <div class="content__info__en">PM10 (μg/m³)</div>
                  </div>
                  <div class="content__info__num">{{ aqi['PM10'] }}</div>
                </li>
                <li>
                  <div class="content__info__left">
                    <div class="content__info__ch">細懸浮微粒</div>
                    <div class="content__info__en">PM2.5 (μg/m³)</div>
                  </div>
                  <div class="content__info__num">{{ aqi['PM2.5'] }}</div>
                </li>
                <li>
                  <div class="content__info__left">
                    <div class="content__info__ch">一氧化碳</div>
                    <div class="content__info__en">CO (ppm)</div>
                  </div>
                  <div class="content__info__num">{{ aqi.CO }}</div>
                </li>
                <li>
                  <div class="content__info__left">
                    <div class="content__info__ch">二氧化硫</div>
                    <div class="content__info__en">SO2 (ppb)</div>
                  </div>
                  <div class="content__info__num">{{ aqi['SO2'] }}</div>
                </li>
                <li>
                  <div class="content__info__left">
                    <div class="content__info__ch">二氧化氮</div>
                    <div class="content__info__en">NO2 (ppb)</div>
                  </div>
                  <div class="content__info__num">{{ aqi['NO2'] }}</div>
                </li>
              </ul>`
  })
  Vue.component('aqi-site', {
    props: {
      zone: {
        type: Object,
        require: true
      }
    },
    template: `<div class="content__zone" v-if="zone">
                <div class="content__zone__name">{{ zone.SiteName }}</div>
                <div class="content__zone__aqi" :class="[zone.ColorClass]">
                  {{ zone.AQI }}
                </div>
              </div>`
  })

  let vm = new Vue({
    el: '#app',
    data() {
      return {
        currentCountyName: '請選擇地區',
        currentSiteName: '',
        aqiData: [],
        rangeData: [
          {
            min: 0,
            max: 50,
            status: '良好',
            colorClass: 'aqi-0'
          },
          {
            min: 51,
            max: 100,
            status: '普通',
            colorClass: 'aqi-51'
          },
          {
            min: 101,
            max: 150,
            status: '對敏感族群不健康',
            colorClass: 'aqi-101'
          },
          {
            min: 151,
            max: 200,
            status: '對所有族群不健康',
            colorClass: 'aqi-151'
          },
          {
            min: 201,
            max: 300,
            status: '非常不健康',
            colorClass: 'aqi-201'
          },
          {
            min: 301,
            max: 400,
            status: '危害',
            colorClass: 'aqi-301'
          }
        ]
      }
    },
    computed: {
      countyList() {
        //縣市列表
        let county = new Set()
        this.aqiData.forEach(data => {
          county.add(data.County)
        })
        return Array.from(county)
      },
      publishTime() {
        //更新時間
        if (!this.aqiData[0]) return false
        return this.aqiData[0].PublishTime
      },
      currentCounty() {
        //選擇的鄉鎮列表
        let zoneData = this.aqiData.filter(data => {
          return data.County === this.currentCountyName
        })
        return zoneData.map(data => {
          data.ColorClass = this.aqiColorClass(data.Status) // ColorClass
          return data
        })
      },
      currentSite() {
        //選擇的鄉鎮
        if (!this.currentSiteName) return this.currentCounty[0]
        let siteData = this.currentCounty.filter(data => {
          return data.SiteName === this.currentSiteName
        })
        return siteData[0]
      }
    },
    methods: {
      aqiColorClass(status) {
        let statusColor = this.rangeData.filter(range => {
          return range.status === status
        })
        return statusColor[0].colorClass
      },
      clickZone(site) {
        this.currentSiteName = site
        this.aqiData.forEach(data => {
          if (data.SiteName === site) data.active = !data.active
        })
      }
    },
    watch: {
      currentCountyName() {
        this.currentSiteName = ''
      }
    },
    mounted() {
      let api =
        'https://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259?sort=SiteName&offset=0&limit=1000'

      fetchJsonp(api)
        .then(res => {
          return res.json()
        })
        .then(res => {
          if (!res.success) return false
          this.aqiData = res.result.records.map(data => {
            data.active = false
            return data
          })
          // console.log(res.result.records)
        })
        .catch(ex => {
          console.log('parsing failed', ex)
        })
    }
  })
})(Vue)
