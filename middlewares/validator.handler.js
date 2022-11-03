// Importamos boom por si existe algún error:
import boom from "@hapi/boom";

// Creamos una función que retorne otra función de tipo middleware:
function validatorHandler (schema, property) {
  // Retornamos una función middleware común es decir con parámetros
	// (req, res, next)
  return (req, res, next) => {
    // Guardamos en una variable los datos (params, query o body)
		// que recibimos de la request:
    const data = req[property];

    // Validamos que los datos recibidos cumplan con los requisitos
		// especificados en el schema:
    const { error } = schema.validate(data, { abortEarly: false });

    // En caso de haber un error en los datos finalizamos el
		// middleware y pasamos el error para activar los middleware
		// de errores:
    if (error) {
      next(boom.badRequest(error));
    };

    // Si no existen errores entonces está todo ok y pasamos al
		// siguiente middleware:
    next();
  };
};

// Exportamos la función:
export default validatorHandler;
