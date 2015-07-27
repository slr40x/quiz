var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite 
var sequelize = new Sequelize(null, null, null, 
  { dialect:  "sqlite",
    storage:  "quiz.sqlite"}      
);

// Importar definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;  //exportar definición de tabla Quiz


// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla

      Quiz.count().then(function (count){
        if(count === 0) {   // la tabla se inicializa solo si está vacía
            Quiz.bulkCreate( 
              [ {pregunta: 'Capital de Italia V2',   respuesta: 'Roma'}, 
                {pregunta: 'Capital de Portugal', respuesta: 'Lisboa'}
              ]
            ).then(function(){console.log('Base de datos (tabla quiz) inicializada')});
          };
        });
      });

