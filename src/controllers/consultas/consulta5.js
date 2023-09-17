const db = require('../../db/conexion');
const config = require('../../db/config');
const mysql = require('mysql2/promise');

exports.consult5 = async (req, res) => {
    try {
        // Realiza la consulta SQL
        const consulta = `
            SELECT D.nombre AS 'Departamento',
            COUNT(*) AS 'Cantidad de Votaciones'
            FROM proyecto1_db.VOTO AS V
            JOIN proyecto1_db.MESA AS M ON V.MESA_id_mesa = M.id_mesa
            JOIN proyecto1_db.DEPARTAMENTO AS D ON M.DEPARTAMENTO_id_departamento = D.id_departamento
            GROUP BY D.nombre;
        `;

        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
   

        // Ejecutar la consulta principal utilizando una promesa
        const [results, fields] = await connection.execute(consulta);

        // Crear un objeto de respuesta JSON
        const jsonData = {
            consulta: 5,
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
