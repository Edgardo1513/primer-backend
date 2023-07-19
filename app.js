//Import express
const express = require('express');

//Import la instancia db que se creo
const db = require('./utils/database');

//Import modelo Users que se creo
const Users = require('./models/users.model');

//importacion de dotenv variable de entorno
require('dotenv').config();

//ejecutar modelo
Users;

//utilicizacion de variable de entorno
const PORT = process.env.PORT ?? 8000;// * || devuelve el primer verdadero o el ultimo falso
// * ?? asignar el valor de la derecha cuando el primero es null o undefined



//usar metodo authenticate();
db.authenticate()
    .then(() => {
        console.log("Base de datos conectada correctamente");
    })
    .catch(error => console.log(error));

    //sicronizacion de la informacion de la base de dato
    db.sync()// si no existe la tabla la crea. de lo contrario nada.
        .then(() => console.log('base de datos sincronizada'));

//creación de isntancia del paquete express que importamos, a la cual llamaremos la aplicación. 
const app = express();

//creacion de este middleware convertir a objeto o arrays de informacion que nos envian por el body de una petición
app.use(express.json());

//************** CRUD ***************/
//! *********** CREATE **************/
//* INSERT INTO table_name (column1, column2) VALUES (value1, value2);

/*
Users.create({
   email: 'edgard7215@outlook.com',
   password: '1234'
})
*/
/*
app._router.post('/users', (req, res) => {
    // este es metodo ansicronos nos devuelve una promesa
    User.create({
        email:"edgard7215@outlook.com",
        password: "1234",
    });
});
*/

app.post('/users', async (req, res) => {    
   // manejo de excepciones
   try {
    // codigo --> lanza un error
    //TODO obteniendo la información del body
    const newUser = req.body; //* { email, password}

    // TODO mandar a crear con la informacion obtenida
    const user = await Users.create(newUser);//* { email: 'kj3khjkw, password: 'kdfnsdkv}
   
    // TODO responder que se ha realizado la acción.
    // status son los codigo de htpps
    res.status(201).json();

   } catch (error) {
        // atrapar el error codigo 400 bad request 'solicitud mala'
        res.status(400).json();
   } 
});

//! ************ READ **************/
 //* SELECT * FROM users;
 //* SELECT id, name, lastname, email FROM users;
// ? Users.findAll();

app.get('/users', async (req, res) => {    
   // manejo de excepciones
   try {
    // codigo --> lanza un error
    //TODO Mandar a buscar a todos los usuarios
    const users = await Users.findAll({
       // attributes: ["id", "name", "lastname", "email"]
       attributes: {
        exclude: ["password"],
       },
    });

    // TODO Responder al cliente
    res.json(users);   

    } catch (error) {
        // atrapar el error codigo 400 bad request 'solicitud mala'
        res.status(400).json();
   } 
});

// encontrar a un usuario por su id
// path params -> parametros de ruta
app.get('/users/:id', async(req, res) => {
    try {
        //TODO obtener el id de la ruta
        const { id } = req.params;
        //TODO realizar la consulta ala base de dato
        const user = await Users.findByPk(id, {
            // attributes: ["id", "name", "lastname", "email"]
            attributes: {
             exclude: ["password"],
            },
         });
        //TODO Responder al cliente
        res.json(user);

    } catch (error) {
        res.status(400).json(error);
    }
});

//! ************* UPDATE **********/

app.put('/users/:id', async (req, res) => {
    try {
    // solo se permitirá modificar el name, lastname 
    //TODO obtener el id del usuario
    const {id} = req.params;
    //TODO obtener el body con la información
    //const userInfo = req.body;
    const {name, lastname} = req.body;
    //TODO realizar la consulta para actualizar
    //* responde un numero ( la cantidad de filas modificadas )
    //const user = await Users.update(userInfo, {
       const user = await Users.update( 
       { name, lastname },
       { 
        where: {id}, // --> shorthand {id: id}
    });
    res.status(201).send(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

//! ************* DELETE **********/

app.delete("/users/:id", async (req, res) => {
    try { 
    //TODO obtener el id de la ruta
    const {id} = req.params;
    //TODO eliminar en la base de datos
    await Users.destroy({ 
        where: {id}, // --> shorthand {id: id}
    });
    res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
    }
});

//creacion atender una solicitud de tipo get en la ruta raiz
app.get('/', (req, res) => {
    //creación  método send del objeto response (res) para enviar una respuesta al cliente 
    res.send('mi servidor ya esta corriendo');
});

//creación metodo de listen del servidor en el puerto
app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto ${PORT}`);
});





