import { Client } from "ldapts"

const client = new Client({
    url: "ldap://192.168.30.15",
    timeout: 0
})

async function LdapOperation() {
    try {
        await client.bind("cn=admin,dc=example,dc=com","loongson")
        console.log("connect success")
    }catch(ex) {
        console.log("connect fail")
    }

    try {
        const {searchEntries, searchReferences} = await client.search("dc=example,dc=com", {
            scope:"sub"
        })
        searchEntries.forEach((entry) => {
            console.log(entry)
        })
        console.log("************************************************")
        searchReferences.forEach((str) => {
            console.log("refer: ", str)
        })
    }catch(ex) {
        console.log("search failed. ",ex)
    }finally {
        client.unbind()
    }
}
LdapOperation()