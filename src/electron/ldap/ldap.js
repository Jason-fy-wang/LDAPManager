const { Client } = require("ldapts")

const client = new Client({
    url: "ldap://192.168.20.10",
    timeout: 0
})

async function LdapSearchAll() {
    try {
        await client.bind("cn=admin,dc=example,dc=com","loongson")
        console.log("connect success")
    }catch(ex) {
        console.log("connect fail")
    }

    try {
        const {searchEntries, searchReferences} = await client.search("dc=example,dc=com", {
            scope:"sub"
            //scope: "one"
            //scope: "base"
            //scope: "children"
        })
        // searchEntries.forEach((entry) => {
        //     console.log(entry)
        // })
        console.log("************************************************")
        searchReferences.forEach((str) => {
            console.log("refer: ", str)
        })
        return  searchEntries
    }catch(ex) {
        console.log("search failed. ",ex)
    }finally {
        client.unbind()
    }
}


module.exports = {LdapSearchAll}