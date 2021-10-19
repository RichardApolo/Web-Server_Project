const request = require ("request")

const geocode= (address, callback)=>{
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoicmljaGFyZDE5NzIiLCJhIjoiY2t0YXJiZ2hsMW9uNDJ5bzgyNHBrdDk2cCJ9.8Bv3TT-zYMlCp45k0CgPgw&limit=1"

    request ({url, json: true}, (error, {body})=>{
        if (error){
            callback ("No hay acceso al sitio de geolocalizacion", undefined)
        }else if(body.features.length === 0 ) {
            callback("No se encontro ubicacion, intenta de nuevo", undefined)
        }else {
            callback (undefined, {
                longitud: body.features[0].center[0],
                latitud: body.features[0].center[1],
                Localizacion: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
