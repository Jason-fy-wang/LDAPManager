const {objectclasses, objectclasses2} = require('./data2')

function testAttribute() {
    // 正则表达式匹配 MUST 和 MAY 属性
    const attributeRegex = /NAME\s+\(?\s*'([a-zA-Z-0-9]+)'\s*('([a-z'A-Z-0-9]+)')?\s*\)?\s*|MUST\s+\(?\s*([^\) ]+)\s*\)?|MAY\s+\(?\s*([^\)]+)\s*\)?/g
    const attributes = {}
    objectclasses2["objectClasses"].forEach(objectClass => {
        let match,NAME;
        try {
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
                    attributes[NAME]["MAY"] = match[5].trim().split(/\s*\$\s*/);   // 用 $ 分割 MAY 属性
                }
            }
        }catch (ex) {
            console.log(ex)
        }
    })
    console.log(`ObjectClass Attributes:`, attributes);
}

//testAttribute()

function testAttribute2() {
     // 正则表达式匹配 MUST 和 MAY 属性
    const attributeRegex = /NAME\s+\(?\s*'([a-zA-Z-0-9]+)'\s*('([a-z'A-Z-0-9]+)')?\s*\)?\s*|MUST\s+\(?\s*([^\)]+)\s*\)?|MAY\s+\(?\s*([^\)]+)\s*\)?/g
    const str = "( 1.3.6.1.4.1.4203.1.4.1 NAME ( 'OpenLDAProotDSE' 'LDAProotDSE' ) DESC 'OpenLDAP Root DSE object' SUP top STRUCTURAL MAY cn )"
    const str2= "( 2.5.6.16 NAME 'certificationAuthority' DESC 'RFC2256: a certificate authority' SUP top AUXILIARY MUST ( authorityRevocationList $ certificateRevocationList $ cACertificate ) MAY crossCertificatePair )"
    const str3= "( 0.9.2342.19200300.100.4.15 NAME 'dNSDomain' SUP domain STRUCTURAL MAY ( ARecord $ MDRecord $ MXRecord $ NSRecord $ SOARecord $ CNAMERecord ) )"
    let match

    while((match = attributeRegex.exec(str3)) !== null) {
        console.log(match)
        console.log("0", match[0])
        console.log("1", match[1])
        console.log("2", match[2])
        console.log("3", match[3])
        console.log("4", match[4])
        console.log("5", match[5])
        console.log("==============================================================")
    }
}
//testAttribute2()


function testGetParentObject(){
    console.log("====================get Parent object==========================================")
    const str4 = "objectClasses: ( 1.3.6.1.4.1.4203.1.4.5 NAME 'OpenLDAPperson' DESC 'OpenLDAP Person' SUP ( pilotPerson $ inetOrgPerson ) STRUCTURAL MUST ( uid $ cn ) MAY ( givenName $ labeledURI $ o ) )"
    const str41 = "objectClasses: ( 1.3.6.1.4.1.4203.1.4.5 NAME 'OpenLDAPperson' DESC 'OpenLDAP Person' SUP ( pilotPersonn $ inetOrgPersonn $ inetOrgPersonn ) STRUCTURAL MUST ( uid $ cn ) MAY ( givenName $ labeledURI $ o ) )"
    const str5 = "objectClasses: ( 1.3.6.1.4.1.4203.1.4.5 NAME 'OpenLDAPperson' DESC 'OpenLDAP Person' SUP pilotPerson STRUCTURAL MUST ( uid $ cn ) MAY ( givenName $ labeledURI $ o ) )"
    const parentSubtract = /SUP\s*\(?\s*([a-zA-Z]+\s*([$]+\s*[a-zA-Z]+\s*)*)\)?\s+/g
    while((match = parentSubtract.exec(str4)) !== null) {
        console.log("parent: ", match[1])
        console.log("0", match[0])
        console.log("1", match[1])
        console.log("2", match[2])
        console.log("==============================================================")
    }

    while((match = parentSubtract.exec(str41)) !== null) {
        console.log("parent3: ", match[1])
        console.log("0", match[0])
        console.log("1", match[1])
        console.log("2", match[2])
        console.log("==============================================================")
    }

    while((match = parentSubtract.exec(str5)) !== null) {
        console.log("parent2: ", match[1])
        console.log("0", match[0])
        console.log("1", match[1])
        console.log("==============================================================")
    }

    const str6 = "objectClasses: ( 2.5.6.1 NAME 'alias' DESC 'RFC4512: an alias' SUP top STRUCTURAL MUST aliasedObjectName )"
    while((match = parentSubtract.exec(str6)) !== null) {
        console.log("parent4: ", match[1])
        console.log("0", match[0])
        console.log("1", match[1])
        console.log("==============================================================")
    }

    if ((match = parentSubtract.exec(str41)) !== null) {
        console.log("parent5: ", match[1])
        console.log("0", match[0])
        console.log("1", match[1])
        console.log("2", match[2])
        console.log("==============================================================")
    }
}
testGetParentObject()