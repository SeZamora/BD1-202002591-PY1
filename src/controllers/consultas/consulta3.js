const db = require('../../db/conexion');
const config = require('../../db/config');
const mysql = require('mysql2/promise');

exports.consult3 = async (req, res) => {
    try {
        // Realiza la consulta SQL
        const consulta = `
        SELECT C.nombre AS 'Nombre del Candidato',
        P.nombrepartido AS 'Partido'
        FROM proyecto1_db.CANDIDATO AS C
        JOIN proyecto1_db.PARTIDO AS P ON C.PARTIDO_id_partido = P.id_partido
        WHERE C.CARGO_id_cargo = 2;

        `;

        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
   

        // Ejecutar la consulta principal utilizando una promesa
        const [results, fields] = await connection.execute(consulta);

        // Crear un objeto de respuesta JSON
        const jsonData = {
            consulta: 3,
            message: 'Consulta exitosa',
            data: results,
        };

        // Enviar la respuesta como JSON
        res.status(200).json(jsonData);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA EN LA consulta 3', error },
        });
    }
}
