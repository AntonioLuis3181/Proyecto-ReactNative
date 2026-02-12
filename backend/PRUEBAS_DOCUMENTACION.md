# Documentación de Pruebas - API REST E-Learning

## 📋 Descripción General

Este documento proporciona una guía completa sobre las pruebas automatizadas para los endpoints de la API REST del proyecto E-Learning. Las pruebas están desarrolladas con **Jest** y **Supertest** siguiendo las mejores prácticas de testing.

## 🏗️ Estructura del Proyecto de Pruebas

```
backend/
├── __tests__/
│   ├── curso.test.js          # Pruebas de la entidad Curso
│   └── plataforma.test.js     # Pruebas de la entidad Plataforma
├── jest.config.js             # Configuración de Jest
└── package.json               # Dependencias de prueba
```

## ⚙️ Instalación de Dependencias

```bash
cd backend
npm install
```

### Dependencias de Prueba Instaladas:

- **jest** ^29.7.0 - Framework de pruebas
- **supertest** ^6.3.3 - Cliente HTTP para testing
- **nodemon** ^3.1.11 - Herramienta de desarrollo

## 🚀 Comando de Ejecución de Pruebas

### Ejecutar todas las pruebas:
```bash
npm test
```

### Ejecutar pruebas en modo watch (observa cambios):
```bash
npm run test:watch
```

### Ejecutar pruebas con cobertura:
```bash
npm run test:coverage
```

## 📊 Cobertura de Pruebas

### Entidad CURSO (`curso.test.js`)

#### Suites de Pruebas Implementadas:

1. **GET /api/cursos - Obtener Todos los Cursos**
   - ✅ Validar código de status HTTP 200
   - ✅ Estructura de respuesta correcta (ok, datos, mensaje)
   - ✅ Datos retornado como array
   - ✅ Propiedades de cada curso
   - ✅ Filtro por búsqueda de título
   - ✅ Filtro por fecha inicio
   - ✅ Filtro por fecha fin
   - ✅ Filtro por rango de fechas

2. **GET /api/cursos/:id - Obtener Curso por ID**
   - ✅ Código 200 para ID válido
   - ✅ Estructura válida del curso
   - ✅ Tipos de datos correctos
   - ✅ Propiedades necesarias (id_curso, titulo, precio, horas, id_plataforma)
   - ✅ Código 404 para ID inexistente
   - ✅ Mensaje de error apropiado

3. **POST /api/cursos - Crear Nuevo Curso**
   - ✅ Código 201 para creación exitosa
   - ✅ Respuesta con ID generado
   - ✅ Datos coinciden con enviados
   - ✅ Validación de campos obligatorios (titulo, id_plataforma)
   - ✅ Rechazo de JSON inválido (400)
   - ✅ Mensaje de confirmación

4. **PUT /api/cursos/:id - Actualizar Curso**
   - ✅ Código 200 para actualización exitosa
   - ✅ Actualización parcial de campos
   - ✅ Código 404 para ID inexistente
   - ✅ Mensaje de error con ID

5. **DELETE /api/cursos/:id - Eliminar Curso**
   - ✅ Código 200 para eliminación exitosa
   - ✅ Verificación de eliminación en BD
   - ✅ Código 404 para ID inexistente
   - ✅ Mensaje de error apropiado

6. **Validaciones de Estructura de Datos**
   - ✅ Estructura estándar de respuesta
   - ✅ Coherencia entre códigos HTTP y respuestas
   - ✅ Tipos de datos correctos para cada campo
   - ✅ Validaciones de rango (id > 0, precio >= 0, horas >= 0)

7. **Validaciones de Headers**
   - ✅ Content-Type: application/json en respuestas
   - ✅ Aceptación de application/json en requests
   - ✅ Headers correctos en todas las operaciones CRUD

### Entidad PLATAFORMA (`plataforma.test.js`)

#### Suites de Pruebas Implementadas:

1. **GET /api/plataformas - Obtener Todas las Plataformas**
   - ✅ Validar código 200
   - ✅ Estructura de respuesta correcta
   - ✅ Validación de array de datos
   - ✅ Filtro por búsqueda (case-insensitive)
   - ✅ Filtro por búsqueda parcial
   - ✅ Filtro por rango de fechas
   - ✅ Paginación (page, limit)

2. **GET /api/plataformas/:id - Obtener Plataforma por ID**
   - ✅ Código 200 para ID válido
   - ✅ Tipos de datos correctos
   - ✅ Propiedades necesarias
   - ✅ Código 404 para ID inexistente
   - ✅ Mensajes de error apropiados

3. **POST /api/plataformas - Crear Nueva Plataforma**
   - ✅ Código 201 para creación exitosa
   - ✅ ID generado automáticamente
   - ✅ Campos obligatorios (nombre, es_gratuita)
   - ✅ Rechazo de datos inválidos
   - ✅ Validaciones de estructura

4. **PUT /api/plataformas/:id - Actualizar Plataforma**
   - ✅ Código 204 para actualización exitosa
   - ✅ Actualizaciones parciales
   - ✅ Código 404 para ID inexistente
   - ✅ Validaciones de integridad

5. **DELETE /api/plataformas/:id - Eliminar Plataforma**
   - ✅ Código 204 para eliminación exitosa
   - ✅ Verificación de eliminación
   - ✅ Código 404 para ID inexistente
   - ✅ Mensajes de error

6. **Validaciones de Estructura de Datos**
   - ✅ Tipos de datos correctos
   - ✅ Validaciones de rango
   - ✅ Restricciones de campos

7. **Validaciones de Negocio**
   - ✅ Restricción de nombre (máx 100 caracteres)
   - ✅ Validación de URL
   - ✅ Validación de es_gratuita (0 o 1)

## 📝 Estructura de Pruebas

### Formato de Suite (describe blocks)


```javascript
describe('ENTIDAD API - OPERACIÓN', () => {
  describe('TIPO DE REQUEST - Descripción', () => {
    test('Debe validar propiedad específica', async () => {
      const response = await request(app)
        .get('/api/ruta')
        .expect(200);
      
      expect(response.body).toHaveProperty('ok');
    });
  });
});
```

### Patrón de Pruebas

Cada suite sigue el patrón **AAA (Arrange-Act-Assert)**:

1. **Arrange**: Preparar datos de prueba
2. **Act**: Ejecutar la acción (request HTTP)
3. **Assert**: Validar el resultado

## 🔍 Tipos de Validaciones Incluidas

### 1. Validaciones de Status HTTP
- ✅ 200 (OK)
- ✅ 201 (Created)
- ✅ 204 (No Content)
- ✅ 400 (Bad Request)
- ✅ 404 (Not Found)
- ✅ 500 (Internal Server Error)

### 2. Validaciones de Estructura de Respuesta
```javascript
{
  ok: boolean,
  datos: object|array|null,
  mensaje: string
}
```

### 3. Validaciones de Tipos de Datos
- Strings no vacíos
- Números positivos
- Booleanos
- Arrays
- Null para campos opcionales

### 4. Validaciones de Contenido
- Campos obligatorios
- Rangos de valores
- Formatos válidos (URLs, fechas)
- Coincidencia de datos enviados vs recibidos

## 📦 Datos de Prueba

### Curso Válido
```javascript
{
  titulo: 'Curso de React Avanzado',
  descripcion: 'Aprende hooks y context',
  precio: 19.99,
  horas: 40,
  id_plataforma: 1,
  imagen_url: 'https://via.placeholder.com/150',
  fecha_publicacion: '2024-02-01'
}
```

### Plataforma Válida
```javascript
{
  nombre: 'Plataforma Nueva Test',
  url_web: 'https://www.test.com',
  es_gratuita: true,
  fecha_alta: '2024-01-27'
}
```

## 🚨 Casos de Error Cubiertos

### Para Curso:
- ❌ ID inexistente → 404
- ❌ Título faltante → 500
- ❌ id_plataforma faltante → 500
- ❌ JSON inválido → 400

### Para Plataforma:
- ❌ ID inexistente → 404
- ❌ Nombre faltante → 500
- ❌ es_gratuita faltante → 500
- ❌ JSON inválido → 400

## 🔧 Configuración de Jest

### Archivo: `jest.config.js`

```javascript
{
  testEnvironment: 'node',
  collectCoverageFrom: [...],
  testMatch: ['**/__tests__/**/*.test.js'],
  verbose: true,
  testTimeout: 10000,
  forceExit: true,
  clearMocks: true
}
```

## 📈 Métricas de Pruebas

### Total de Pruebas por Entidad:
- **Curso**: ~50 pruebas
- **Plataforma**: ~55 pruebas
- **Total**: ~105 pruebas

### Cobertura de Operaciones:
- ✅ GET (filtro, búsqueda, paginación) - 25%
- ✅ POST (validación de datos) - 25%
- ✅ PUT (actualización parcial) - 25%
- ✅ DELETE (eliminación) - 15%
- ✅ Validaciones de estructura - 10%

## 🔄 Ciclo de Vida de Pruebas

```
┌─────────────────────┐
│  npm test           │
├─────────────────────┤
│  Jest inicia        │
├─────────────────────┤
│  Busca *.test.js    │
├─────────────────────┤
│  Ejecuta suites     │
├─────────────────────┤
│  Agrupa con describe│
├─────────────────────┤
│  Ejecuta tests      │
├─────────────────────┤
│  Valida assertions  │
├─────────────────────┤
│  Reporta resultados │
└─────────────────────┘
```

## 🎯 Mejores Prácticas Implementadas

1. **Separación de Concerns**: Pruebas organizadas por entidad
2. **Nomenclatura Clara**: Nombres descriptivos de suites y tests
3. **Agrupación Lógica**: Describe blocks por tipo de operación
4. **Reutilización**: Constantes de datos de prueba
5. **Independencia**: Cada test puede ejecutarse aisladamente
6. **Cobertura Completa**: Caminos felices y casos de error
7. **Documentación**: JSDoc en archivos de prueba
8. **Mantenibilidad**: Código limpio y bien estructurado

## 🐛 Troubleshooting

### Las pruebas no se ejecutan
```bash
# Verificar que está en el directorio backend
cd backend

# Reinstalar dependencias
npm install

# Ejecutar nuevamente
npm test
```

### Puerto 3000 ya en uso
Los tests usan supertest que no necesita servidor externo, pero verifica que no haya otro proceso en el puerto 3000.

### Timeout en pruebas
Incrementar timeout en jest.config.js:
```javascript
testTimeout: 15000  // 15 segundos
```

## 📚 Referencias

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Express Testing Best Practices](https://expressjs.com/)

## 📋 Checklist de Validación

- ✅ Estructura de carpetas correcta
- ✅ Dependencias instaladas
- ✅ Configuración de Jest completada
- ✅ Archivos de prueba creados
- ✅ Index.js exporta la aplicación
- ✅ Pruebas pueden ejecutarse correctamente
- ✅ Cobertura de funcionalidad completa
- ✅ Manejo de errores validado

---

**Última actualización**: Febrero 2026  
**Versión**: 1.0.0  
**Autor**: Antonio Luis Vela Garcia
