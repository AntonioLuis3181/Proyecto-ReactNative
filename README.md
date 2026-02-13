# EduDAM - Gestión de Cursos

Aplicación móvil desarrollada en React Native (Expo) para la gestión de cursos, alumnos y matrículas. El proyecto utiliza una arquitectura Cliente-Servidor con API REST en Node.js y base de datos MySQL.

## a. Enlace al Repositorio

Puedes encontrar el código fuente completo en el siguiente enlace:
👉 **https://github.com/TU_USUARIO/NOMBRE_DEL_REPO**

---

## b. Datos de Conexión a la Base de Datos

Para el correcto funcionamiento de la API, se requiere una base de datos MySQL con la siguiente configuración por defecto:

| Parámetro | Valor |
| :--- | :--- |
| **Base de Datos** | `edudam_db` (o el nombre que uses) |
| **Usuario** | `root` |
| **Contraseña** | *(vacío)* o `1234` (según configuración local) |
| **Puerto DB** | `3306` |

> **Nota:** Se incluye el archivo `script.sql` en la carpeta `/backend` (o `/database`) para generar las tablas y datos de prueba necesarios.

---

## c. Instrucciones de Ejecución

Sigue estos pasos para levantar el entorno de desarrollo en local.

### 1. Configuración del Backend (API)

El servidor debe estar ejecutándose para que la App cargue datos.

```bash
cd backend
npm install
# Asegúrate de importar el script.sql en tu gestor de base de datos antes de iniciar
node index.js