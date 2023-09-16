const db = require('../db/conexion');
const config = require('../db/config')
const mysql = require('mysql2/promise')
const fs = require('fs');
const scriptTemp = require('../db/tempo');

const path = require('path');
const csvcandidatos = path.join(__dirname, 'candidatos.csv');
const csvcargos = path.join(__dirname, 'cargos.csv');
const csvciudadanos = path.join(__dirname, 'ciudadanos.csv');
const csvdepartamentos = path.join(__dirname, 'departamentos.csv');
const csvmesas = path.join(__dirname, 'mesas.csv');
const csvpartidos = path.join(__dirname, 'partidos.csv');
const csvvotaciones = path.join(__dirname, 'votaciones.csv');
exports.crearTabtemp = async (req, res) => {

    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = scriptTemp.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            const sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.querywithoutclose(connection, sql, []);
        }

        // CARGOS
        const datosCargos = fs.readFileSync(csvcargos, 'utf-8');
        const cargos = datosCargos.split('\n');
        for (let i = 1; i < cargos.length; i++) {
            const fields = cargos[i].split(',');
            const id = fields[0];
            const nombre = fields[1];

            if (nombre !== undefined) {
                // Insertar los datos en la tabla temporal
                await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.CARGO_TEMP (id_cargo, cargo) VALUES (?, ?)`, [id, nombre]);
            }
        }
        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO  proyecto1_db.CARGO (id_cargo, cargo) SELECT id_cargo, cargo FROM proyecto1_db.CARGO_TEMP`, []);        

        // DEPARTAMENTOS
        const datosDepartamentos = fs.readFileSync(csvdepartamentos, 'utf-8');
        const departamento = datosDepartamentos.split('\n');
        for (let i = 1; i < departamento.length; i++) {
            const fields = departamento[i].split(',');
            const id = fields[0];
            const nombre = fields[1];

            if (nombre !== undefined){
                // Insertar los datos en la tabla temporal
                await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.DEPARTAMENTO_TEMP (id_departamento, nombre) VALUES (?, ?)`, [id, nombre]);
            }
        }
        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO  proyecto1_db.DEPARTAMENTO (id_departamento, nombre) SELECT id_departamento, nombre FROM proyecto1_db.DEPARTAMENTO_TEMP`, []);        

        // PARTIDO
        const datosPartido = fs.readFileSync(csvpartidos, 'utf-8');
        const partido = datosPartido.split('\n');
        for (let i = 1; i < partido.length; i++) {
            const fields = partido[i].split(',');
            const id = fields[0];
            const nombre = fields[1];
            const siglas = fields[2];
            let fundacion = fields[3];
            if (fundacion !== undefined) {
                fundacion = fundacion.replace(/\r/g, '').trim();
                const partesFecha = fundacion.split('/');
                fundacion = partesFecha[2] + '-' + partesFecha[1] + '-' + partesFecha[0];
            }

            if (nombre !== undefined) {
                // Insertar los datos en la tabla temporal
                await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.PARTIDO_TEMP (id_partido, nombrepartido, siglas, fundacion) VALUES (?, ?, ?, ?)`, [id, nombre, siglas, fundacion]);
            }
        }
        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO  proyecto1_db.PARTIDO (id_partido, nombrepartido, siglas, fundacion) SELECT id_partido, nombrepartido, siglas, fundacion FROM proyecto1_db.PARTIDO_TEMP`, []);
        // CIUDADANOS
        const datosCiudadano = fs.readFileSync(csvciudadanos, 'utf-8');
        const ciudadano = datosCiudadano.split('\n');
        for (let i = 1; i < ciudadano.length; i++) {
            const fields = ciudadano[i].split(',');
            const dpi = fields[0];
            const nombre = fields[1];
            const apellido = fields[2];
            const direccion = fields[3];
            const telefono = fields[4];
            const edad = fields[5];
            const genero = fields[6];

            if (nombre !== undefined) {
                // Insertar los datos en la tabla temporal
                await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.CIUDADANO_TEMP (dpi, nombre, apellido, direccion, telefono, edad, genero) VALUES (?, ?, ?, ?, ?, ?, ?)`, [dpi, nombre, apellido, direccion, telefono, edad, genero]);
            }
        }
        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.CIUDADANO (dpi, nombre, apellido, direccion, telefono, edad, genero) SELECT dpi, nombre, apellido, direccion, telefono, edad, genero FROM proyecto1_db.CIUDADANO_TEMP`, []);

        // MESA
        const datosMesa = fs.readFileSync(csvmesas, 'utf-8');
        const mesa = datosMesa.split('\n');
        for (let i = 1; i < mesa.length; i++) {
            const fields = mesa[i].split(',');
            const id = fields[0];
            const dep = fields[1];

            if (dep !== undefined) {
                // Insertar los datos en la tabla temporal
                await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.MESA_TEMP (id_mesa, DEPARTAMENTO_id_departamento) VALUES (?, ?)`, [id, dep]);
            }
        }
        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO  proyecto1_db.MESA (id_mesa, DEPARTAMENTO_id_departamento) SELECT id_mesa, DEPARTAMENTO_id_departamento FROM proyecto1_db.MESA_TEMP`, []);
        
         // CANDIDATOS
        const datosCandidatos = fs.readFileSync(csvcandidatos, 'utf-8');
        const candidato = datosCandidatos.split('\n');
        for (let i = 1; i < candidato.length; i++) {
            const fields = candidato[i].split(',');
            const id = fields[0];
            const nombre = fields[1];
    
            let fecha = fields[2];
           
            if (fecha !== undefined) {
                const partesFecha = fecha.split('/');
                fecha = partesFecha[2] + '-' + partesFecha[1] + '-' + partesFecha[0];
            }

            const partido = fields[3];
            const cargo = fields[4];
            if (fecha !== undefined) {
                // Insertar los datos en la tabla temporal              
                await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.CANDIDATO_TEMP (id_candidato, nombre, fecha_nacimiento, PARTIDO_id_partido, CARGO_id_cargo) VALUES (?, ?, ?, ?, ?)`, [id, nombre, fecha, partido, cargo]);
        
            }
        }
        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.CANDIDATO (id_candidato, nombre, fecha_nacimiento, PARTIDO_id_partido, CARGO_id_cargo) SELECT id_candidato, nombre, fecha_nacimiento, PARTIDO_id_partido, CARGO_id_cargo FROM proyecto1_db.CANDIDATO_TEMP`, []);

        // VOTACIONES
        const datosVotaciones = fs.readFileSync(csvvotaciones, 'utf-8');
        const votacion = datosVotaciones.split('\n');
        for (let i = 1; i < votacion.length; i++) {
            const fields = votacion[i].split(',');
            const id_voto = fields[0];
            const id_cand = fields[1];
            const dpi_c = fields[2];
            const mesa_id = fields[3];
            let fecha = fields[4];
            if (fecha !== undefined) {
             
                const partes = fecha.split(' '); // Dividir la cadena en fecha y hora
                const fechaPartes = partes[0].split('/');
                const fechaMySQL = fechaPartes[2] + '-' + fechaPartes[1] + '-' + fechaPartes[0];
                const horaMySQL = partes[1];
                fecha = fechaMySQL + ' ' + horaMySQL;
            }

            if (fecha !== undefined) {
                if ((i - 1) % 5 === 0) {
                    //console.log(i + " <- i"+ i-1 + " <- i-1") ;
                   
                    await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.VOTO_TEMP (id_voto, fecha, CIUDADANO_dpi, MESA_id_mesa) VALUES (?, ?, ?, ?)`, [id_voto, fecha, dpi_c, mesa_id]);
                    await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.DETALLE_VOTO_TEMP (VOTO_id_voto, CANDIDATO_id_candidato) VALUES (?, ?)`, [id_voto, id_cand]);
                } else {
                    // Insertar los datos en la tabla temporal
                    await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.DETALLE_VOTO_TEMP (VOTO_id_voto, CANDIDATO_id_candidato) VALUES (?, ?)`, [id_voto, id_cand]);
            
                }
            }
        }
        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.VOTO (id_voto, fecha, CIUDADANO_dpi, MESA_id_mesa) SELECT id_voto, fecha, CIUDADANO_dpi, MESA_id_mesa FROM proyecto1_db.VOTO_TEMP`, []);

        await db.querywithoutclose(connection, `INSERT INTO proyecto1_db.DETALLE_VOTO (id_detalle, VOTO_id_voto, CANDIDATO_id_candidato) SELECT id_detalle, VOTO_id_voto, CANDIDATO_id_candidato FROM proyecto1_db.DETALLE_VOTO_TEMP`, []);

       
        await connection.end();

        res.status(200).json({
            body: { res: true, message: 'TABLAS TEMPORALES HAN SIDO CREADAS EXITOSAMENTE' },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CREAR TABLAS TEMPORALES', error },
        });
    }
}
