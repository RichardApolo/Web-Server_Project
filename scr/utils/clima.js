const request = require ("request")

const clima = (longitud, latitud, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=18ea885554a10f35d7a401173e8adc93&query=" + encodeURIComponent(latitud)+","+(longitud) 
    request ({url, json:true},(error, {body})=>{
        if (error){
            callback ("El sitio del clima no esta disponible", undefined)
        }else if(body.error ) {
            callback("Direccion no encontrada", undefined)
        }else {
            callback (undefined, ("En :"+ body.location.name+" ,el pronostico es: "+ body.current.weather_descriptions[0]+" y el clima es de: " + body.current.temperature + " grados")
        )
        }
    })
}

module.exports = clima
