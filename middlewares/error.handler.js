
import { ValidationError } from "sequelize";

function logErr (err, req, res, next) {
  console.log(err);
  next(err);
};

function errorHandler (err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

// Agregamos una función para el boom:
function boomErrorHandler (err, req, res, next) {
	// Debemos verificar si el error es de tipo boom:
	if (err.isBoom) {
		const { output } = err;
		// Si es de tipo boom debemos finalizarlo con una respuesta para
		// que no envíe el error al siguiente middleware:
		res.status(output.statusCode).json(output.payload);
	};
	// Y si no es de tipo boom le damos next():
	next(err);
};

// Creamos una función para los errores con orm:
function ormErrorHandler (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  };
  next(err);
};

// Exportamos las funciones del boom y orm
export { logErr, errorHandler, boomErrorHandler, ormErrorHandler };
