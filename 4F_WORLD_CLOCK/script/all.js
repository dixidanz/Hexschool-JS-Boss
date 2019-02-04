;(function() {
  let zoneData = [
    {
      timeZone: 'America/New_York',
      name: 'New York',
      bgClass: 'bgDark'
    },
    {
      timeZone: 'Europe/London',
      name: 'London',
      bgClass: 'bgLight'
    },
    {
      timeZone: 'Asia/Bangkok',
      name: 'Bangkok',
      bgClass: 'bgLight'
    },
    {
      timeZone: 'Asia/Taipei',
      name: 'Taiwan',
      bgClass: 'bgLight'
    },
    {
      timeZone: 'Australia/Sydney',
      name: 'Sydney',
      bgClass: 'bgDark'
    }
  ]
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: ''
  }
  function updateTime() {
    let date = new Date()
    let htmlTemplate = ''
    zoneData.forEach(zone => {
      options.timeZone = zone.timeZone
      const dateFormat = new Intl.DateTimeFormat('en-us', options).format(date)
      //month day, year, time
      const dateSplit = dateFormat.split(',')
      const time = dateSplit[2].trim()
      const year = dateSplit[1].trim()
      const dateMD = dateSplit[0].split(' ')
      const month = dateMD[0]
      const day = dateMD[1]
      htmlTemplate += `<li class="${zone.bgClass}">
                        <div class="zone__left">
                          <h2 class="zone__name">${zone.name}</h2>
                          <span class="zone__date">${day} ${month}. ${year}</span>
                        </div>
                        <div class="zone__right">
                          <h2 class="zone__time">${time}</h2>
                        </div>
                      </li>`
    })
    const zone = document.querySelector('.zone')
    zone.innerHTML = htmlTemplate
  }
  updateTime()
  setInterval(updateTime, 1000)
})()
