const db = require('../../db/conexion');
const config = require('../../db/config');
const mysql = require('mysql2/promise');

exports.consult6 = async (req, res) => {
    try {
        // Realiza la consulta SQL
        const consulta = `
            SELECT ROUND(COUNT(*)/5) AS 'Votos Nulos'
            FROM proyecto1_db.DETALLE_VOTO
            WHERE CANDIDATO_id_candidato = -1;
        
        `;

        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
   

        // Ejecutar la consulta principal utilizando una promesa
        const [results, fields] = await connection.execute(consulta);

        // Crear un objeto de respuesta JSON
        const jsonData = {
            consulta: 6,
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
