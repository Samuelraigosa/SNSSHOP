# SNShop - Tienda Web (Frontend + Backend)

## 1. Descripción del proyecto

SNShop es una tienda web con frontend en HTML/CSS/JavaScript y backend en Node.js + Express, conectada a MySQL.  
Permite visualizar productos, filtrar por categorías, registrar e iniciar sesión de usuarios, gestionar carrito de compras y simular proceso de pago.

---

## 2. Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (recomendado: 18.x o superior)
- **npm** (incluido con Node.js)
- **MySQL** (8.x recomendado)
- Navegador web moderno (Chrome/Edge/Firefox)
- (Opcional) **VSCode** + extensión **Live Server**

---

## 3. Tecnologías y versiones utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend
- Node.js
- Express `^4.18.2`
- body-parser `^1.20.2`
- cors `^2.8.5`
- mysql2 `^3.22.3`

### Gestión de dependencias
- npm
- `package-lock.json` (raíz y backend) para mantener instalaciones reproducibles

---

## 4. Estructura del proyecto

```text
mi-tienda-web/
│
├── index.html
├── productos.html
├── carrito.html
├── pago.html
├── login.html
├── registro.html
├── nosotros.html
├── contacto.html
├── package-lock.json
├── README.md
│
├── img/
│   └── (imágenes usadas por la interfaz)
│
└── backend/
    ├── server.js
    ├── db.js
    ├── productosRoute.js
    ├── usuariosRoute.js
    ├── checkUsuarios.js
    ├── testdb.js
    ├── testRegistroUsuario.js
    ├── package.json
    └── package-lock.json
```

### Descripción rápida de archivos clave

- `index.html`: página principal de entrada.
- `productos.html`: catálogo, filtros y búsqueda de productos.
- `carrito.html`: gestión de productos en carrito (cantidad/eliminar).
- `pago.html`: formulario de checkout y resumen de compra.
- `login.html`: inicio de sesión.
- `registro.html`: creación de cuenta.
- `nosotros.html`: información institucional.
- `contacto.html`: formulario y canales de contacto.
- `backend/server.js`: inicializa API y monta rutas.
- `backend/db.js`: conexión a base de datos MySQL.
- `backend/productosRoute.js`: endpoints de productos.
- `backend/usuariosRoute.js`: endpoints de registro/login de usuarios.

---

## 5. Instalación y ejecución

## 5.1 Clonar o descargar el proyecto

Si usas Git:
```bash
git clone <url-del-repositorio>
cd mi-tienda-web
```

Si te lo pasan por ZIP:
1. Descomprime la carpeta.
2. Ábrela en VSCode.

## 5.2 Configurar base de datos

1. Crea la base de datos en MySQL (si aún no existe).
2. Verifica credenciales y configuración en:
   - `backend/db.js`
3. Asegúrate de tener las tablas necesarias para productos y usuarios.

## 5.3 Instalar dependencias del backend

```bash
cd backend
npm install
```

## 5.4 Ejecutar backend

```bash
npm start
```

Backend esperado en:
- `http://localhost:3000`

## 5.5 Abrir frontend

Desde la raíz del proyecto:
- Abrir `index.html` con Live Server (recomendado), o
- Abrir el archivo directamente en navegador.

Si usas Live Server normalmente verás:
- `http://127.0.0.1:5500/index.html` (puede variar el puerto)

---

## 6. Endpoints principales del backend

- `GET /api/productos`
  - Devuelve listado de productos.
- `POST /api/usuarios/registro`
  - Registra nuevo usuario.
- `POST /api/usuarios/login`
  - Autentica usuario existente.

Ejemplo rápido con curl:

```bash
curl http://localhost:3000/api/productos
```

```bash
curl -X POST http://localhost:3000/api/usuarios/registro \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"Usuario Demo\",\"email\":\"demo@correo.com\",\"password\":\"123456\",\"confirmar\":\"123456\"}"
```

```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"demo@correo.com\",\"password\":\"123456\"}"
```

---

## 7. Características implementadas

- Página principal con navegación por secciones.
- Catálogo de productos conectado al backend.
- Filtros por categoría y búsqueda por texto.
- Carrito persistente con `localStorage`.
- Modificación de cantidades y eliminación de productos.
- Flujo de pago con resumen de pedido y confirmación simulada.
- Registro de usuario vía API.
- Inicio de sesión vía API.
- Secciones institucionales y de contacto.

---

## 8. Comentarios en el código (lógica compleja)

Se añadieron comentarios explicativos por bloques en los archivos principales para facilitar mantenimiento y lectura:

- Frontend:
  - `index.html`
  - `productos.html`
  - `carrito.html`
  - `pago.html`
  - `login.html`
  - `registro.html`
  - `nosotros.html`
  - `contacto.html`
- Configuración:
  - `backend/package.json`
  - `package-lock.json`
  - `backend/package-lock.json`

Los comentarios explican:
- Secciones principales de cada vista.
- Flujo de funciones en JavaScript (render, eventos, persistencia).
- Objetivo de archivos de configuración y lockfiles.

---

## 9. Notas para trabajo en equipo

Para compartir con compañeros, se recomienda GitHub:

```bash
git init
git add .
git commit -m "Documentación y comentarios del proyecto SNShop"
git branch -M main
git remote add origin <url-del-repo>
git push -u origin main
```

Si no usan Git, alternativa rápida:
- Comprimir la carpeta del proyecto en `.zip`
- Compartir por Drive/OneDrive.

---

## 10. Estado actual

Proyecto funcional con frontend y backend separados, documentación base completa y comentarios de apoyo en bloques clave para facilitar comprensión y mantenimiento.
