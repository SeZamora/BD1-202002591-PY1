
-- Consulta1

        SELECT TABLA1.nombre AS 'nombre presidente',
        TABLA2.nombre AS 'nombre vicepresidente',
        P.nombrepartido AS 'partido'
        FROM proyecto1_db.CANDIDATO AS TABLA1
        JOIN proyecto1_db.CANDIDATO AS TABLA2 ON TABLA1.PARTIDO_id_partido = TABLA2.PARTIDO_id_partido
        JOIN proyecto1_db.PARTIDO AS P ON TABLA1.PARTIDO_id_partido = P.id_partido
        WHERE TABLA1.CARGO_id_cargo = 1 AND TABLA2.CARGO_id_cargo = 2;
-- Consulta2
        SELECT P.nombrepartido AS 'Partido',
       COUNT(*) AS 'Número de Candidatos a Diputados'
        FROM proyecto1_db.CANDIDATO AS C
        JOIN proyecto1_db.PARTIDO AS P ON C.PARTIDO_id_partido = P.id_partido
        WHERE C.CARGO_id_cargo IN (3, 4, 5)
        GROUP BY P.nombrepartido;
-- Consulta 3
        SELECT C.nombre AS 'Nombre del Candidato',
        P.nombrepartido AS 'Partido'
        FROM proyecto1_db.CANDIDATO AS C
        JOIN proyecto1_db.PARTIDO AS P ON C.PARTIDO_id_partido = P.id_partido
        WHERE C.CARGO_id_cargo = 2;
-- Consulta 4

            SELECT P.nombrepartido AS 'Partido',
            COUNT(*) AS 'candidatos'
            FROM proyecto1_db.CANDIDATO AS C
            JOIN proyecto1_db.PARTIDO AS P ON C.PARTIDO_id_partido = P.id_partido
            WHERE C.CARGO_id_cargo IN (1, 2, 3, 4, 5, 6)
            GROUP BY P.nombrepartido;
            
-- Consulta 5

            SELECT D.nombre AS 'Departamento',
            COUNT(*) AS 'Cantidad de Votaciones'
            FROM proyecto1_db.VOTO AS V
            JOIN proyecto1_db.MESA AS M ON V.MESA_id_mesa = M.id_mesa
            JOIN proyecto1_db.DEPARTAMENTO AS D ON M.DEPARTAMENTO_id_departamento = D.id_departamento
            GROUP BY D.nombre;
            
-- Consulta 6

            SELECT ROUND(COUNT(*)/5) AS 'Votos Nulos'
            FROM proyecto1_db.DETALLE_VOTO
            WHERE CANDIDATO_id_candidato = -1;
            
-- Consulta 11

            SELECT C.genero AS 'Género',
            COUNT(*) AS 'Cantidad de Votos'
            FROM proyecto1_db.VOTO AS V
            JOIN proyecto1_db.CIUDADANO AS C ON V.CIUDADANO_dpi = C.dpi
            GROUP BY C.genero;