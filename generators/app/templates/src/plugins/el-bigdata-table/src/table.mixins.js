/* eslint-disable no-return-assign */
import { Table } from 'element-ui'

const oldDoLayoutHandler = Table.methods.doLayout
Table.methods.doLayout = function (...arg) {
  oldDoLayoutHandler.call(this, ...arg)

  if (this.useVirtual) {
    let position = 0

    this.columnsPosition = this.columns.map(({ realWidth = 0, width = 0, minWidth = 0 }, columnIdx) => {
      return [position, position += Math.max(realWidth, width || minWidth)]
    })

    this.computeScrollToColumn(this.scrollLeft)
  }
}

export default {
  props: {
    rowHeight: {
      type: Number,
      default: 50
    },
    excessRows: {
      type: Number,
      default: 5
    },
    excessColumns: {
      type: Number,
      default: 0
    },
    useVirtual: Boolean,
    useRowKey: Boolean
  },
  data() {
    return {
      scrollTop: 0,
      scrollLeft: 0,
      columnsPosition: {},
      innerTop: 0,
      start: 0,
      end: 0,
      columnStart: 0,
      columnEnd: 0
    }
  },
  computed: {
    visibleCount() {
      return Math.ceil(this.height / this.rowHeight)
    },

    virtualBodyHeight() {
      const {
        data
      } = this.store.states

      return data ? data.length * this.rowHeight : 0
    }
  },
  watch: {
    scrollTop: {
      immediate: true,
      handler(top) {
        this.computeScrollToRow(top)
      }
    },

    scrollLeft(left) {
      this.computeScrollToColumn(left)
    },

    virtualBodyHeight() {
      if (this.useVirtual) setTimeout(this.doLayout, 10)
    },

    height() {
      if (this.useVirtual) this.computeScrollToRow(this.scrollTop)
    }
  },
  mounted() {
    if (this.useVirtual) {
      this.bindEvent('bind')
    }
  },
  activated() {
    if (this.useVirtual) {
      this.scrollTop = 0
      this.bindEvent('bind')
    }
  },
  deactivated() {
    if (this.useVirtual) {
      this.bindEvent('unbind')
    }
  },
  beforeDestroy() {
    if (this.useVirtual) {
      this.bindEvent('unbind')
    }
  },
  methods: {
    bindEvent(action) {
      const tableBodyWrapper = this.$el.querySelector('.el-table__body-wrapper')

      if (!this.binded && action === 'bind') {
        tableBodyWrapper.addEventListener('scroll', this.handleScroll)
        this.binded = true
      } else if (this.binded && action === 'unbind') {
        tableBodyWrapper.removeEventListener('scroll', this.handleScroll)
        this.binded = false
      }
    },

    computeScrollToColumn(scrollLeft) {
      // eslint-disable-next-line one-var
      let start = 0, end = this.columns.length
      let visibleWidth = 0
      const bodyWidth = this.$el.clientWidth

      for (let i = 0; i < this.columnsPosition.length; i++) {
        const [left, right] = this.columnsPosition[i]

        if (scrollLeft >= left && scrollLeft < right) {
          start = i
          visibleWidth = right - scrollLeft
        } else if (left > scrollLeft) {
          visibleWidth += (right - left)
        }

        if (visibleWidth + this.layout.gutterWidth >= bodyWidth) {
          end = i
          break
        }
      }

      this.columnStart = start - this.excessColumns > 0 ? (start - this.excessColumns) : 0
      this.columnEnd = end + this.excessColumns < this.columns.length ? (end + this.excessColumns) : this.columns.length
    },

    computeScrollToRow(scrollTop) {
      let startIndex = parseInt(scrollTop / this.rowHeight)

      const { start, end } = this.getVisibleRange(startIndex)

      this.start = start
      this.end = end
      this.innerTop = this.start * this.rowHeight
    },

    getVisibleRange(expectStart) {
      const start = expectStart - this.excessRows

      return {
        start: start >= 0 ? start : 0,
        end: Math.max(expectStart, 0) + this.visibleCount + this.excessRows
      }
    },

    handleScroll(e) {
      const ele = e.srcElement || e.target
      let { scrollTop, scrollLeft } = ele
      const bodyScrollHeight = this.visibleCount * this.rowHeight

      // ?????? ????????? ???hover???????????????
      this.store.states.hoverRow = null

      if (this.virtualBodyHeight < scrollTop + bodyScrollHeight) {
        scrollTop = this.virtualBodyHeight - bodyScrollHeight
      }

      if (parseInt(this.scrollTop) !== parseInt(scrollTop)) {
        this.scrollTop = scrollTop
      }

      if (parseInt(this.scrollLeft) !== parseInt(scrollLeft)) {
        this.scrollLeft = scrollLeft
      }
    }
  }
}
