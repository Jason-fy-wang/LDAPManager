const data = require("./data")
const data2 = require("./data2")


const jsondata = {}
it('length should be greate 0', function() {
    var len = data.length
    console.log(len)
    const base = "dc=example,dc=com"
    var current  = jsondata
    data2.forEach(it => {
      //console.log(it.dn)
      const tmp = it.dn.trim().split(",").reverse()
      tmp.forEach(val => {
        if (null != val && val != "") {
            if (!current[val]){
                current[val] = {}
            }
            current = current[val]
        }
      })
      current = jsondata

    })

    console.log(JSON.stringify(jsondata))

    const result = []

    recure(jsondata, result)
    console.log(JSON.stringify(result))
  })

function recure(maps,res) {
  if (maps) {
   Object.keys(maps).forEach(k => {
    item = res.find((ele) => ele.label === k)
    if (item) {
      item.children.push({
        label: k,
        children: []
      })
    }else{
      res.push({
        label: k,
        children: []
      })
    }
    
    val = maps[k]
    if (val) {
      item = res.find((ele) => ele.label === k)
      recure(val, item.children)
    }
   })
  }
}




