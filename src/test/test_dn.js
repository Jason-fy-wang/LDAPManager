

const data=[{"label":"dc=com","children":[
                {"label":"dc=example","children":[
                    {"label":"ou=group","children":
                        [
                            {"label":"cn=g-admin","children":[]},
                            {"label":"cn=normal","children":[]}
                        ]},
                        {"label":"ou=person",
                            "children":[
                                {"label":"uid=john","children":[]}]
                        }
                    ]}
                ]}
            ]
const res = []
function getFullDn(data, targetLabel){
    let path = []

    function search(nodes, curpath) {
        for (let node of nodes) {

            const newpath = [...curpath, node.label]

            if (node.label === targetLabel) {
                path = newpath
                return path
            }

            if (node.children && node.children.length > 0) {
                if(search(node.children,  newpath)){
                    return true
                }
            }
        }
    }

    search(data, [])

    return path.length >0 ? path.reverse().join(","):null

}

resut = getFullDn(data, "uid=john")

console.log(resut)


