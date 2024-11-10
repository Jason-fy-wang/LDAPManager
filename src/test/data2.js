
var data2 = [
    {
        dn: 'ou=group,dc=example,dc=com',
        objectClass: 'organizationalUnit',
        ou: 'group',
        description: 'Organizational Unit for groups'
      },
      {
        dn: 'cn=g-admin,ou=group,dc=example,dc=com',
        objectClass: 'groupOfNames',
        cn: 'g-admin',
        member: [
          'cn=mike,ou=backend,ou=IT,ou=person,dc=example,dc=com',
          'cn=fang,ou=HR,ou=person,dc=example,dc=com'
        ]
      },
      {
        dn: 'cn=normal,ou=group,dc=example,dc=com',
        objectClass: 'groupOfNames',
        cn: 'normal',
        member: [
          'cn=mike,ou=backend,ou=IT,ou=person,dc=example,dc=com',
          'cn=fang,ou=HR,ou=person,dc=example,dc=com'
        ]
      },
      {
        dn: 'ou=person,dc=example,dc=com',
        objectClass: 'organizationalUnit',
        ou: 'person',
        description: 'Organizational unit for person'
      },
      {
        dn: 'uid=john,ou=person,dc=example,dc=com',
        objectClass: [ 'inetOrgPerson', 'posixAccount', 'organizationalPerson' ],
        uid: 'john',
        cn: 'John.Doe',
        sn: 'Doe',
        mail: 'john@example.com',
        userPassword: 'loongson',
        gidNumber: '1000',
        uidNumber: '10005',
        homeDirectory: '/home/john'
      }
]


module.exports = data2