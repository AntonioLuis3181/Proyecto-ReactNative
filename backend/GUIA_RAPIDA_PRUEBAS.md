# 🚀 Guía Rápida - Ejecutar Pruebas

## Instalación Rápida

```bash
# 1. Navegar al directorio backend
cd backend

# 2. Instalar dependencias
npm install

# 3. Ejecutar las pruebas
npm test
```

## Comandos Disponibles

| Comando | Descripción |
|---------|-----------|
| `npm test` | Ejecuta todas las pruebas una vez |
| `npm run test:watch` | Ejecuta pruebas en modo watch (observa cambios) |
| `npm run test:coverage` | Genera reporte de cobertura |

## 📊 Qué se Prueba

### ✅ Entidad CURSO (`curso.test.js`)
- **GET** `/api/cursos` - Obtener todos + filtros
- **GET** `/api/cursos/:id` - Obtener por ID
- **POST** `/api/cursos` - Crear nuevo
- **PUT** `/api/cursos/:id` - Actualizar
- **DELETE** `/api/cursos/:id` - Eliminar
- **Validaciones** - Estructura de datos, tipos, ranges

### ✅ Entidad PLATAFORMA (`plataforma.test.js`)
- **GET** `/api/plataformas` - Obtener todos + búsqueda + paginación
- **GET** `/api/plataformas/:id` - Obtener por ID
- **POST** `/api/plataformas` - Crear nuevo
- **PUT** `/api/plataformas/:id` - Actualizar
- **DELETE** `/api/plataformas/:id` - Eliminar
- **Validaciones** - Estructura de datos, tipos, restricciones

## 📝 Estructura de Archivos

```
backend/
├── __tests__/
│   ├── curso.test.js           # ~50 pruebas
│   └── plataforma.test.js      # ~55 pruebas
├── jest.config.js              # Configuración de Jest
├── package.json                # Dependencies actualizadas
└── PRUEBAS_DOCUMENTACION.md    # Documentación completa
```

## 🎯 Agrupación de Pruebas con `describe`

Las pruebas están organizadas jerárquicamente:

```
CURSO API
├── GET /api/cursos
│   ├── Obtener todos los cursos
│   └── Con parámetros de filtro
├── GET /api/cursos/:id
│   ├── Obtener curso específico
│   └── Curso no encontrado (404)
├── POST /api/cursos
│   ├── Crear curso válido
│   └── Crear curso con datos inválidos
├── PUT /api/cursos/:id
│   ├── Actualizar curso
│   └── Actualizar curso no encontrado
├── DELETE /api/cursos/:id
│   ├── Eliminar curso
│   └── Eliminar curso no encontrado
├── Validaciones de Estructura de Datos
└── Headers y Content-Type
```

## 🔍 Tipos de Validaciones

Cada prueba valida:

1. **Status HTTP correcto** (200, 201, 204, 400, 404, 500)
2. **Estructura de respuesta** (ok, datos, mensaje)
3. **Tipos de datos** (string, number, boolean, array)
4. **Campos requeridos** (no nulos, no vacíos)
5. **Rangos de valores** (positivos, fechas válidas)
6. **Contenido correcto** (datos coinciden con enviados)
7. **Headers HTTP** (Content-Type: application/json)
8. **Comportamiento en errores** (mensajes descriptivos)

## 📦 Datos de Prueba

### Curso Ejemplo
```json
{
  "titulo": "Curso de React Avanzado",
  "descripcion": "Aprende hooks y context",
  "precio": 19.99,
  "horas": 40,
  "id_plataforma": 1,
  "imagen_url": "https://via.placeholder.com/150",
  "fecha_publicacion": "2024-02-01"
}
```

### Plataforma Ejemplo
```json
{
  "nombre": "Plataforma Nueva Test",
  "url_web": "https://www.test.com",
  "es_gratuita": true,
  "fecha_alta": "2024-01-27"
}
```

## ✨ Características Principales

✅ **Pruebas Completas de CRUD** - Create, Read, Update, Delete  
✅ **Validación de Estructura de Datos** - Tipos y valores  
✅ **Casos de Error** - 404, 400, 500 errors  
✅ **Filtros y Búsqueda** - Parámetros de query  
✅ **Paginación** - Límites y páginas  
✅ **Headers HTTP** - Content-Type validado  
✅ **Agrupación Lógica** - describe blocks organizados  
✅ **Reutilización de Datos** - Constantes compartidas  

## 🚦 Requisitos Previos

- Node.js v14+
- npm o yarn
- Base de datos MySQL con schema cargado (ver `backend/sql/elearning_db.sql`)

## 📝 Basado en Requests REST

Las pruebas se basan en los requests definidos en:
- `backend/request/cursoRequest.rest`
- `backend/request/plataformaRequest.rest`

Todos los tipos de request están cubiertos:
- ✅ GET todos
- ✅ GET con filtros
- ✅ GET por ID
- ✅ GET inexistente (404)
- ✅ POST crear
- ✅ POST con datos inválidos
- ✅ PUT actualizar
- ✅ PUT inexistente (404)  
- ✅ DELETE eliminar
- ✅ DELETE inexistente (404)

## 🐛 Si algo no funciona

```bash
# Verificar instalación
npm install

# Limpiar caché de Jest
npm test -- --clearCache

# Ejecutar con salida detallada
npm test -- --verbose

# Ejecutar solo una suite
npm test curso.test.js
```

## 📚 Documentación Completa

Ver [PRUEBAS_DOCUMENTACION.md](./PRUEBAS_DOCUMENTACION.md) para:
- Descripción detallada de cada prueba
- Explicación de parámetros
- Estructura de respuestas esperadas
- Métricas de cobertura
- Troubleshooting

---

**¡Listo!** Las pruebas están completamente configuradas y documentadas.
