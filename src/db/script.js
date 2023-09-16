
const script = `
create database proyecto1_db;


-- Primero, definir las tablas sin relaciones de clave foránea
CREATE TABLE IF NOT EXISTS proyecto1_db.CARGO 
(
    id_cargo INTEGER NOT NULL PRIMARY KEY, 
    cargo VARCHAR(40) NOT NULL 
);

CREATE TABLE IF NOT EXISTS proyecto1_db.DEPARTAMENTO 
(
    id_departamento INTEGER NOT NULL PRIMARY KEY, 
    nombre VARCHAR(25) NOT NULL 
);

CREATE TABLE IF NOT EXISTS proyecto1_db.PARTIDO 
(
    id_partido INTEGER NOT NULL PRIMARY KEY, 
    nombrepartido VARCHAR(60) NOT NULL, 
    siglas VARCHAR(10) NOT NULL, 
    fundacion DATE NOT NULL 
);

CREATE TABLE IF NOT EXISTS proyecto1_db.CIUDADANO 
(
    dpi VARCHAR(13) NOT NULL PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL, 
    apellido VARCHAR(50) NOT NULL, 
    direccion VARCHAR(70) NOT NULL, 
    telefono VARCHAR(15) NOT NULL, 
    edad INTEGER NOT NULL, 
    genero VARCHAR(1) NOT NULL 
);

-- Luego, definir las tablas con relaciones de clave foránea
CREATE TABLE IF NOT EXISTS proyecto1_db.MESA 
(
    id_mesa INTEGER NOT NULL PRIMARY KEY, 
    DEPARTAMENTO_id_departamento INTEGER NOT NULL
    
);

CREATE TABLE IF NOT EXISTS proyecto1_db.VOTO 
(
    id_voto INTEGER NOT NULL PRIMARY KEY, 
    fecha TIMESTAMP NOT NULL, 
    CIUDADANO_dpi VARCHAR(13) NOT NULL, 
    MESA_id_mesa INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS proyecto1_db.DETALLE_VOTO 
(
    id_detalle INTEGER NOT NULL PRIMARY KEY, 
    VOTO_id_voto INTEGER NOT NULL, 
    CANDIDATO_id_candidato INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS proyecto1_db.CANDIDATO 
(
    id_candidato INTEGER NOT NULL PRIMARY KEY, 
    nombre VARCHAR(45) NOT NULL, 
    fecha_nacimiento DATE NOT NULL, 
    PARTIDO_id_partido INTEGER NOT NULL,
    CARGO_id_cargo INTEGER NOT NULL
);

ALTER TABLE proyecto1_db.CANDIDATO
    ADD CONSTRAINT CANDIDATO_CARGO_FK FOREIGN KEY
    ( 
     CARGO_id_cargo
    ) 
    REFERENCES proyecto1_db.CARGO 
    ( 
     id_cargo
    )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
;

ALTER TABLE proyecto1_db.CANDIDATO
    ADD CONSTRAINT CANDIDATO_PARTIDO_FK FOREIGN KEY
    ( 
     PARTIDO_id_partido
    ) 
    REFERENCES proyecto1_db.PARTIDO 
    ( 
     id_partido
    )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
;

ALTER TABLE proyecto1_db.DETALLE_VOTO
    ADD CONSTRAINT DETALLE_VOTO_VOTO_FK FOREIGN KEY
    ( 
     VOTO_id_voto
    ) 
    REFERENCES proyecto1_db.VOTO 
    ( 
     id_voto
    )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
;

ALTER TABLE proyecto1_db.DETALLE_VOTO
    ADD CONSTRAINT DETALLE_VOTO_CANDIDATO_FK FOREIGN KEY
    ( 
     CANDIDATO_id_candidato
    ) 
    REFERENCES proyecto1_db.CANDIDATO 
    ( 
     id_candidato
    )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
;


ALTER TABLE proyecto1_db.MESA
    ADD CONSTRAINT MESA_DEPARTAMENTO_FK FOREIGN KEY
    ( 
     DEPARTAMENTO_id_departamento
    ) 
    REFERENCES proyecto1_db.DEPARTAMENTO 
    ( 
     id_departamento
    )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
;

ALTER TABLE proyecto1_db.VOTO
    ADD CONSTRAINT VOTO_CIUDADANO_FK FOREIGN KEY
    ( 
     CIUDADANO_dpi
    ) 
    REFERENCES proyecto1_db.CIUDADANO 
    ( 
     dpi
    )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
;

ALTER TABLE proyecto1_db.VOTO
    ADD CONSTRAINT VOTO_MESA_FK FOREIGN KEY
    ( 
     MESA_id_mesa
    ) 
    REFERENCES proyecto1_db.MESA 
    ( 
     id_mesa
    )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
;


;



`;

module.exports = script;



