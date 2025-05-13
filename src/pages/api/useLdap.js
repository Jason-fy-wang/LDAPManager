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

    const addEntry = async(dn, res) => {
        console.log("addEntry useLdap: ", res)
        await window.EAPI.addEntry(dn, res)
    }

    const delEntry = async (dn) => {
        await window.EAPI.delEntry(dn)
    }

    const getObjectAttribute = (objectClasses) => {
        // 正则表达式匹配 MUST 和 MAY 属性
        // objectClasses: ( 2.16.840.1.113730.3.2.6 NAME 'referral' DESC 'namedref: named
        //    subordinate referral' SUP top STRUCTURAL MUST ref )
        const attributeRegex =  /NAME\s+\(?\s*'([a-zA-Z-0-9]+)'\s*('([a-z'A-Z-0-9]+)')?\s*\)?\s*|MUST\s+\(?\s*([^\) ]+)\s*\)?|MAY\s+\(?\s*([^\)]+)\s*\)?/g
        const attributes = {}
        const structuals = []
        const abstracts = []
        const auxiliaries = []
        const auxiliaryRegex = /AUXILIARY/g
        const structualsRegex = /STRUCTURAL/g
        const abstractsRegex = /ABSTRACT/g
        //console.log("objectClasses: ", objectClasses)
        const appendValue = (obj, value) => {
            if (obj.indexOf(value)<0){
                obj.push(value)
            }
        }

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
                    if (structualsRegex.test(objectClass)) {
                        appendValue(structuals, NAME)
                    }else if (abstractsRegex.test(objectClass)) {
                        appendValue(abstracts, NAME)
                    }else if (auxiliaryRegex.test(objectClass)) {
                        appendValue(auxiliaries, NAME)
                    }
                    // match[4] MUST 属性
                    if (match[4]) {
                        //console.log("match(1): ", match[1])
                        attributes[NAME]["MUST"] = match[4].trim().split(/\s*\$\s*/);  // 用 $ 分割 MUST 属性
                    }
                    // match[5] MAY 属性
                    if (match[5]) {
                        attributes[NAME]["MAY"] = {}
                        attributes[NAME]["MAY"] = match[5].trim().split(/\s*\$\s*/);   // 用 $ 分割 MAY 属性
                    }
                }
            })
        }
        attributes["structuals"] = structuals
        attributes["abstracts"] = abstracts
        attributes["auxiliaries"] = auxiliaries
        //console.log("attributes: ", attributes)
        return attributes
    }

    return  {
        searchAll, objectClasses, searchDn,getObjectAttribute,addEntry,delEntry
    }
}


export default useLdap
