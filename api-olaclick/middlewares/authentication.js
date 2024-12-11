const jwt = require('jsonwebtoken');
const Users = require("../models/users");

// =====================
// Verificar Token
// =====================
const authMiddleware = async( req = request, res = response, next ) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];


    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        //console.log("TOKEN", token)
        const {data} = jwt.verify( token, process.env.SEED );
        // leer el usuario que corresponde al uid
        console.log("DATA", data)
        const usuario = await Users.findById( data._id );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !usuario.status ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }


        req.usuario = usuario;
        next();

    } catch (error) {

        console.log("ERROR TOKEN", error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

const authRol = ( ...roles  ) => {
    return (req, res = response, next) => {

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}


module.exports = {
  authMiddleware,
  authRol
}