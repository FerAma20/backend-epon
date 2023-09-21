const axios = require('axios');

// URL del archivo que deseas descargar

// Función para descargar el archivo en formato byte[]
exports.downloadFile = async function(urlArchivo) {
  try {
    
    console.log('en downloadFile')
    const responses = await  axios.get(urlArchivo, {
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data, 'binary').toString('base64'))
    return responses;
  } catch (error) {
    console.log(error);
    throw error;
  }
}