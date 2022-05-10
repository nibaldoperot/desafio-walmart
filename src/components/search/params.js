export default {
    operation: 'buscar',
    endpoint: '/search/:query',
    messages: {
        '0000': {
            message: 'Éxito al buscar un resultado',
            httpCode: 200
        },
        '0001':{
            message: 'Error en lectura de datos',
            httpCode: 500,
            errorCode: '0001'
        },
        '0002':{
            message: 'Error en ejecución',
            httpCode: 500,
            errorCode: '0002'
        },
        '0003':{
            message: 'No se encontraron resultados',
            httpCode: 200,
        },
        '0004':{
            message: 'Búsqueda por texto debe ser de más de 3 carácteres',
            httpCode: 400,
            errorCode: '0004'
        }
    }
}
