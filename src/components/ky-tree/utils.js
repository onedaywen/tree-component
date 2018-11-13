export const uniqueKey = (() => {
  let id = 10000 
  return () => {
    id++
    return id
  }
})()

const id = 'i'
export const remove = (arr, item) => {
  let i = -1
  let itemId = typeof item === 'string' ? item : item.id
  arr.forEach((curr, index) => {
    if (curr[id] === itemId) {
      i = index
    }
  })
  arr.splice(i, 1)
  return arr
}

export const genOriginData = (num) => {
  const originData = []
  let i = 0;
  while (i < num) {
    if (i === 0) {
      let node = {
        p: '0',
        v: false,
        i: '1',
        n: '节点id: 1, 节点父id: 0'
      }
      console.log(node)
      originData.push(node)
    }
    if (i > 0) {
      for (let j = 0; j < 10; j++) {
        let id = uniqueKey()
        let pid = i
        let node = {
          p: pid + '',
          v: i === num -1 ? true : false,
          i: id + '',
          n: '节点id: ' + id + ',  节点父id: ' + pid
        }
        console.log(node)
        originData.push(node)
      }
    }
    i++
  }
  return originData
}