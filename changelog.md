## Historial de versiones

### 1.5.0
* Cambio en las consultas directas a serviso WSDL

### 1.4.0
* Administración de cuentas de terceros asociadas
* Transferencia entre socios
* Limitación de solicitudes según horario
* Solicitud de talonarios
* Consulta de solicitudes realizadas
* Reportería fase 2

### 1.3.0
* Cambio de contraseña por expiración
* Reinicio de clave de transferencia sin solicitar clave actual
* Reinicio de preguntas secretas
* Reportería fase 1

### 1.2.3
* Cambio en la estructura de los querys que realizan "inserts" directamente en la BD

### 1.2.2
* Separación de permisos para los roles de "Admin" y "Socios"
* Verificación de permiso para acceder a una URL

### 1.2.1
* Corrección en la encriptación cuando el token es actualizado

### 1.2.0
* Solicitud de cheque en quetzales
* Solicitud de cheque en dólares
* Transferencia hacia otros bancos en quetzales
* Transferencia hacia otros bancos en dólares
* Pago de tarjeta de crédito en quetzales
* Pago de tarjeta de crédito en dólares

### 1.0.3
* Url's accesibles según permisos de usuario
* Mensaje indicando el medio de envio de contraseña provisional
* Los mensajes enviados para los tokens ahora son más específicos
* Asignación de permisos delimitados para administradores y socios

### 1.0.2
* Limitación para utilizar un token de solicitud una sola vez
* Corregido el error que no permitía configurar los tiempo de validez de los token
* Cambio de pregunta secreta al momento ingresar su respuesta incorrecta en los formularios donde se solicita
* Verificación de últimos 5 passwords al cambiar contraseña de ingreso y clave de transferencia

### 1.0.1
* Agregada verificación de existencia de preguntas secretas al momento de solicitar el reinicio de una contraseña
* Asociación de un rol al momento de enviar la lista de acciones de usuarios para la asignación de permisos

### 1.0.0
* Autenticación de usuario
* Reinicio de contraseña
* Administración de perfil de usuario
  * Cambio de contraseña de ingreso
  * Cambio de clave de transferencia
  * Gestión de preguntas secretas
* Listado de cuentas activas del usuario
* Visualización del estado de una cuenta
* Asignación de permisos a usuarios
* Administración de tiempos de validez para tokens
* Visualización de historial de acciones de usuarios (Auditoría)
