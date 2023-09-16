const tempo = `
-- Definir las tablas temporales sin relaciones de clave foránea
CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1_db.CARGO_TEMP 
(
    id_cargo INTEGER NOT NULL PRIMARY KEY, 
    cargo VARCHAR(40) NOT NULL 
);

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1_db.DEPARTAMENTO_TEMP 
(
    id_departamento INTEGER NOT NULL PRIMARY KEY, 
    nombre VARCHAR(25) NOT NULL 
);

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1_db.PARTIDO_TEMP 
(
    id_partido INTEGER NOT NULL PRIMARY KEY, 
    nombrepartido VARCHAR(60) NOT NULL, 
    siglas VARCHAR(10) NOT NULL, 
    fundacion DATE NOT NULL 
);

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1_db.CIUDADANO_TEMP 
(
    dpi VARCHAR(13) NOT NULL PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL, 
    apellido VARCHAR(50) NOT NULL, 
    direccion VARCHAR(70) NOT NULL, 
    telefono VARCHAR(15) NOT NULL, 
    edad INTEGER NOT NULL, 
    genero VARCHAR(1) NOT NULL 
);

-- Definir las tablas temporales con relaciones de clave foránea
CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1_db.MESA_TEMP 
(
    id_mesa INTEGER NOT NULL PRIMARY KEY, 
    DEPARTAMENTO_id_departamento INTEGER NOT NULL

);

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1_db.VOTO_TEMP 
(
    id_voto INTEGER NOT NULL PRIMARY KEY, 
    fecha TIMESTAMP NOT NULL, 
    CIUDADANO_dpi VARCHAR(13) NOT NULL, 
    MESA_id_mesa INTEGER NOT NULL

);

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1_db.CANDIDATO_TEMP 
(
    id_candidato INTEGER NOT NULL PRIMARY KEY, 
    nombre VARCHAR(45) NOT NULL, 
    fecha_nacimiento DATE NOT NULL, 
    PARTIDO_id_partido INTEGER NOT NULL,
    CARGO_id_cargo INTEGER NOT NULL

);

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1_db.DETALLE_VOTO_TEMP 
(
    id_detalle INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    VOTO_id_voto INTEGER NOT NULL, 
    CANDIDATO_id_candidato INTEGER NOT NULL

);



`;

module.exports = tempo;



