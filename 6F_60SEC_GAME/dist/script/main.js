;(function() {
  let timer
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  Vue.directive('focus', {
    // When the bound element is inserted into the DOM...
    inserted: function(el) {
      // Focus the element
      el.focus()
    }
  })
  let vm = new Vue({
    el: '#app',
    data() {
      return {
        currentPage: 'opening', //opening, game, end
        score: 0,
        gameTime: 60,
        operationList: ['+', '-', '×', '÷'],
        operation: '',
        number1: '',
        number2: '',
        playerAnswer: ''
      }
    },
    computed: {
      gameTimer() {
        let hr = Math.floor(this.gameTime / 3600)
        let min = Math.floor((this.gameTime - hr * 3600) / 60)
        let sec = parseInt(this.gameTime - hr * 3600 - min * 60)

        min = this.addZero(min, 2)
        sec = this.addZero(sec, 2)
        return `${min} : ${sec}`
      },
      correctAnswer() {
        let operation = ''
        if (this.operation === '÷') operation = '/'
        else if (this.operation === '×') operation = '*'
        else operation = this.operation

        let correctAnswer = eval(this.number1 + operation + this.number2)
        return correctAnswer
      }
    },
    methods: {
      addZero(str, size) {
        if (str.length > size) return str
        return (Math.pow(10, size) + str + '').substr(1)
      },
      gameInit() {
        this.score = 0
        this.gameTime = 60
      },
      timerHandler() {
        this.gameTime -= 1
        if (this.gameTime === 0) {
          clearInterval(timer)
          this.currentPage = 'end'
          return false
        }
      },
      topicMake() {
        // 隨機產生加減乘除
        let operation = getRandom(0, 3)
        this.operation = this.operationList[operation]
        //隨機產生數字
        this.playerAnswer = ''
        if (this.gameTime > 40) {
          this.number1 = getRandom(1, 9)
          this.number2 = getRandom(1, 9)
        } else if (this.gameTime > 20) {
          this.number1 = getRandom(10, 99)
          this.number2 = getRandom(10, 99)
        } else {
          this.number1 = getRandom(100, 999)
          this.number2 = getRandom(100, 999)
        }
        //除法整除
        if (this.operation === '÷') {
          if (this.number1 < this.number2)
            [this.number1, this.number2] = [this.number2, this.number1]
          let remainder = this.number1 % this.number2
          if (remainder !== 0) this.number1 -= remainder
        }
      },
      startGame() {
        this.gameInit()
        this.currentPage = 'game'
        this.topicMake()
        timer = setInterval(this.timerHandler, 1000)
      },
      play() {
        if (this.playerAnswer !== this.correctAnswer + '') this.score -= 1
        else {
          if (this.gameTime < 20) this.score += 5
          else this.score += 1
        }
        if (this.score < 0) this.score = 0
        this.topicMake()
      }
    }
  })
})()
