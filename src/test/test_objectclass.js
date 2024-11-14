
const {objectclasses} = require('./data2')

// console.log(objectclasses)

// 正则表达式匹配 MUST 和 MAY 属性
const attributeRegex = /NAME\s+\(?\s*'([a-z 'A-Z]+)'\s*\)?\s*DESC|MUST\s+\(?\s*([^\)]+)\s*\)?|MAY\s+\(?\s*([^\)]+)\s*\)?/g
const attributes = {}
objectclasses["objectClasses"].forEach(objectClass => {
    
    let match;
    while ((match = attributeRegex.exec(objectClass)) !== null) {
        if (match[1]) {
            NAME = match[1].trim()
            attributes[NAME] = {}
        }
        if (match[2]) {
            //console.log("match(1): ", match[1])
            attributes[NAME]["MUST"] = match[2].trim().split(/\s*\$\s*/);  // 用 $ 分割 MUST 属性
        }
        if (match[3]) {
            attributes[NAME]["MAY"] = match[3].trim().split(/\s*\$\s*/);   // 用 $ 分割 MAY 属性
        }
    }
});
console.log(`ObjectClass Attributes:`, attributes);
