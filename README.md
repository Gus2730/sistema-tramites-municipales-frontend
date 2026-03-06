# Sistema de Trámites Municipales - Frontend

## Descripción

Este proyecto es el frontend de un sistema de trámites municipales desarrollado con Angular. Proporciona una interfaz de usuario para gestionar trámites, autenticar usuarios, visualizar dashboards y generar reportes relacionados con procedimientos municipales.

## Características

- **Autenticación de Usuarios**: Sistema de login seguro con guards de autenticación.
- **Dashboard Principal**: Vista general del sistema con información relevante.
- **Gestión de Trámites**: Lista y manejo de trámites municipales.
- **Permisos y Departamentos**: Servicios para gestionar permisos y departamentos.
- **Reportes**: Generación y visualización de reportes.
- **Interfaz Responsiva**: Diseñada con Tailwind CSS para una experiencia óptima en dispositivos móviles y de escritorio.
- **Interceptores HTTP**: Manejo centralizado de autenticación en peticiones HTTP.

## Tecnologías Utilizadas

- **Angular**: Framework principal (versión 14.3.0)
- **TypeScript**: Lenguaje de programación
- **Tailwind CSS**: Framework de estilos para diseño responsivo
- **RxJS**: Programación reactiva para manejo de datos asíncronos
- **Angular CLI**: Herramientas de desarrollo
- **Jasmine/Karma**: Framework de pruebas

## Instalación

### Prerrequisitos

- Node.js (versión recomendada: 16.x o superior)
- npm o yarn

### Pasos de Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   cd sistema-tramites-municipales-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Edita `src/environments/environment.ts` para desarrollo
   - Edita `src/environments/environment.prod.ts` para producción
   - Asegúrate de configurar la URL del backend API

## Uso

### Desarrollo

Para ejecutar la aplicación en modo desarrollo:
```bash
npm start
```
La aplicación estará disponible en `http://localhost:4200`.

### Construcción para Producción

Para construir la aplicación optimizada para producción:
```bash
npm run build
```
Los archivos construidos se generarán en la carpeta `dist/`.

### Pruebas

Para ejecutar las pruebas unitarias:
```bash
npm test
```

### Vigilancia de Cambios

Para construir automáticamente al detectar cambios:
```bash
npm run watch
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Componente del dashboard principal
│   │   ├── login/              # Componente de inicio de sesión
│   │   └── tramites/           # Componente de lista de trámites
│   ├── guards/
│   │   └── auth.guard.ts       # Guard de autenticación
│   ├── interceptors/
│   │   └── auth.interceptor.ts # Interceptor para autenticación HTTP
│   ├── models/
│   │   ├── tramite.model.ts    # Modelo de datos para trámites
│   │   └── user.model.ts       # Modelo de datos para usuarios
│   ├── services/
│   │   ├── auth.service.ts     # Servicio de autenticación
│   │   ├── department.service.ts # Servicio de departamentos
│   │   ├── permission.service.ts # Servicio de permisos
│   │   ├── reporte.service.ts  # Servicio de reportes
│   │   ├── tramite.service.ts  # Servicio de trámites
│   │   └── user.service.ts     # Servicio de usuarios
│   ├── app-routing.module.ts   # Configuración de rutas
│   ├── app.component.*         # Componente raíz
│   └── app.module.ts           # Módulo principal
├── environments/
│   ├── environment.prod.ts     # Configuración de producción
│   └── environment.ts          # Configuración de desarrollo
├── index.html                  # Archivo HTML principal
├── main.ts                     # Punto de entrada de la aplicación
├── polyfills.ts                # Polyfills para compatibilidad
└── styles.css                  # Estilos globales
```

## Configuración de Entorno

Las configuraciones específicas del entorno se definen en los archivos dentro de `src/environments/`. Asegúrate de configurar:

- URL del backend API
- Claves de API si es necesario
- Configuraciones de autenticación

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y commit (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Guías de Desarrollo

- Sigue las convenciones de Angular
- Escribe pruebas para nuevas funcionalidades
- Mantén la consistencia en el estilo de código
- Actualiza la documentación cuando sea necesario

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Soporte

Para soporte o preguntas, por favor abre un issue en el repositorio o contacta al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Última actualización**: Marzo 2026