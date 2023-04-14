# tests-world-office

Para ejecutar los proyectos es necesario realizar los siguientes pasos:

* Verificar que tenga docker instalado o una version de postgres para el backend
* Verificar que tenga nestjs instalado (el backend usa este framework)
* Verificar que tenga Angular cli instalado

Para el proyecto del frontend basta con correr el compando

`
    npm i  
`

Y posteriormente el comando

`
    ng s -o
`

Para el proyecto del backend es similar


### Si usa docker

Debe situarse en la carpeta backend y ejectuar 

`
    docker compose up -d
`

Cuando acabe de inicializar la base de datos en la consola podra ver un mensaje 
indicando que ha acabado

## Instalacion de paquetes

Ejecute en la consola el siguiente comando 

`
    npm i  
`

Y posteriormente **asegurese de tener postgres funcionando antes de ejecutar el siguiente comando**

`
 npm run start:dev    
`
