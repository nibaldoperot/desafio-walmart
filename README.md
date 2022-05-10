# desafio-walmart

## Dependencias para levantar el proyecto
1. Docker
2. Node v14+
3. Mongo v3.6.8
4. Jmeter v5.4.3 (sólo para pruebas de performance)
5. Extensión bzm - Concurrency Thread Group para Jmeter (sólo para pruebas de performance)

## Levantando el proyecto

### Iniciar servicio de docker
sudo service docker start

### Levantar proyecto ( mongo y api)
```bash
make project-up
```

## Postman

El proyecto cuenta con un postman para poder ejecutar la operación de búsqueda, este
se encuentra en ./test/postman/walmart.postman_collection.json

También se entregan variables de ambiente (localhost) para cambio de host en postman, este
se encuentra en ./test/postman/localhost.postman_environment.json

## Pruebas unitarias
```bash
npm run test
```

## Verificación de errores en código
```bash
npm run lint
```

# Pruebas de Performance

El proyecto cuenta con pruebas de performance para poder estresar la operación, 
estas se encuentran en ./test/performance/buscar-productos.jmx, para poder ejecutar
correctamente las pruebas de performance se debe seleccionar el archivo de origen
apuntando a ./test/performance/data.csv. También se pueden ingresar las querys que 
se deseen modificando dicho archivo.


## Otros
### Para iniciar únicamente la api
```bash
make npm-start
```

