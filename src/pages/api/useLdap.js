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
        try {
            const result = await window.EAPI.addEntry(dn, res)
            console.log("addEntry res: ", result)
            return result
        } catch (e) {
            Console.log("addEntry error: ", e)
            return { success: false, error: e } // Return the exception value
        }
    }

    const delEntry = async (dn) => {
        await window.EAPI.delEntry(dn)
    }

    const login = async (host, port, user, passwd) => {
        return await window.EAPI.login(host, port, user, passwd)
    }

    const isLogin = async() => {
        return await window.EAPI.isLogin()
    }

    const getObjectAttribute = (objectClasses) => {
        // 正则表达式匹配 MUST 和 MAY 属性
        // objectClasses: ( 2.16.840.1.113730.3.2.6 NAME 'referral' DESC 'namedref: named
        //    subordinate referral' SUP top STRUCTURAL MUST ref )
        const attributeRegex =  /NAME\s+\(?\s*('([a-zA-Z-0-9]+)'\s*)+\s*\)?\s*|MUST\s+\(?\s*([a-zA-Z0-9]+\s*([$]\s*[a-zA-Z0-9]+\s*)*)\s*\)?|MAY\s*\(?\s*([a-zA-Z0-9]+\s*([$]\s*[a-zA-Z0-9]+\s*)*)\s*\)?/g
        const parentSubtract = /SUP\s*\(?\s*([a-zA-Z]+\s*([$]+\s*[a-zA-Z]+\s*)*)\)?\s+/g
        const attributes = {}
        const structuals = []
        const abstracts = []
        const auxiliaries = []
        const auxiliaryRegex = /AUXILIARY/g
        const structualsRegex = /STRUCTURAL/g
        const abstractsRegex = /ABSTRACT/g
        //console.log("objectClasses: ", objectClasses)
        const appendValue = (obj, names) => {
            names.forEach(name => {
                if (obj.indexOf(name)<0){
                    obj.push(name)
                }
            })
        }

        if (objectClasses["objectClasses"]){
            objectClasses["objectClasses"].forEach(objectClass => {
                let match, names
                while ((match = attributeRegex.exec(objectClass)) !== null) {
                    if (match[0].startsWith('NAME')) {
                        // multiple names
                        names = match[0]?.trim().replaceAll(/['()]/g, "").replaceAll("NAME","").split(/\s+/).filter(item => item.length>0)
                        names.forEach(name => {
                            attributes[name] = {}
                        })
                    }
                    

                    if (structualsRegex.test(objectClass)) {
                        appendValue(structuals, names)
                    }else if (abstractsRegex.test(objectClass)) {
                        appendValue(abstracts, names)
                    }else if (auxiliaryRegex.test(objectClass)) {
                        appendValue(auxiliaries, names)
                    }
                    // match[4] MUST 属性
                    if (match[3]) {
                        console.log("MUST match(1): ",names, match[0], match[4])
                        names.forEach(name => {
                            attributes[name]["MUST"] = {}
                            attributes[name]["MUST"] = match[3].trim().split(/\s*\$\s*/);  // 用 $ 分割 MUST 属性
                        })
                    }
                    // match[5] MAY 属性
                    if (match[5]) {
                        names.forEach(name => {
                            attributes[name]["MAY"] = {}
                            attributes[name]["MAY"] = match[5].trim().split(/\s*\$\s*/);   // 用 $ 分割 MAY 属性
                        })
                    }
                }
                // SUP 属性
                while ((match = parentSubtract.exec(objectClass)) !== null) {
                    //console.log("parentSubtract: ", objectClass, " is 0: ",match[0], " is1 :", match[1], " is2: ")
                    if (match[1]) {
                        let parents = match[1].trim().split(/\s*\$\s*/)
                        names.forEach(name => {
                            attributes[name]["SUP"] = parents
                        })
                    }
                }
            })
        }
        attributes["structuals"] = structuals
        attributes["abstracts"] = abstracts
        attributes["auxiliaries"] = auxiliaries
        console.log("attributes: ", attributes)
        return attributes
    }

    return  {
        searchAll, objectClasses, searchDn,getObjectAttribute,addEntry,delEntry,login,isLogin
    }
}


export default useLdap
