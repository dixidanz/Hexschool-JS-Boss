;(function() {
  const MAIN_NUM_BEGIN = 2
  const MAIN_NUM_TOTAL = 9
  const MUL_NUM_BEGIN = 1
  const MUL_NUM_TOTAL = 9

  let html = ''

  for (let i = MAIN_NUM_BEGIN; i <= MAIN_NUM_TOTAL; i++) {
    html += `<div class="card list">
              <h2 class="list__title">${i}</h2>`
    for (let j = MUL_NUM_BEGIN; j <= MUL_NUM_TOTAL; j++) {
      console.log(`${i} x ${j} = ${i * j}`)
      html += `<span class="list__item">${i} x ${j} = ${i * j}</span>`
    }
    html += `</div>`
  }

  const list = document.querySelector('.wrap')
  list.innerHTML += html
})()
