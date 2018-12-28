# Prueba de ingreso Infotrack S.A.
#### Desarrollado por Juan Pablo López Cifuentes

Prueba de ingreso para aspirar al puesto de Desarrollador Junior en Infotrack S.A.

La aplicación consiste en un CRUD con las entidades Alumno, Materia y Notas.

## Frontend

El frontend de la aplicación fue realizado en React.
El componente principal es App.js, y en la carpeta Components se encuentran los siguientes componentes:

* Grades.js  
* StudentReport.js  
* StudentsForm.js  
* StudentsTable.js  
* Subjects.js  
* SubjectsForm.js  
* SubjectsTable.js  

## Backend

El backend consiste en una Web Api en ASP.NET, que utiliza la versión 4.7.2 de .NET Framework. Para crear la base de datos se utiliza el enfoque Code First de Entity Framework 6.

## Arquitectura en capas

Se implementó una arquitectura de tres capas:

* Capa de presentación:  

Frontend

* Capa de negocio:  

Backend: Se encuentra en la carpeta BusinessLayer y se compone de los controladores que contienen la lógica de la API, establecen la comunicación entre la capa de presentación y la capa de acceso de datos.

* Capa de acceso de datos:

Backend: Contiene todos los modelos utilizados por EntityFramework para generar la base de datos, los Data Transfer Objects, y los Business Objects que contienen la lógica que permite la comunicación con la base de datos.

## Patrón DTO

Se implementó el patrón Data Transfer Object (DTO) de dos formas:

* StudentDTO: Para transferir solo los atributos necesarios de una entidad desde la capa de acceso de datos hasta la capa de presentación, reduciendo el tamaño de la carga enviada en la respuesta.

* GradeDTO: Para transferir atributos de varias entidades en un solo objeto desde la capa de acceso de datos hasta la capa de presentación. De esta manera se envían solo los atributos necesarios en un solo paquete, reduciendo el número de peticiones al servidor web.
