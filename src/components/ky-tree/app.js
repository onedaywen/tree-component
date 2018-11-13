import TreeInput from './tree-input.vue'
import TreeTab from './tree-tab.vue'
import TreeItem from './tree-item.vue'
import { uniqueKey, remove, genOriginData } from './utils'
import treeJson from './tree.json'
const keypid = "p"; // 节点父级id
const keyid = "i"; // 节点自身id
// const keylastNode = "v"; // 是否为最后一个节点
export default {
  name: 'tree',
  props: {
    // 最多能选中的数量
    max: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      inputParam: {
        placeholder: '点部/车牌号',
        value: '沪D'
      },
      tabParam: {
        value: '1',
        options: [
          {
            label: '运输车辆',
            value: '1'
          },
          {
            label: '市场车辆',
            value: '2'
          }
        ]
      },
      keyid: 'i',
			keypid: 'p',
			originData: [],
			idObj: {
        // id01: treeItem
      },
			pidObj: {
        // pid01: [child01, child02, ...]
      },
			treeData: [],
      height: 30,
      checkedList: []
    }
  },
  components: {
    TreeInput,
    TreeTab,
    TreeItem
  },
  mounted() {
    this.getTreeData()
  },
  methods: {
    getTreeData () {
      setTimeout(() => {
        this.originData = treeJson
        if (this.originData && this.originData.length) {
          this.dataInit()
          let desc = this.getDescByPid({
            pid: 0,
            all: false
          })
          this.treeData = desc
        }
      }, 500)
    },
    search () {
      let value = this.inputParam.value.trim()
      const { originData, idObj } = this
      
      originData.forEach(item => item.show = false)
      let topItem = idObj['1']
      //无值搜索时 只显示最顶级节点
      if (!value) {
        topItem.show = true
        topItem.open = true
        topItem.key = uniqueKey()
        this.treeData = originData.filter(item => item.show)
        return
      }
      for (let len = originData.length, i = 0; i < len; i++) {
        let item = originData[i]
        // 找到符合的节点
        if (item.n.indexOf(value) > -1) {
          // 从下往上找节点链
          item.open = false
          let chain = [item]
          while(idObj[item.p]) {
            item = idObj[item.p]
            chain.unshift(item)
          }
          // 遍历节点链， 最顶级的子节点要显示、依次到底
          for (let j = 0, jLen = chain.length; j < jLen; j++) {
            let chainItem = chain[j]
            chainItem.show = true
            chainItem.open = false
            chainItem.key = uniqueKey()
          }
        }
      }
      this.treeData = originData.filter(item => item.show)
      document.querySelector('.tree-item-box').scrollTop = 0
    },
    handleTabChange (tabItem, tabValue) {
      console.log(tabItem, tabValue)
    },
		dataInit () {
			const originData = this.originData
			const idObj = {}
      const pidObj = {}
			for(let i = 0, len = originData.length; i < len; i++) {
				let item = originData[i]
				let id = item[keyid]
				let pid = item[keypid]
				item.checked = false
				item.open = true
        item.show = false
        item.key = uniqueKey()
				if (pid == 0) {
					item.show = true
				}
				idObj[id] = item
				if (!pidObj[pid]) {
					pidObj[pid] = []
				}
				pidObj[pid].push(item)
			}
			this.idObj = idObj
      this.pidObj = pidObj
      let desc = this.getDescByPid({
        pid: 0,
        all: true
      })
      this.originData = desc// 已经按顺序排好
		},
    // 事件委托
    handleDelegate (e) {
      let classList = e.target.classList
      let isIcon = classList.contains('icon')
      if (!isIcon) {
        return
      }
      let isIconOpen = classList.contains('icon-open')
      let isIconClose = classList.contains('icon-close')
      let isIconCheckbox = classList.contains('icon-checkbox')
      let isIconChecked = classList.contains('icon-checked')
      let { id, pid } = e.target.parentNode.dataset
      if (isIconOpen) {
        this.handleOpen({ id })
      } else if (isIconClose) {
        this.handleClose({ id })
      }  else if (isIconCheckbox) {
        this.handleCheckbox({id, pid})
      }  else if (isIconChecked) {
        this.handleChecked({id, pid})
      } 
    },
    handleOpen (param) {
      console.log('handleOpen')
      const { idObj } = this
      let { id } = param
      const item = idObj[id]
      const son = this.getDescByPid({
        pid: id,
        all: false
      })
      const desc = this.getDescByPid({
        pid: id,
        all: true
      })
      item.open = false
      item.show = true
      item.key = uniqueKey()
      desc.forEach(curr => {
        curr.open = true
      })
      son.forEach(curr => {
        curr.show = true
      })
      this.treeData = this.originData.filter(item => item.show)
    },
    handleClose (param) {
      console.log('handleClose')
      const { idObj } = this
      let { id } = param
      const item = idObj[id]
      const desc = this.getDescByPid({
        pid: id,
        all: true
      })
      item.open = true
      item.key = uniqueKey()
      desc.forEach(curr => {
        curr.open = true // 所有子项为关闭
        curr.show = false
        curr.key = Math.random()
        // 此处代码是干嘛用的 忘记了
        // if (curr[keylastNode]) {
        //   curr.open = true
        // }
      })
      this.treeData = this.treeData.filter(curr => curr.show)
    },
    // 选中时 所有子级要被选中
    handleCheckbox (param) {
      console.log('handleCheckbox')
      const { idObj } = this
      let { id, pid } = param
      const item = idObj[id]
      const desc = this.getDescByPid({
        pid: id,
        all: true
      })
      const ancestor = this.getAncestorByPid({
        pid: pid,
        all: true
      })
      if (this.checkedList.length >= this.max) {
        this.$message({
          type: 'warning',
          message: `最多只能选择${this.max}辆车！`
        })
        return
      }
      desc.forEach(item => {
        item.checked = true
        item.key = uniqueKey()
      })
      ancestor.forEach(item => {
        item.checked = true
        item.key = uniqueKey()
      })
      item.checked = true
      item.key = uniqueKey()
      this.treeData = Object.assign([], this.treeData)
      this.renderCheckedList(item)
    },
    // 取消选中, Checked表示当前是选中状态
    handleChecked (param) {
      console.log('handleChecked')
      const { idObj } = this
      let { id, pid } = param
      const item = idObj[id]
      item.checked = false
      item.key = uniqueKey()
      // 子孙元素
      let desc = this.getDescByPid({
        pid: id,
        all: true
      })
      // 兄弟元素
      let sibling = this.getDescByPid({
        pid,
        all: false
      })
      // 父级
      let ancestor = this.getAncestorByPid({
        pid: pid,
        all: true
      })
      item.checked = false
      desc.forEach(curr => {
        curr.checked = false
        curr.key = uniqueKey()
      })
      // 兄弟元素都没被选中
      if (sibling.every(curr => !curr.checked)) {
        ancestor.forEach(curr => {
          curr.checked = false
          curr.key = uniqueKey()
        })
      }
      this.treeData = Object.assign([], this.treeData)
      this.renderCheckedList(item)
    },
		getDescByPid (param) {
			const { pid, all } = param
			const pidObj = this.pidObj
			const idObj = this.idObj
			const desc = []
			const getDesc = (pid) => {
				const son = pidObj[pid] || []
				for (let i = 0, len = son.length; i < len; i++) {
					let sonItem = son[i]
					let id = sonItem[keyid]
					let pid = sonItem[keypid]
					let pIndex= 0
					if (idObj[pid]) {
						pIndex = idObj[pid].depth || 1
						idObj[pid].depth = pIndex
					}
					sonItem.depth = pIndex + 1

					desc.push(sonItem)
					if (pidObj[id] && all) {
						getDesc(id)
					}
				}
				return desc
			}
			return getDesc(pid)
		},
		getAncestorByPid (param = {}) {
			const { pid, all } = param
			const idObj = this.idObj
			const ancestor = []
			const getAncestor = (pid) => {
				const fat = idObj[pid] || {}
				ancestor.push(fat)
				if (idObj[fat[keypid]] && all) {
					getAncestor(fat[keypid])
				}
				return ancestor
			}
			return getAncestor(pid)
    },
    //将当前节点的id作为父节点id传入 是否有子级 
    hasChildren (id) {
      return this.pidObj[id] && this.pidObj[id].length ? true : false
    },
    getChildrenLength (id) {
      return this.pidObj[id] && this.pidObj[id].length || 0
    },
    getLastNodeLength (id) {
      let lastNodeLength = this.getDescByPid({
        pid: id,
        all: true
      }).filter(item => item.v).length
      return lastNodeLength
    },
    /**
     * @param item 叶子节点 
    **/
    renderCheckedList (item={}) {
      const id = item.i
      const desc = this.getDescByPid({
        pid: id,
        all: true
      })
      
      let checked = item.checked
      if (checked) {
        if (item.v) {
          this.checkedList.push(item)
        } else {
          desc.forEach(item => {
            if (item.v) {
              this.checkedList.push(item)
            }
          })
        }
      } else {
        if (item.v) {
          remove(this.checkedList, item)
        } else {
          desc.forEach(item => {
            if (item.v) {
              remove(this.checkedList, item)
            }
          })
        }
      }
      console.log(this.checkedList)
    }
    
  }
}