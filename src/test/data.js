
var data = [
    {
        dn: 'dc=example,dc=com',
        objectClass: [ 'top', 'dcObject', 'organization' ],
        o: 'Example Organization',
        dc: 'example'
      },
      {
        dn: 'ou=group,dc=example,dc=com',
        objectClass: 'organizationalUnit',
        ou: 'group',
        description: 'Organizational Unit for groups'
      },
      {
        dn: 'ou=person,dc=example,dc=com',
        objectClass: 'organizationalUnit',
        ou: 'person',
        description: 'Organizational unit for person'
      },
      {
        dn: 'ou=IT,ou=person,dc=example,dc=com',
        objectClass: 'organizationalUnit',
        ou: 'IT'
      },
      {
        dn: 'ou=backend,ou=IT,ou=person,dc=example,dc=com',
        objectClass: 'organizationalUnit',
        ou: 'backend'
      },
      {
        dn: 'cn=mike,ou=backend,ou=IT,ou=person,dc=example,dc=com',
        objectClass: 'inetOrgPerson',
        cn: 'mike',
        departmentNumber: '1',
        sn: 'wang',
        title: 'sensor IT',
        mail: 'mike.wang@example.com',
        uid: '10000',
        displayName: 'MIKE',
        userPassword: '{SSHA}89fyIm6LLzMhcCYrOKme6JhtICq4LiCY'
      },
      {
        dn: 'cn=susan,ou=backend,ou=IT,ou=person,dc=example,dc=com',
        objectClass: 'inetOrgPerson',
        cn: 'susan',
        departmentNumber: '1',
        sn: 'wang',
        title: 'java',
        mail: 'susan@example.com',
        uid: '10001',
        displayName: 'SUSAN',
        userPassword: '{SSHA}89fyIm6LLzMhcCYrOKme6JhtICq4LiCY'
      },
      {
        dn: 'ou=test,ou=IT,ou=person,dc=example,dc=com',
        objectClass: 'organizationalUnit',
        ou: 'test'
      },
      {
        dn: 'cn=tester,ou=test,ou=IT,ou=person,dc=example,dc=com',
        objectClass: 'inetOrgPerson',
        cn: 'tester',
        departmentNumber: '2',
        sn: 'wang',
        title: 'sensor tester',
        mail: 'tester@example.com',
        uid: '10002',
        displayName: 'TEST',
        userPassword: '{SSHA}89fyIm6LLzMhcCYrOKme6JhtICq4LiCY'
      },
      {
        dn: 'ou=HR,ou=person,dc=example,dc=com',
        objectClass: 'organizationalUnit',
        ou: 'HR'
      },
      {
        dn: 'cn=fang,ou=HR,ou=person,dc=example,dc=com',
        objectClass: 'inetOrgPerson',
        cn: 'fang',
        departmentNumber: '3',
        sn: 'huang',
        title: 'HRBP',
        mail: 'fang@example.com',
        uid: '10003',
        displayName: 'fang.huang',
        userPassword: '{SSHA}89fyIm6LLzMhcCYrOKme6JhtICq4LiCY'
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
      },
]
module.exports = data
