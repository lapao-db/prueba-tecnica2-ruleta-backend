# API Ruleta de Apuestas

Sistema de ruleta online con Node.js, Express y MongoDB.

Establece colores: numeros pares: rojo y numeros impares: negro

## Instalación
```bash
npm install
```

## Configuración

Modificar nombre y editar archivo .env.example por `.env`:
```
PORT=3000
```

## Ejecutar
```bash
# Desarrollo
npm run dev

# Producción
npm start

```

## Endpoints

- `POST /ruleta/` - Crear ruleta
- `PUT /ruleta/:idRuleta/abrir` - Abrir ruleta
- `PUT /ruleta/:idRuleta/cerrar` - Cerrar ruleta
- `GET /ruleta` - Listar ruletas
- `POST /apuesta/:idRuleta/apuestas` - Crear apuesta

## Arquitectura
```
src/
├── models/         # Esquemas de MongoDB
├── controllers/    # Lógica de negocio
├── routes/         # Definición de endpoints
└── config/         # Configuración base de datos 
```

## Decisiones Técnicas

- **Modelos simples**: Lógica en controladores para mayor claridad
- **Estrategia de apuestas**: Se mantienen como histórico al reabrir ruletas
- **Validaciones**: En controladores para control explícito


## Autor
- Laura Daza
