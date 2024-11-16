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

testAttribute()

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
// testAttribute2()