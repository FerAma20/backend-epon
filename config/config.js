module.exports = {
    nodePort: process.env.port,
    messageTerminal: 'Backend FOR INFOUTILITY',
    dbUserMS: 'sa' ,
    dbPasswordMS: 'QaZX+A7SPiKN',
    dbServerMS: '198.38.89.221',
    dbPortMS: '1433',
    dbDatabaseNameMS: 'demo',
    dbMongoStringConnection: process.env.dbMongoStringConnection,
    dbMongoUser: process.env.dbMongoUser,
    dbMongoPassword: process.env.dbMongoPassword,



    maintenanceTitle: process.env.maintenanceTitle,
    maintenanceMessage: process.env.maintenanceMessage,

    EmptyError: '-164',
    EmptyListError: '-162',
    AlreadyAddedError: '-184',
    AddedNoActiveError: '-185',
    NoEntityError: '-183',
    NoEmailPhoneError: '-165',
    EntityCancelledError: '-142',
    NoCancelError: '-182',

    PwdValidityDays: 90,

    userActions: {
        login: {id: 1, name: 'login'},
        logout: {id: 2, name: 'logout'},
        addRow: {id: 3, name: 'agregar registro'},
        updateRow: { id: 4, name: 'actualizar registro' },
        deleteRow: { id: 5, name: 'eliminar registro' },
        makeRequest: {id: 6, name: 'realizar solicitud'},
        consult: { id: 7, name: 'realizar consulta' },
        cancelRequest: { id: 8, name: 'cancelar solicitud' },
        updateRequest: { id: 9, name: 'solicitud de actualización' }
    },


    ResetStates: {
        generated: 'G',
        completed: 'C'
    },
    UrlByPermission: [
        { permission: '4BYA', urls: ['/app/admin/action/associate'] }
    ],
    Roles: {
        Administrador:{text:'Administrador',id:1},
        Supervisor:{text:'Supervisor',id:2},
        Agente:{text:'Agente',id:3},
        Publico:{text:'Publico',id:4},
        Afiliado:{text:'Afiliado',id:5},
        Funeraria:{text:'Funeraria',id:6},
        Medico_Cabina:{text:'Medica Cabina',id:7},
        Supervisor_Cabina:{text:'Supervisor Cabina',id:8}
    },

    Fonts: {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
          },
    },


    ErrorCodes: {
        timeout: 'ETIMEDOUT',
        socket: 'ESOCKET'
    },

    ActionDescription: {
       closeSession: { id: 1, text: 'Se cerro la session del usuario', type: 'ADMIN'},
       requestConsult: { id: 2, text: 'Consulta a la datos', type: 'REQUEST' },
       registerUser: { id: 3, text: 'Se registro un nuevo usuario', type: 'REGISTER' },
       getUsers: { id: 4, text: 'Se solicito datos a la base de datos', type: 'REQUEST' },
       changeDB: { id: 5, text: 'Se solicito cambio en la base de datos', type: 'REQUEST' },
    },
    encriptacion :{
        key:'S3RV3RC1G2022_SU',
        iv:'1234567890123456'
      },

    COMETCHAT_CONSTANTS:{
        apiKey: '826167996966cb3b55f11ba6501f24adce10d891',
        appId: '2258042bcb827641',
        region: 'us',
        BASE_URL:'https://2258042bcb827641.api-us.cometchat.io/v3/'
    },
    salud_perfiles:{
        Administrador:1,
        Supervisor:2,
        Agente:3,
        Publico:4,
        Afiliado:5,
        Funeraria:6,
        Medico_Cabina:7,
        Supervisor_Cabina:8,
    },
    entidad:"INFOUTILITY",
    tipo_contrato:"AS"
}
