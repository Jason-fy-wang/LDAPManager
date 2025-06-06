
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

const objectclasses = {
  dn: 'cn=Subschema',
  objectClasses: [
    "( 2.5.6.0 NAME 'top' DESC 'top of the superclass chain' ABSTRACT MUST objectClass )",
    "( 1.3.6.1.4.1.1466.101.120.111 NAME 'extensibleObject' DESC 'RFC4512: extensible object' SUP top AUXILIARY )",
    "( 2.5.6.1 NAME 'alias' DESC 'RFC4512: an alias' SUP top STRUCTURAL MUST aliasedObjectName )",
    "( 2.16.840.1.113730.3.2.6 NAME 'referral' DESC 'namedref: named subordinate referral' SUP top STRUCTURAL MUST ref )",
    "( 1.3.6.1.4.1.4203.1.4.1 NAME ( 'OpenLDAProotDSE' 'LDAProotDSE' ) DESC 'OpenLDAP Root DSE object' SUP top STRUCTURAL MAY cn )",
    "( 2.5.17.0 NAME 'subentry' DESC 'RFC3672: subentry' SUP top STRUCTURAL MUST ( cn $ subtreeSpecification ) )",
    "( 2.5.20.1 NAME 'subschema' DESC 'RFC4512: controlling subschema (sub)entry' AUXILIARY MAY ( dITStructureRules $ nameForms $ dITContentRules $ objectClasses $ attributeTypes $ matchingRules $ matchingRuleUse ) )",
    "( 1.3.6.1.4.1.1466.101.119.2 NAME 'dynamicObject' DESC 'RFC2589: Dynamic Object' SUP top AUXILIARY )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.0.0 NAME 'olcConfig' DESC 'OpenLDAP configuration object' SUP top ABSTRACT )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.0.1 NAME 'olcGlobal' DESC 'OpenLDAP Global configuration options' SUP olcConfig STRUCTURAL MAY ( cn $ olcConfigFile $ olcConfigDir $ olcAllows $ olcArgsFile $ olcAttributeOptions $ olcAuthIDRewrite $ olcAuthzPolicy $ olcAuthzRegexp $ olcConcurrency $ olcConnMaxPending $ olcConnMaxPendingAuth $ olcDisallows $ olcGentleHUP $ olcIdleTimeout $ olcIndexSubstrIfMaxLen $ olcIndexSubstrIfMinLen $ olcIndexSubstrAnyLen $ olcIndexSubstrAnyStep $ olcIndexIntLen $ olcListenerThreads $ olcLocalSSF $ olcLogFile $ olcLogLevel $ olcPasswordCryptSaltFormat $ olcPasswordHash $ olcPidFile $ olcPluginLogFile $ olcReadOnly $ olcReferral $ olcReplogFile $ olcRequires $ olcRestrict $ olcReverseLookup $ olcRootDSE $ olcSaslAuxprops $ olcSaslHost $ olcSaslRealm $ olcSaslSecProps $ olcSecurity $ olcServerID $ olcSizeLimit $ olcSockbufMaxIncoming $ olcSockbufMaxIncomingAuth $ olcTCPBuffer $ olcThreads $ olcTimeLimit $ olcTLSCACertificateFile $ olcTLSCACertificatePath $ olcTLSCertificateFile $ olcTLSCertificateKeyFile $ olcTLSCipherSuite $ olcTLSCRLCheck $ olcTLSRandFile $ olcTLSVerifyClient $ olcTLSDHParamFile $ olcTLSECName $ olcTLSCRLFile $ olcTLSProtocolMin $ olcToolThreads $ olcWriteTimeout $ olcObjectIdentifier $ olcAttributeTypes $ olcObjectClasses $ olcDitContentRules $ olcLdapSyntaxes ) )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.0.2 NAME 'olcSchemaConfig' DESC 'OpenLDAP schema object' SUP olcConfig STRUCTURAL MAY ( cn $ olcObjectIdentifier $ olcLdapSyntaxes $ olcAttributeTypes $ olcObjectClasses $ olcDitContentRules ) )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.0.3 NAME 'olcBackendConfig' DESC 'OpenLDAP Backend-specific options' SUP olcConfig STRUCTURAL MUST olcBackend )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.0.4 NAME 'olcDatabaseConfig' DESC 'OpenLDAP Database-specific options' SUP olcConfig STRUCTURAL MUST olcDatabase MAY ( olcHidden $ olcSuffix $ olcSubordinate $ olcAccess $ olcAddContentAcl $ olcLastMod $ olcLimits $ olcMaxDerefDepth $ olcPlugin $ olcReadOnly $ olcReplica $ olcReplicaArgsFile $ olcReplicaPidFile $ olcReplicationInterval $ olcReplogFile $ olcRequires $ olcRestrict $ olcRootDN $ olcRootPW $ olcSchemaDN $ olcSecurity $ olcSizeLimit $ olcSyncUseSubentry $ olcSyncrepl $ olcTimeLimit $ olcUpdateDN $ olcUpdateRef $ olcMirrorMode $ olcMonitoring $ olcExtraAttrs ) )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.0.5 NAME 'olcOverlayConfig' DESC 'OpenLDAP Overlay-specific options' SUP olcConfig STRUCTURAL MUST olcOverlay )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.0.6 NAME 'olcIncludeFile' DESC 'OpenLDAP configuration include file' SUP olcConfig STRUCTURAL MUST olcInclude MAY ( cn $ olcRootDSE ) )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.0.7 NAME 'olcFrontendConfig' DESC 'OpenLDAP frontend configuration' AUXILIARY MAY ( olcDefaultSearchBase $ olcPasswordHash $ olcSortVals ) )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.0.8 NAME 'olcModuleList' DESC 'OpenLDAP dynamic module info' SUP olcConfig STRUCTURAL MAY ( cn $ olcModulePath $ olcModuleLoad ) )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.2.2.1 NAME 'olcLdifConfig' DESC 'LDIF backend configuration' SUP olcDatabaseConfig STRUCTURAL MUST olcDbDirectory )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.2.4.1 NAME 'olcMonitorConfig' DESC 'Monitor backend configuration' SUP olcDatabaseConfig STRUCTURAL )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.2.1.1 NAME 'olcBdbConfig' DESC 'BDB backend configuration' SUP olcDatabaseConfig STRUCTURAL MUST olcDbDirectory MAY ( olcDbCacheSize $ olcDbCheckpoint $ olcDbChecksum $ olcDbConfig $ olcDbCryptFile $ olcDbCryptKey $ olcDbNoSync $ olcDbDirtyRead $ olcDbIDLcacheSize $ olcDbIndex $ olcDbLinearIndex $ olcDbLockDetect $ olcDbMode $ olcDbSearchStack $ olcDbShmKey $ olcDbCacheFree $ olcDbDNcacheSize $ olcDbPageSize ) )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.2.1.2 NAME 'olcHdbConfig' DESC 'HDB backend configuration' SUP olcDatabaseConfig STRUCTURAL MUST olcDbDirectory MAY ( olcDbCacheSize $ olcDbCheckpoint $ olcDbChecksum $ olcDbConfig $ olcDbCryptFile $ olcDbCryptKey $ olcDbNoSync $ olcDbDirtyRead $ olcDbIDLcacheSize $ olcDbIndex $ olcDbLinearIndex $ olcDbLockDetect $ olcDbMode $ olcDbSearchStack $ olcDbShmKey $ olcDbCacheFree $ olcDbDNcacheSize $ olcDbPageSize ) )",
    "( 1.3.6.1.4.1.4203.1.12.2.4.2.12.1 NAME 'olcMdbConfig' DESC 'MDB backend configuration' SUP olcDatabaseConfig STRUCTURAL MUST olcDbDirectory MAY ( olcDbCheckpoint $ olcDbEnvFlags $ olcDbNoSync $ olcDbIndex $ olcDbMaxReaders $ olcDbMaxSize $ olcDbMode $ olcDbSearchStack $ olcDbRtxnSize ) )",
    "( 2.5.6.2 NAME 'country' DESC 'RFC2256: a country' SUP top STRUCTURAL MUST c MAY ( searchGuide $ description ) )",
    "( 2.5.6.3 NAME 'locality' DESC 'RFC2256: a locality' SUP top STRUCTURAL MAY ( street $ seeAlso $ searchGuide $ st $ l $ description ) )",
    "( 2.5.6.4 NAME 'organization' DESC 'RFC2256: an organization' SUP top STRUCTURAL MUST o MAY ( userPassword $ searchGuide $ seeAlso $ businessCategory $ x121Address $ registeredAddress $ destinationIndicator $ preferredDeliveryMethod $ telexNumber $ teletexTerminalIdentifier $ telephoneNumber $ internationaliSDNNumber $ facsimileTelephoneNumber $ street $ postOfficeBox $ postalCode $ postalAddress $ physicalDeliveryOfficeName $ st $ l $ description ) )",
    "( 2.5.6.5 NAME 'organizationalUnit' DESC 'RFC2256: an organizational unit' SUP top STRUCTURAL MUST ou MAY ( userPassword $ searchGuide $ seeAlso $ businessCategory $ x121Address $ registeredAddress $ destinationIndicator $ preferredDeliveryMethod $ telexNumber $ teletexTerminalIdentifier $ telephoneNumber $ internationaliSDNNumber $ facsimileTelephoneNumber $ street $ postOfficeBox $ postalCode $ postalAddress $ physicalDeliveryOfficeName $ st $ l $ description ) )",
    "( 2.5.6.6 NAME 'person' DESC 'RFC2256: a person' SUP top STRUCTURAL MUST ( sn $ cn ) MAY ( userPassword $ telephoneNumber $ seeAlso $ description ) )",
    "( 2.5.6.7 NAME 'organizationalPerson' DESC 'RFC2256: an organizational person' SUP person STRUCTURAL MAY ( title $ x121Address $ registeredAddress $ destinationIndicator $ preferredDeliveryMethod $ telexNumber $ teletexTerminalIdentifier $ telephoneNumber $ internationaliSDNNumber $ facsimileTelephoneNumber $ street $ postOfficeBox $ postalCode $ postalAddress $ physicalDeliveryOfficeName $ ou $ st $ l ) )",
    "( 2.5.6.8 NAME 'organizationalRole' DESC 'RFC2256: an organizational role' SUP top STRUCTURAL MUST cn MAY ( x121Address $ registeredAddress $ destinationIndicator $ preferredDeliveryMethod $ telexNumber $ teletexTerminalIdentifier $ telephoneNumber $ internationaliSDNNumber $ facsimileTelephoneNumber $ seeAlso $ roleOccupant $ preferredDeliveryMethod $ street $ postOfficeBox $ postalCode $ postalAddress $ physicalDeliveryOfficeName $ ou $ st $ l $ description ) )",
    "( 2.5.6.9 NAME 'groupOfNames' DESC 'RFC2256: a group of names (DNs)' SUP top STRUCTURAL MUST ( member $ cn ) MAY ( businessCategory $ seeAlso $ owner $ ou $ o $ description ) )",
    "( 2.5.6.10 NAME 'residentialPerson' DESC 'RFC2256: an residential person' SUP person STRUCTURAL MUST l MAY ( businessCategory $ x121Address $ registeredAddress $ destinationIndicator $ preferredDeliveryMethod $ telexNumber $ teletexTerminalIdentifier $ telephoneNumber $ internationaliSDNNumber $ facsimileTelephoneNumber $ preferredDeliveryMethod $ street $ postOfficeBox $ postalCode $ postalAddress $ physicalDeliveryOfficeName $ st $ l ) )",
    "( 2.5.6.11 NAME 'applicationProcess' DESC 'RFC2256: an application process' SUP top STRUCTURAL MUST cn MAY ( seeAlso $ ou $ l $ description ) )",
    "( 2.5.6.12 NAME 'applicationEntity' DESC 'RFC2256: an application entity' SUP top STRUCTURAL MUST ( presentationAddress $ cn ) MAY ( supportedApplicationContext $ seeAlso $ ou $ o $ l $ description ) )",
    "( 2.5.6.13 NAME 'dSA' DESC 'RFC2256: a directory system agent (a server)' SUP applicationEntity STRUCTURAL MAY knowledgeInformation )",
    "( 2.5.6.14 NAME 'device' DESC 'RFC2256: a device' SUP top STRUCTURAL MUST cn MAY ( serialNumber $ seeAlso $ owner $ ou $ o $ l $ description ) )",
    "( 2.5.6.15 NAME 'strongAuthenticationUser' DESC 'RFC2256: a strong authentication user' SUP top AUXILIARY MUST userCertificate )",
    "( 2.5.6.16 NAME 'certificationAuthority' DESC 'RFC2256: a certificate authority' SUP top AUXILIARY MUST ( authorityRevocationList $ certificateRevocationList $ cACertificate ) MAY crossCertificatePair )",
    "( 2.5.6.17 NAME 'groupOfUniqueNames' DESC 'RFC2256: a group of unique names (DN and Unique Identifier)' SUP top STRUCTURAL MUST ( uniqueMember $ cn ) MAY ( businessCategory $ seeAlso $ owner $ ou $ o $ description ) )",
    "( 2.5.6.18 NAME 'userSecurityInformation' DESC 'RFC2256: a user security information' SUP top AUXILIARY MAY supportedAlgorithms )",
    "( 2.5.6.16.2 NAME 'certificationAuthority-V2' SUP certificationAuthority AUXILIARY MAY deltaRevocationList )",
    "( 2.5.6.19 NAME 'cRLDistributionPoint' SUP top STRUCTURAL MUST cn MAY ( certificateRevocationList $ authorityRevocationList $ deltaRevocationList ) )",
    "( 2.5.6.20 NAME 'dmd' SUP top STRUCTURAL MUST dmdName MAY ( userPassword $ searchGuide $ seeAlso $ businessCategory $ x121Address $ registeredAddress $ destinationIndicator $ preferredDeliveryMethod $ telexNumber $ teletexTerminalIdentifier $ telephoneNumber $ internationaliSDNNumber $ facsimileTelephoneNumber $ street $ postOfficeBox $ postalCode $ postalAddress $ physicalDeliveryOfficeName $ st $ l $ description ) )",
    "( 2.5.6.21 NAME 'pkiUser' DESC 'RFC2587: a PKI user' SUP top AUXILIARY MAY userCertificate )",
    "( 2.5.6.22 NAME 'pkiCA' DESC 'RFC2587: PKI certificate authority' SUP top AUXILIARY MAY ( authorityRevocationList $ certificateRevocationList $ cACertificate $ crossCertificatePair ) )",
    "( 2.5.6.23 NAME 'deltaCRL' DESC 'RFC2587: PKI user' SUP top AUXILIARY MAY deltaRevocationList )",
    "( 1.3.6.1.4.1.250.3.15 NAME 'labeledURIObject' DESC 'RFC2079: object that contains the URI attribute type' SUP top AUXILIARY MAY labeledURI )",
    "( 0.9.2342.19200300.100.4.19 NAME 'simpleSecurityObject' DESC 'RFC1274: simple security object' SUP top AUXILIARY MUST userPassword )",
    "( 1.3.6.1.4.1.1466.344 NAME 'dcObject' DESC 'RFC2247: domain component object' SUP top AUXILIARY MUST dc )",
    "( 1.3.6.1.1.3.1 NAME 'uidObject' DESC 'RFC2377: uid object' SUP top AUXILIARY MUST uid )",
    "( 0.9.2342.19200300.100.4.4 NAME ( 'pilotPerson' 'newPilotPerson' ) SUP person STRUCTURAL MAY ( userid $ textEncodedORAddress $ rfc822Mailbox $ favouriteDrink $ roomNumber $ userClass $ homeTelephoneNumber $ homePostalAddress $ secretary $ personalTitle $ preferredDeliveryMethod $ businessCategory $ janetMailbox $ otherMailbox $ mobileTelephoneNumber $ pagerTelephoneNumber $ organizationalStatus $ mailPreferenceOption $ personalSignature ) )",
    "( 0.9.2342.19200300.100.4.5 NAME 'account' SUP top STRUCTURAL MUST userid MAY ( description $ seeAlso $ localityName $ organizationName $ organizationalUnitName $ host ) )",
    "( 0.9.2342.19200300.100.4.6 NAME 'document' SUP top STRUCTURAL MUST documentIdentifier MAY ( commonName $ description $ seeAlso $ localityName $ organizationName $ organizationalUnitName $ documentTitle $ documentVersion $ documentAuthor $ documentLocation $ documentPublisher ) )",
    "( 0.9.2342.19200300.100.4.7 NAME 'room' SUP top STRUCTURAL MUST commonName MAY ( roomNumber $ description $ seeAlso $ telephoneNumber ) )",
    "( 0.9.2342.19200300.100.4.9 NAME 'documentSeries' SUP top STRUCTURAL MUST commonName MAY ( description $ seeAlso $ telephonenumber $ localityName $ organizationName $ organizationalUnitName ) )",    
    "( 0.9.2342.19200300.100.4.13 NAME 'domain' SUP top STRUCTURAL MUST domainComponent MAY ( associatedName $ organizationName $ description $ businessCategory $ seeAlso $ searchGuide $ userPassword $ localityName $ stateOrProvinceName $ streetAddress $ physicalDeliveryOfficeName $ postalAddress $ postalCode $ postOfficeBox $ streetAddress $ facsimileTelephoneNumber $ internationalISDNNumber $ telephoneNumber $ teletexTerminalIdentifier $ telexNumber $ preferredDeliveryMethod $ destinationIndicator $ registeredAddress $ x121Address ) )",
    "( 0.9.2342.19200300.100.4.14 NAME 'RFC822localPart' SUP domain STRUCTURAL MAY ( commonName $ surname $ description $ seeAlso $ telephoneNumber $ physicalDeliveryOfficeName $ postalAddress $ postalCode $ postOfficeBox $ streetAddress $ facsimileTelephoneNumber $ internationalISDNNumber $ telephoneNumber $ teletexTerminalIdentifier $ telexNumber $ preferredDeliveryMethod $ destinationIndicator $ registeredAddress $ x121Address ) )",
    "( 0.9.2342.19200300.100.4.15 NAME 'dNSDomain' SUP domain STRUCTURAL MAY ( ARecord $ MDRecord $ MXRecord $ NSRecord $ SOARecord $ CNAMERecord ) )",
    "( 0.9.2342.19200300.100.4.17 NAME 'domainRelatedObject' DESC 'RFC1274: an object related to an domain' SUP top AUXILIARY MUST associatedDomain )",
    "( 0.9.2342.19200300.100.4.18 NAME 'friendlyCountry' SUP country STRUCTURAL MUST friendlyCountryName )",
    "( 0.9.2342.19200300.100.4.20 NAME 'pilotOrganization' SUP ( organization $ organizationalUnit ) STRUCTURAL MAY buildingName )",
    "( 0.9.2342.19200300.100.4.21 NAME 'pilotDSA' SUP dsa STRUCTURAL MAY dSAQuality )",
    "( 0.9.2342.19200300.100.4.22 NAME 'qualityLabelledData' SUP top AUXILIARY MUST dsaQuality MAY ( subtreeMinimumQuality $ subtreeMaximumQuality ) )",
    "( 1.3.6.1.1.1.2.0 NAME 'posixAccount' DESC 'Abstraction of an account with POSIX attributes' SUP top AUXILIARY MUST ( cn $ uid $ uidNumber $ gidNumber $ homeDirectory ) MAY ( userPassword $ loginShell $ gecos $ description ) )",
    "( 1.3.6.1.1.1.2.1 NAME 'shadowAccount' DESC 'Additional attributes for shadow passwords' SUP top AUXILIARY MUST uid MAY ( userPassword $ shadowLastChange $ shadowMin $ shadowMax $ shadowWarning $ shadowInactive $ shadowExpire $ shadowFlag $ description ) )",
    "( 1.3.6.1.1.1.2.2 NAME 'posixGroup' DESC 'Abstraction of a group of accounts' SUP top STRUCTURAL MUST ( cn $ gidNumber ) MAY ( userPassword $ memberUid $ description ) )",
    "( 1.3.6.1.1.1.2.3 NAME 'ipService' DESC 'Abstraction an Internet Protocol service' SUP top STRUCTURAL MUST ( cn $ ipServicePort $ ipServiceProtocol ) MAY description )",
    "( 1.3.6.1.1.1.2.4 NAME 'ipProtocol' DESC 'Abstraction of an IP protocol' SUP top STRUCTURAL MUST ( cn $ ipProtocolNumber $ description ) MAY description )",
    "( 1.3.6.1.1.1.2.5 NAME 'oncRpc' DESC 'Abstraction of an ONC/RPC binding' SUP top STRUCTURAL MUST ( cn $ oncRpcNumber $ description ) MAY description )",
    "( 1.3.6.1.1.1.2.6 NAME 'ipHost' DESC 'Abstraction of a host, an IP device' SUP top AUXILIARY MUST ( cn $ ipHostNumber ) MAY ( l $ description $ manager ) )",
    "( 1.3.6.1.1.1.2.7 NAME 'ipNetwork' DESC 'Abstraction of an IP network' SUP top STRUCTURAL MUST ( cn $ ipNetworkNumber ) MAY ( ipNetmaskNumber $ l $ description $ manager ) )",
    "( 1.3.6.1.1.1.2.8 NAME 'nisNetgroup' DESC 'Abstraction of a netgroup' SUP top STRUCTURAL MUST cn MAY ( nisNetgroupTriple $ memberNisNetgroup $ description ) )",
    "( 1.3.6.1.1.1.2.9 NAME 'nisMap' DESC 'A generic abstraction of a NIS map' SUP top STRUCTURAL MUST nisMapName MAY description )",
    "( 1.3.6.1.1.1.2.10 NAME 'nisObject' DESC 'An entry in a NIS map' SUP top STRUCTURAL MUST ( cn $ nisMapEntry $ nisMapName ) MAY description )",
    "( 1.3.6.1.1.1.2.11 NAME 'ieee802Device' DESC 'A device with a MAC address' SUP top AUXILIARY MAY macAddress )",
    "( 1.3.6.1.1.1.2.12 NAME 'bootableDevice' DESC 'A device with boot parameters' SUP top AUXILIARY MAY ( bootFile $ bootParameter ) )",
    "( 2.16.840.1.113730.3.2.2 NAME 'inetOrgPerson' DESC 'RFC2798: Internet Organizational Person' SUP organizationalPerson STRUCTURAL MAY ( audio $ businessCategory $ carLicense $ departmentNumber $ displayName $ employeeNumber $ employeeType $ givenName $ homePhone $ homePostalAddress $ initials $ jpegPhoto $ labeledURI $ mail $ manager $ mobile $ o $ pager $ photo $ roomNumber $ secretary $ uid $ userCertificate $ x500uniqueIdentifier $ preferredLanguage $ userSMIMECertificate $ userPKCS12 ) )",
    "( 1.3.6.1.4.1.4203.1.4.3 NAME 'OpenLDAPorg' DESC 'OpenLDAP Organizational Object' SUP organization STRUCTURAL MAY ( buildingName $ displayName $ labeledURI ) )",
    "( 1.3.6.1.4.1.4203.1.4.4 NAME 'OpenLDAPou' DESC 'OpenLDAP Organizational Unit Object' SUP organizationalUnit STRUCTURAL MAY ( buildingName $ displayName $ labeledURI $ o ) )",
    "( 1.3.6.1.4.1.4203.1.4.5 NAME 'OpenLDAPperson' DESC 'OpenLDAP Person' SUP ( pilotPerson $ inetOrgPerson ) STRUCTURAL MUST ( uid $ cn ) MAY ( givenName $ labeledURI $ o ) )",
    "( 1.3.6.1.4.1.4203.1.4.6 NAME 'OpenLDAPdisplayableObject' DESC 'OpenLDAP Displayable Object' AUXILIARY MAY displayName )"
  ]
}

const objectclasses2 = {
  dn: 'cn=Subschema',
  objectClasses: [
    "( 2.5.6.0 NAME 'top' DESC 'top of the superclass chain' ABSTRACT MUST objectClass )",
    "( 1.3.6.1.4.1.4203.1.4.1 NAME ( 'OpenLDAProotDSE' 'LDAProotDSE' ) DESC 'OpenLDAP Root DSE object' SUP top STRUCTURAL MAY cn )",
    "( 1.3.6.1.1.1.2.0 NAME 'posixAccount' DESC 'Abstraction of an account with POSIX attributes' SUP top AUXILIARY MUST ( cn $ uid $ uidNumber $ gidNumber $ homeDirectory ) MAY ( userPassword $ loginShell $ gecos $ description ) )",
    "( 0.9.2342.19200300.100.4.15 NAME 'dNSDomain' SUP domain STRUCTURAL MAY ( ARecord $ MDRecord $ MXRecord $ NSRecord $ SOARecord $ CNAMERecord ) )",
    "( 2.5.6.16.2 NAME 'certificationAuthority-V2' SUP certificationAuthority AUXILIARY MAY deltaRevocationList )",
    "( 2.5.6.4 NAME 'organization' DESC 'RFC2256: an organization' SUP top STRUCTURAL MUST o MAY ( userPassword $ searchGuide $ seeAlso $ businessCategory $ x121Address $ registeredAddress $ destinationIndicator $ preferredDeliveryMethod $ telexNumber $ teletexTerminalIdentifier $ telephoneNumber $ internationaliSDNNumber $ facsimileTelephoneNumber $ street $ postOfficeBox $ postalCode $ postalAddress $ physicalDeliveryOfficeName $ st $ l $ description ) )",
    "( 2.5.6.5 NAME 'organizationalUnit' DESC 'RFC2256: an organizational unit' SUP top STRUCTURAL MUST ou MAY ( userPassword $ searchGuide $ seeAlso $ businessCategory $ x121Address $ registeredAddress $ destinationIndicator $ preferredDeliveryMethod $ telexNumber $ teletexTerminalIdentifier $ telephoneNumber $ internationaliSDNNumber $ facsimileTelephoneNumber $ street $ postOfficeBox $ postalCode $ postalAddress $ physicalDeliveryOfficeName $ st $ l $ description ) )"
  ]
}

module.exports = {data2,objectclasses,objectclasses2}