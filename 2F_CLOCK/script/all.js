;(function() {
  const hourHand = document.querySelector('.hour')
  const minuteHand = document.querySelector('.minute')
  const secondHand = document.querySelector('.second')

  let getTime = () => {
    const dt = new Date()

    const hours = dt.getHours()
    const minutes = dt.getMinutes()
    const seconds = dt.getSeconds()

    const secondsDeg = (360 / 60) * seconds - 180
    secondHand.style.transform = `rotate(${secondsDeg}deg)`
    const minutesDeg = (360 / 60) * minutes - 180 + (6 / 60) * seconds
    minuteHand.style.transform = `rotate(${minutesDeg}deg)`
    const hoursDeg = (360 / 12) * hours - 90 + (30 / 60) * minutes
    hourHand.style.transform = `rotate(${hoursDeg}deg)`
  }
  getTime()
  setInterval(getTime, 1000)
})()
