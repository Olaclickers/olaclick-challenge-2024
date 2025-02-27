# Olaclick Challenge :rocket:

Te presento el reto para formar parte de [OlaClick](https://olaclick.com), la plataforma que digitaliza y optimiza negocios con tecnología innovadora. 

Puedes tomar el camino de Backend, Frontend o FullStack, nos ayudará a conocer mejor tus preferencias.

Para participar, solo necesitas crear un Fork del repositorio y enviar un Pull Request (PR) con tu solución.

# Problema

El administrador de restaurante tiene una lista de órdenes que cada cierto tiempo cambian de estado. 

Por ahora tenemos solo 3 estados de la orden:
- iniciado
- enviado
- entregado 

Si el estado de la orden es entregado la orden sale de la lista. 
Si selecciona un registro de la lista se muestra la pàgina de la orden (/:ordenId)

# Estructura de la lista:
| Id | Detalle | Cliente | Total ($) | Estado |
| -- | ------- | ------- | --------- | ------ |
| 1 | Pollo a al brasa | Juan Perez | 120.00 | iniciado |
| 2 | Ensalada cesar + coca cola | José José | 140.00 | enviado|
| … | … | … | … | … |
| 10 | Lomo saltado + Chicha morada | Andrés | 90.00 | enviado |



# Estructura de la orden 

Id de Orden: 2  
Cliente: José José  
Detalle de orden:  
| Item | Descripción | Cantidad | Costo unitario $ | Costo total $ |
| ---- | ----------- | -------- | ---------------- | ------------- |
| A    | Ensalada cesar | 1 |  100.00 | 100.0 |
| B    | Coca cola | 1 |  40.00 | 40.0 |

Total: $ 140.00  


# Tecnología:
Considera estas tecnologías para tu postulación de Frontend/Backend/Fullstack:
- Backend (puedes escojer las siguientes tecnologías):
  + PHP: Puedes usar Laravel y un ORM.
  + Typescript: NestJS y Sequelize
- Frontend: Typescript, Vue3, Vue router, Vuetify 
- Docker.


Puede utilizar cualquier método para almacenar datos de las órdenes (Json, BD, CSV, etc), pero debe tener en cuenta que podemos tener que lidiar con situaciones de gran volumen en las que tengamos una gran cantidad de escrituras y lecturas de los mismos datos al mismo tiempo. ¿Cómo abordaría este requisito?


# Envíanos tu reto:
Al finalizar tu reto, luego de bifurcar el repositorio, deberás abrir un pull request a nuestro repositorio. No existen limitaciones para la implementación, puedes seguir el paradigma de programación, modularización y estilo que consideres más adecuado.
