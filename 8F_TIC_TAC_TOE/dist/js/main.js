;(function() {
  const AppButton = {
    template: `<button 
                :style="baseStyle" 
                class="btn" 
                @click="btnHandler"
                >
                <slot></slot>
              </button>`,
    props: {
      fontColor: {
        type: String,
        require: true,
        default: '#FF6D70'
      },
      backgroundColor: {
        type: String,
        require: true,
        default: '#fff'
      }
    },
    computed: {
      baseStyle() {
        return {
          color: this.fontColor,
          backgroundColor: this.backgroundColor
        }
      }
    },
    methods: {
      btnHandler() {
        this.$emit('btn-handler')
      }
    }
  }

  let vm = new Vue({
    el: '#app',
    components: {
      AppButton
    },
    data() {
      return {
        step: 0,
        page: 'hall',
        turn: 1, //1x 10o
        sections: [0, 0, 0, 0, 0, 0, 0, 0, 0], //1x 10o
        score: {}
      }
    },
    computed: {
      pageColor() {
        let background = '#000'
        if (this.page === 'game') background = '#FF6D70'
        return { backgroundColor: background }
      },
      winner() {
        if (this.step < 5) return null
        let winner = null
        const gameResult = [
          this.sections[0] + this.sections[1] + this.sections[2],
          this.sections[3] + this.sections[4] + this.sections[5],
          this.sections[6] + this.sections[7] + this.sections[8],
          this.sections[0] + this.sections[3] + this.sections[6],
          this.sections[1] + this.sections[4] + this.sections[7],
          this.sections[2] + this.sections[5] + this.sections[8],
          this.sections[0] + this.sections[4] + this.sections[8],
          this.sections[2] + this.sections[4] + this.sections[6]
        ]

        let result = gameResult.find(res => {
          return res === 3 || res === 30
        })
        if (result === 3) {
          winner = 'x'
          this.score['cross']++
        } else if (result === 30) {
          winner = 'o'
          this.score['circle']++
        } else if (winner === null && this.step === 9) winner = 'no'

        localStorage.setItem('score', JSON.stringify(this.score))
        this.getScore()

        return winner
      }
    },
    methods: {
      startGame() {
        this.page = 'game'
      },
      restartGame() {
        this.page = 'hall'
        this.sections = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.turn = 1
        this.step = 0
      },
      playHandler(index) {
        if (this.sections[index] !== 0) return false
        this.$set(this.sections, index, this.turn)
        if (this.turn === 1) this.turn = 10
        else this.turn = 1
        this.step++
      },
      getScore() {
        let score = JSON.parse(localStorage.getItem('score')) || {
          circle: 0,
          cross: 0
        }
        this.score = score
      },
      resetScore() {
        let score = {
          circle: 0,
          cross: 0
        }
        localStorage.setItem('score', JSON.stringify(score))
        this.getScore()
      }
    },
    mounted() {
      this.getScore()
    }
  })
})()
