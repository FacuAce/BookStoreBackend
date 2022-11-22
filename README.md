# BookStore Backend
## Introducción

Proyecto de prueba para realizar un Backend completo que permite crear usuarios con distintos roles(administrador, autor, lector) y permisos(leer libros, crear libro, actualizar libro, eliminar libro, etc), y también crear libros los cuales están relacionados con sus autores.

## Objetivo del proyecto

Aprender a utilizar NestJs con la creación de roles y permisos, un módulo Config para acceder a los atributos del .env, configuración del debugger, cruds para cada entidad, módulo de autenticación para login y verificación de permisos, y creación de decoradores para determinar si existen los permisos necesarios para realizar cierta acción, como puede ser crear un libro, eliminarlo etc, junto a las siguientes tecnologías:

- Bcrypt: librería para generar one-way hashes principalmente para el manejo de contraseñas y datos secretos
- Prisma: ORM para la base de datos
- Passport: librería para autenticación

## Como configurar este proyecto en local:

Para que el proyecto funcione debe por supuesto ejecutar el comando  
`npm install` para descargar todas las dependencias, y luego crear el archivo .env basado en el archivo existente env.example.

La base de datos ya existe, con datos cargados previamente y sus credenciales se encuentran en este archivo env.example. Para ver si realmente hay datos en la base de datos utilice el comando `npx prisma studio` que iniciara una herramienta en el navegador para observador en detalla la base de datos. En caso de que este vacia simplemente utilice el comando `npx prisma db seed` para cargar los roles, permisos, y las relaciones que existen de estos por defecto.


