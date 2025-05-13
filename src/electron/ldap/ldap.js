const { Client } = require("ldapts")

// const client = new Client({
//     url: "ldap://192.168.20.10",
//     timeout: 0
// })

var client
var user
var pwd
var login = false
async function LoginLdap(host, port, usr, passwd) {
    try {
        console.log("LoginLdap: ", host, port, usr, passwd);
        if (client) {
            await client.unbind(); // Unbind the existing client if already initialized
        }
        client = new Client({
            url: "ldap://" + host + ":" + port,
            timeout: 0
        });
        await client.bind(usr,passwd)
        console.log("login success")
        user = usr
        pwd = passwd
        login = true
    }catch(ex) {
        console.log("login fail.", ex)
    }finally {
        if (client) {
            await client.unbind()
        }
    }
    return login
}

function IsLogin(){
    return login
}

async function LdapSearchAll() {
    try {
        await client.bind(user,pwd)
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
        await client.bind(user,pwd)
        console.log("connect success")
    }catch(ex) {
        console.log("connect fail.")
        throw ex
    }

    try {
        const {searchEntries, searchReferences} = await client.search(dn, {
            scope: "base"
        })
        
        // searchEntries.forEach((entry) => {
        //     console.log(entry)
        // })
        return searchEntries
    }catch(ex) {
        console.log("search error: ",dn, ex)
        return null
    }finally{
        await client.unbind()
    }
}

async function LdapSearchObjectclass() {
    try {
        await client.bind(user,pwd)
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

        // searchEntries.forEach(element => {
        //     console.log(element)
        // });
        return searchEntries
    }catch(ex) {
        throw ex
    }finally {
        await client.unbind()
    }
}

async function LdapEntryAdd(dn, attrs) {
    try {
        await client.bind(user,pwd)
    }catch (ex) {
        console.log("connect fail.")
        throw ex
    }

    try {
        await client.add(dn, attrs)
    }catch(ex) {
        throw ex
    }finally {
        await client.unbind()
    }
}

async function LdapEntryDel(dn) {
    try {
        await client.bind(user,pwd)
    }catch (ex) {
        console.log("connect fail.")
        throw ex
    }

    try {
        await client.del(dn)
    }catch(ex) {
        throw ex
    }finally {
        await client.unbind()
    }
}


module.exports = {LdapSearchAll, LdapSearchWithDn,LdapSearchObjectclass,LdapEntryAdd,LdapEntryDel,LoginLdap, IsLogin}