# Autor: Daniel Felipe Alfonso Bueno
# Profesor: Luis Daniel Benavides
# ARSW - Arquitectura de Software 2020-I 

## Descripci�n
En este proyecto, se implementar� el juego cl�sico Tic Tac Toe (Triki), donde se podr� elegir una sala de juego, si no existe crearla e ingresar a los jugadores. Permite volver a un estado anterior del juego adem�s de poder jugar con normalidad al juego. 

[�Link de la aplicaci�n desplegada en Heroku!](https://radiant-savannah-21856.herokuapp.com/index1.html)

## Prerrequisitos 
Instalaci�n de JAVA 8 y Maven, manejo de Maven como administrador proyectos y librer�as y JAVA OO

## Dise�o 
### Diagrama de Componentes
![DiagramaComponentes](./img/diagramaComponentes.PNG)

### Descripci�n 
En este diagrama podemos observar, como realizan las solicitudes los clientes que en este caso ser�n los navegadores los cuales se implementaron con React JS donde se realizo el juego de Tictac Toe adem�s hacen peticiones a un EndPoint exactamente a una sala o crear una sala en SpringMVC que ser� el encargado de manejar las sesiones de los usuarios, la administraci�n de las salas y configuraci�n de persistencia de historial, para volver a un punto anterior, que se manejara en MongoDB.

## Uso del Proyecto 
Clonamos nuestro proyecto desde GitHub
~~~
git clone https://github.com/DanielAlfonso17/ARSWLAB7.git
~~~
Abrimos con una IDE nuestro proyecto, como primera forma podremos ejecutarlo asi 
![DiagramaComponentes](./img/proyecto1.png)

Tambi�n podemos ejecutarlo desde la l�nea de comandos CMD de la siguiente manera, primero lo compilamos con el comando 
~~~
mvn package
~~~
![compilaci�n](./img/compilacion.PNG)
despu�s ejecutamos con el comando 
~~~
mvn spring-boot:run
~~~
![compilacion](./img/ejecucion1.PNG)
![compilacion](./img/ejecucion2.PNG)
Podemos observar que ya est� corriendo nuestra aplicaci�n por el puerto 8080 procedemos en el navegador a escribir 

~~~
localhost:8080
~~~

Obtendremos como resultado la p�gina de inicio del juego, as� como se muestra. En esta primera pantalla, debemos ingresar la sala que queremos entrar o crear. 


![compilacion](./img/juego1.PNG)


Para el ejemplo, ingresaremos a la misma sala uno en la barra de navegaci�n podemos observar que cambia la ruta por la de la sala 

![compilacion](./img/juego2.PNG)

Realizamos un movimiento en el tablero en cada navegador y se actualizara en el otro 
![compilacion](./img/juego3.PNG)
Ahora como ejemplo creamos la sala dos y tres como vemos en el navegador y no cambia el juego ya que esta en sala diferente


![compilacion](./img/juego4.PNG)

