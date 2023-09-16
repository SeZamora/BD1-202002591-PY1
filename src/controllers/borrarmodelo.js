const db = require('../db/conexion');

exports.borrarmodel = async (req, res) => {

    const script = `

    DROP DATABASE IF EXISTS proyecto1_db;

    DROP TABLE IF EXISTS proyecto1_db.CARGO;
  
    DROP TABLE IF EXISTS proyecto1_db.DEPARTAMENTO;
  
    DROP TABLE IF EXISTS proyecto1_db.PARTIDO;
    
    DROP TABLE IF EXISTS proyecto1_db.CIUDADANO;

    DROP TABLE IF EXISTS proyecto1_db.MESA;
    
    DROP TABLE IF EXISTS proyecto1_db.VOTO;

    DROP TABLE IF EXISTS proyecto1_db.CANDIDATO;
    
    DROP TABLE IF EXISTS proyecto1_db.DETALLE_VOTO;
    `;

    try {
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = script.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.query(sql,[]);
        }

        res.status(200).json({
            body: { res: true, message: 'MODELO BORRADO EXITOSAMENTE' },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CREAR EL MODELO', error },
        });
    }
}
