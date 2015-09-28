Artículo original: http://www.rubenbp.com/blog/scaffolding-de-forma-sencilla-usando-gulp

# Scaffolding de forma sencilla usando Gulp

Cuando construyes software, a veces ocurre que ciertas partes del mismo las generamos siguiendo una estructura común. Un buen ejemplo de ello podría ser una directiva de AngularJS, donde generalmente tendremos un controlador, una plantilla, la propia directiva, y en ocasiones un módulo y unas reglas de enrutado.

Generar esta estructura de forma automática te ayudará a evitar errores humanos y sobre todo a ganar tiempo a lo largo del desarrollo.

En el proyecto en el que estoy trabajando actualmente hemos automatizado la generación de código de una nueva directiva de AngularJS mediante Gulp y a continuación te enseñaré cómo lo hemos hecho.

<!--more-->

Las librerías que necesitamos para lograr esto son:
* `gulp`: Usado para programar tareas automatizadas, en nuestro caso la generación de código.
* `gulp-templates`: Tarea para gulp que nos permitirá fácilmente procesas las plantillas. Esta librería usa el motor de plantillas de [lodash](https://lodash.com/docs#template).
* `gulp-rename`: Tarea para gulp que nos ayudará a darle el nombre final a nuestros ficheros de plantilla procesados previamente por `gulp-templates`.
* `yargs`: Librería de NodeJS que facilita la obtención de parámetros de la línea de comandos.

## Plantillas para generar código

Para empezar, tenemos una carpeta llamada `templates` donde a su vez tenemos carpetas con cada tipo de scaffolding que tenemos preparado.

Para el ejemplo del scaffolding de una nueva vista, tenemos la siguiente estructura de ficheros.

```
|- templates
   |- view                    << Carpeta con ficheros de la vista parcial
      |- view.scss            << Estilos propios de la vista
      |- view.controller.js   << Controlador de la vista
      |- view.directive.js    << Definición de la directiva
      |- view.html            << Plantilla de la vista
      |- view.module.js       << Registro de la vista
      |- view.routes.js       << Reglas de enrutado de la vista
```

Una vez ejecutado el scaffold sustituiremos la parte del nombre `view` por el nombre final de la vista.

Cada fichero tiene una estructura común, por ejemplo el fichero del controlador tiene la siguiente estructura:

```javascript
import BaseController from 'BaseController';

class <%= upCaseName %>Controller extends BaseController {
  constructor() {
  }
}

export default <%= upCaseName %>Controller;
```

Para las partes dinámicas del código, se usa la sintaxis `<%=  %>` que nos facilita el motor de plantillas incluído en [lodash](https://lodash.com/docs#template) y nos permite, en este ejemplo, darle un nombre dinámico a nuestro controlador.

## Tarea Gulp para lanzar la tarea

Una vez tenemos nuestras plantillas, nos toca construir la tarea gulp para que nos genere el código.

```javascript
var gulp = require('gulp')
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    argv = require('yargs').argv,
    path = require('path');

gulp.task('view', function(){
    var capitalize = function(val){
      return val.charAt(0).toUpperCase() + val.slice(1);
    };

    var name = argv.name;
    var parentPath = argv.parent || '';
    var destinationPath = path.join('app/views', parentPath, name);

    return gulp
      .src('templates/view/**/*')
      .pipe(template({
        name: name,
        upCaseName: capitalize(name)
      }))
      .pipe(rename(function(path){
        path.basename = path.basename.replace('view', name);
      }))
      .pipe(gulp.dest(destinationPath));
  }
);
```

Antes de lanzar la tarea, obtenemos desde los argumentos del comando el nombre de la vista (`argv.name`) y opcionalmente el nombre de la carpeta padre donde ubicar la vista (`argv.parent`)

Paso a paso la tare gulp hace:
1. Carga las plantillas con `gulp.src`
2. Mediante `gulp-template` procesa cada plantilla facilitándo en un objeto la información dinámica que necesitarán. En nuestro caso el nombre de la vista en minúsculas y capitalizada.
3. Renombramos las plantillas para darles un nombre final mediante `gulp-rename`. Por ejemplo, si hemos decidido crear una vista llamada `cuentas`, la plantilla original `view.controller.js` se llamará `cuentas.controller.js`.
4. Guardamos el resultado en la carpeta destino.

## Lanzando el comando Gulp

La sintaxis de esta tarea gulp es la siguiente:
```bash
$ gulp template --name cuentas --parent posicionTotal
```

Siguiente el código de este ejemplo nos generaría una nueva vista en la carpeta:

```
client/app/views/posicionTotal/cuentas
```

Con los ficheros:

```
cuentas.scss
cuentas.controller.js
cuentas.directive.js
cuentas.html
cuentas.module.js
cuentas.routes.js
```

De esta manera, construimos rápidamente la estructura básica de las nuevas vistas de la aplicación.
