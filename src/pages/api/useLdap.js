const useLdap = () => {

    const searchAll = async () => {
        const res = await window.EAPI.searchAll()
        //console.log("render searchAll:", res)
        return res
    }

    const objectClasses = async ()=>{
        const res = await window.EAPI.objectClasses()
        //console.log("render objectClasses:", res)
        return res
    }
    const searchDn = async (dn) => {
        const res = await window.EAPI.searchDn(dn)
        //console.log("render searchDn:", res)
        return res
    }

    const getObjectAttribute = (objectClasses) => {
        // 正则表达式匹配 MUST 和 MAY 属性
        const attributeRegex =  /NAME\s+\(?\s*'([a-zA-Z-0-9]+)'\s*('([a-z'A-Z-0-9]+)')?\s*\)?\s*|MUST\s+\(?\s*([^\) ]+)\s*\)?|MAY\s+\(?\s*([^\)]+)\s*\)?/g
        const attributes = {}
        if (objectClasses["objectClasses"]){
            objectClasses["objectClasses"].forEach(objectClass => {
                let match, NAME
                while ((match = attributeRegex.exec(objectClass)) !== null) {
                    if (match[0].startsWith('NAME')) {
                        if (match[1] && match[2] && match[3]) {
                            NAME = match[1].trim()+" "+match[3].trim()
                        }else {
                            NAME = match[1].trim()
                        }
                        attributes[NAME] = {}
                    }
                    if (match[4]) {
                        //console.log("match(1): ", match[1])
                        attributes[NAME]["MUST"] = match[4].trim().split(/\s*\$\s*/);  // 用 $ 分割 MUST 属性
                    }
                    if (match[5]) {
                        attributes[NAME]["MAY"] = {}
                        attributes[NAME]["MAY"] = match[5].trim().split(/\s*\$\s*/);   // 用 $ 分割 MAY 属性
                    }
                }
            })
        }
        return attributes
    }

    return  {
        searchAll, objectClasses, searchDn,getObjectAttribute
    }
}


export default useLdap
