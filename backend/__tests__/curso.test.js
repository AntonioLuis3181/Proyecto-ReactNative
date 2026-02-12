const request = require('supertest');

// Apuntamos a tu servidor encendido
const API_URL = 'http://98.95.205.77:3000/api';

describe('TESTS DE LA API DE CURSOS', () => {

    let idCursoCreado = null; 

    // TEST 1: Comprobar que el listado carga bien
    test('1. GET /cursos - Debería devolver un 200 y una lista', async () => {
        const response = await request(API_URL).get('/cursos');
        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBe(true);
        expect(Array.isArray(response.body.datos)).toBe(true);
    });

    // TEST 2: Comprobar error 404
    test('2. GET /cursos/:id - Debería devolver 404 si el ID no existe', async () => {
        const response = await request(API_URL).get('/cursos/999999');
        expect(response.statusCode).toBe(404);
    });

    // TEST 3: Crear curso
    test('3. POST /cursos - Debería crear un curso nuevo', async () => {
        const nuevoCurso = {
            titulo: "Curso TEST Jest",
            descripcion: "Curso creado por test",
            precio: 10.50,
            horas: 20,
            id_plataforma: 1, 
            fecha_publicacion: "2024-01-01"
        };

        const response = await request(API_URL).post('/cursos').send(nuevoCurso);
        expect(response.statusCode).toBe(201);
        idCursoCreado = response.body.datos.id_curso; 
    });

    // TEST 4: Leer curso creado
    test('4. GET /cursos/:id - Debería devolver el curso recién creado', async () => {
        expect(idCursoCreado).not.toBeNull(); 
        const response = await request(API_URL).get(`/cursos/${idCursoCreado}`);
        expect(response.statusCode).toBe(200);
    });

    // TEST 5: Modificar curso
    test('5. PUT /cursos/:id - Debería modificar el curso', async () => {
        expect(idCursoCreado).not.toBeNull();
        const datosEditados = { titulo: "Curso TEST Jest EDITADO", precio: 50.00 };
        const response = await request(API_URL).put(`/cursos/${idCursoCreado}`).send(datosEditados);
        expect(response.statusCode).toBe(200);
    });

    // TEST 6: Borrar curso
    test('6. DELETE /cursos/:id - Debería borrar el curso', async () => {
        expect(idCursoCreado).not.toBeNull();
        const response = await request(API_URL).delete(`/cursos/${idCursoCreado}`);
        expect(response.statusCode).toBe(200);
    });

});