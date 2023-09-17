const db = require('../../db/conexion');
const config = require('../../db/config');
const mysql = require('mysql2/promise');

exports.consult1 = async (req, res) => {
    try {
        // Realiza la consulta SQL
        const consulta = `
        SELECT TABLA1.nombre AS 'nombre presidente',
        TABLA2.nombre AS 'nombre vicepresidente',
        P.nombrepartido AS 'partido'
        FROM proyecto1_db.CANDIDATO AS TABLA1
        JOIN proyecto1_db.CANDIDATO AS TABLA2 ON TABLA1.PARTIDO_id_partido = TABLA2.PARTIDO_id_partido
        JOIN proyecto1_db.PARTIDO AS P ON TABLA1.PARTIDO_id_partido = P.id_partido
        WHERE TABLA1.CARGO_id_cargo = 1 AND TABLA2.CARGO_id_cargo = 2;
        `;

        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        const scriptWithoutComments = consulta.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            const sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.querywithoutclose(connection, sql, []);
        }

        // Ejecutar la consulta principal utilizando una promesa
        const [results, fields] = await connection.execute(consulta);

        // Crear un objeto de respuesta JSON
        const jsonData = {
            consulta: 1,
            message: 'Consulta exitosa',
            data: results,
        };

        // Enviar la respuesta como JSON
        res.status(200).json(jsonData);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA EN LA consulta1', error },
        });
    }
}
