;(function(Vue) {
  let vm = new Vue({
    el: '#app',
    data() {
      return {
        process: '',
        number: '0',
        isResult: false
      }
    },
    computed: {
      //轉換千分位
      localNumber() {
        let num = this.number.split('.')
        num[0] = this.toCurrency(num[0])
        return num.join('.')
      },
      fontSize() {
        let length = this.number.length
        let size = 56
        if (length > 9) size = 56 - (length - 9) * 4
        const smallest = 16
        if (size < smallest) size = smallest
        return size
      }
    },
    methods: {
      clickNumber(val) {
        // 如果按過等於在按數字就重新機算
        if (this.isResult) {
          this.number = '0'
          this.process = ''
          this.isResult = false
        }

        if (val === '.') {
          if (this.number.indexOf('.') === -1) this.number += val
        } else if (this.number !== '0') this.number += val
        else {
          if (val === '0' || val === '00') this.number = '0'
          else this.number = val
        }
      },
      clickCalc(val) {
        if (this.number === '0' || this.number === '0.') return false
        let temp = `${this.localNumber} ${val} `
        if (this.isResult) {
          this.process = temp
          this.isResult = false
        } else {
          this.process += temp
        }
        this.number = '0'
      },
      clickAC() {
        this.process = ''
        this.number = '0'
        this.isResult = false
      },
      clickRemove() {
        if (this.isResult) return false
        let length = this.number.length
        if (length === 1) this.number = '0'
        else this.number = this.number.substr(0, length - 1)
      },
      clickResult() {
        if (this.isResult) return false
        this.isResult = true

        // 計算不完整把加減乘除移除
        if (this.number === '0' || this.number === '0.')
          this.process = this.process.substr(0, this.process.length - 2)
        else this.process += this.localNumber

        let strNumber = this.process
          .replace(/ /g, '')
          .replace(/,/g, '')
          .replace(/÷/g, '/')
          .replace(/×/g, '*')
        let res = eval(strNumber) + ''
        this.number = res
      },
      toCurrency(text) {
        return text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      },
      calcFontSize() {
        let length = this.number.length
        let size = 56
        if (length > 9) size = 56 - (length - 9) * 4
        const smallest = 16
        if (size < smallest) size = smallest
        return size
      }
    }
  })
})(Vue)
