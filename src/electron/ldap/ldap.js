const { Client } = require("ldapts")

const client = new Client({
    url: "ldap://192.168.20.10",
    timeout: 0
})

async function LdapSearchAll() {
    try {
        await client.bind("cn=admin,dc=example,dc=com",process.env.passwd)
        console.log("connect success")
    }catch(ex) {
        console.log("connect fail.")
        throw ex
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
        await client.unbind()
    }
}

async function LdapSearchWithDn(dn) {
    try {
        await client.bind("cn=admin,dc=example,dc=com",process.env.passwd)
        console.log("connect success")
    }catch(ex) {
        console.log("connect fail.")
        throw ex
    }

    try {
        const {searchEntries, searchReferences} = await client.search(dn, {
            scope: "base"
        })
        
        searchEntries.forEach((entry) => {
            console.log(entry)
        })
        return searchEntries
    }catch(ex) {
        console.log("search error: ",ex)
    }finally{
        await client.unbind()
    }
}

async function LdapSearchObjectclass() {
    try {
        await client.bind("cn=admin,dc=example,dc=com",process.env.passwd)
    }catch (ex) {
        console.log("connect fail.")
        throw ex
    }

    try {
        const {searchEntries, searchReferences} = await client.search("cn=subschema", {
            filter: "objectClass=subschema",
            scope: "base",
            attributes: ["objectClasses"]
        })

        searchEntries.forEach(element => {
            console.log(element)
        });
    }catch(ex) {
        throw ex
    }finally {
        await client.unbind()
    }
}

LdapSearchObjectclass()


module.exports = {LdapSearchAll, LdapSearchWithDn}