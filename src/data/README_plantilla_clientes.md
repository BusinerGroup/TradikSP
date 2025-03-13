# Plantilla para Registro de Clientes

Este directorio contiene la plantilla para registrar los clientes existentes que serán importados a la base de datos de TradikSP.

## Archivo: `plantilla_clientes.csv`

### Estructura de Campos

| Campo | Descripción | Tipo | Obligatorio | Valores Permitidos |
|-------|-------------|------|-------------|-------------------|
| id | Identificador único del cliente | Número | Sí | Número entero positivo |
| nombre | Nombre completo del cliente o empresa | Texto | Sí | - |
| tipoDocumento | Tipo de documento de identidad | Texto | Sí | Cédula de Ciudadanía, NIT, Pasaporte |
| numeroDocumento | Número del documento de identidad | Número | Sí | Solo dígitos numéricos |
| direccion | Dirección completa | Texto | Sí | - |
| ciudad | Ciudad | Texto | Sí | Ciudades de Colombia (preferiblemente capitales) |
| contacto | Nombre de la persona de contacto | Texto | Sí | - |
| telefono | Teléfono de contacto | Número | Sí | Solo dígitos numéricos |
| email | Correo electrónico | Texto | No | Formato válido de email |
| tipoCliente | Categoría del cliente | Texto | Sí | Venue, OPC, Productor, Centro de Convenciones, Hotel, Restaurante, Wedding & Event Planner, Colega, Agencia de Publicidad, Institucional |

### Instrucciones de Uso

1. Abra el archivo `plantilla_clientes.csv` con Excel, Google Sheets, Numbers o cualquier programa de hojas de cálculo.
2. Complete los datos de cada cliente en una fila separada.
3. Respete los valores permitidos para los campos que tienen opciones predefinidas.
4. Asegúrese de que el campo `id` sea único para cada cliente.
5. Para los campos numéricos (numeroDocumento, telefono), ingrese solo dígitos sin espacios, guiones u otros caracteres.
6. Guarde el archivo manteniendo el formato CSV.
7. Para las direcciones o textos que contengan comas, enciérrelos entre comillas dobles.

### Ejemplo de Datos

El archivo incluye ejemplos de diferentes tipos de clientes que pueden usarse como referencia, con datos adaptados al contexto colombiano.

### Notas Importantes

- No modifique la primera fila (encabezados).
- Mantenga el formato CSV al guardar.
- Si utiliza Excel, al guardar seleccione "CSV (delimitado por comas)".
- Verifique que los caracteres especiales (tildes, ñ, etc.) se muestren correctamente.
- Los números de teléfono deben ingresarse sin espacios, guiones o paréntesis.
- Los números de documento deben contener solo dígitos.

## Versión Mejorada en Excel

Para una experiencia mejorada con validaciones y listas desplegables, se recomienda:

1. Abrir el archivo CSV en Excel
2. Configurar validaciones de datos:
   - Para `tipoDocumento`: Lista desplegable con valores permitidos
   - Para `tipoCliente`: Lista desplegable con valores permitidos
   - Para `ciudad`: Lista desplegable con ciudades colombianas
   - Para `numeroDocumento` y `telefono`: Validación numérica
   - Para `email`: Validación de formato de correo electrónico
3. Guardar como archivo Excel (.xlsx) para trabajo interno
4. Exportar como CSV cuando esté listo para la importación

## Proceso de Importación

Una vez completada la plantilla, el archivo CSV será procesado por el sistema para poblar la base de datos de TradikSP. 