
const path = require ("path")
const express = require ("express")
const hbs = require ("hbs")
const geocode = require ("./utils/geocode")
const clima = require ("./utils/clima")
const request = require ("request")
const app = express()
const port= process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join (__dirname,"../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join (__dirname, "../templates/partial")

// Setup handlebars engine and views
app.set ("view engine", "hbs")
app.set ("views", viewsPath)
app.use (express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.get ("", (req,res)=>{
    res.render("index", {
        title: "Weather",
        name: "Richard M."
    })
})

app.get ("/index", (req,res)=>{
    res.render ("index", {
        title: "indice",
        name: "Richard M."
    })
})

app.get ("/about", (req,res)=>{
    res.render ("about",{
        title: "About",
        name: "Richard M."
    })
})

app.get ("/help",(req,res)=>{
    res.render("help",{
        title: "Help",
        name: "Richard M."
    })
})
/*app.get("/weather",(req,res)=>{
    if (!req.query.address){
        return res.send ({
            error: "Error, indica una direccion"
        })
    }
    
    console.log (req.query.address)
    res.send({
        Estado: "philadelphia",
        Pronostico:"Parcialmente  nublado",
        address: req.query.address
    })
})*/

app.get ("/weather",(req,res)=>{
    if (!req.query.address){
        return res.send ({
            error: "Error,Indica una direccion real!!"
        })
    }

    geocode(req.query.address, (error,{longitud, latitud, location} ={} )=>{
        if (error) {
            return res.send ({error})
        }

        clima(longitud, latitud, (error,forecastData)=>{
            if(error){
                return res.send ({error})
            }

            res.send({
                clima: forecastData,
                location,
                address: req.query.address
            })
        })
    })

  // console.log (req.query.address)
    //    res.send({
      //      Estado: "philadelphia",
        //    Pronostico:"Parcialmente  nublado",
          //  address: req.query.address
    //})
})

app.get ("/products",(req,res)=>{
    if (!req.query.search){
        return res.send ({
            error: "Error, necesitas ingresar una busqueda"
        })
    }
    console.log (req.query.search)
    res.send ({
        products: []
    })

})
app.get ("/help/*",(req,res)=>{
    res.render ("page404",{
        title: "404",
        name: "Richard",
        errormsg: "Help article not found"
    })
})

app.get ("*",(req,res)=>{
    res.render ("page404",{
        title: "404",
        name: "Richard",
        errormsg: "Page not found"
    })
})

app.listen(port, ()=>{
    console.log("Servidor en el puerto" + port)
})