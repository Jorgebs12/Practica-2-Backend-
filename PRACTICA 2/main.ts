//PRACTICA 2

const developerJokes = [ "¿Por qué los desarrolladores odian la naturaleza? Porque tiene demasiados bugs.", "Un SQL entra en un bar, se acerca a dos mesas y pregunta: '¿Puedo unirme?'", "¡He terminado mi código a tiempo! – Nadie, nunca.", "Si no funciona, añade más `console.log()`.", "¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, es un problema de hardware.", "No me asusto fácilmente... excepto cuando veo código sin `;` al final.", "Los desarrolladores no envejecen, solo se depuran.", "El único lugar donde puedes escapar de una excepción es en Java.", "Frontend sin diseño es como un backend sin lógica.", "¿Por qué los programadores prefieren el té? Porque en Java no hay café.", "Hay 10 tipos de personas en el mundo: las que entienden binario y las que no.", "Siempre prueba tu código... excepto cuando funciona.", "Tu código no está roto, solo es 'funcionalidad no documentada'.", "En qué se parecen los programadores y los gatos? En que odian mojarse y no pueden dejar de jugar con cosas que no deberían.", "Mi código funciona... hasta que lo toco de nuevo.", "¿Por qué los desarrolladores odian la luz del sol? Porque depuran en la oscuridad.", "Cuando crees que has eliminado todos los bugs, aparece el 'bug final'.", "Git es como un horóscopo: nunca entiendes los conflictos.", "Un desarrollador sin bugs es como un unicornio, no existe.", "En mi máquina funciona... pero no en producción." ];

const handler = async (req: Request): Promise<Response> => {

  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;

  if (method === "GET") {

    if (path === "/jokes") {

      const index = url.searchParams.get("index");

      if (index) {

        const joke = developerJokes[parseInt(index)];

        if (!joke) return new Response("No existe!", { status: 404 });
        
        return new Response(joke, { status: 200 });
      }

      const randomIndex = Math.floor(Math.random() * developerJokes.length);
      
      return new Response(developerJokes[randomIndex]);

      //Comprobar el chiste
      //http://localhost:3000/jokes?index=2 

    }

    else if (path === "/calcular") {

      const num1 = url.searchParams.get("num1");
      const num2 = url.searchParams.get("num2");
      const operacion = url.searchParams.get("operacion");

      if (!num1 || !num2 || !operacion) return new Response("Faltan parametros", { status: 400 });

      const miNum1 = parseInt(num1);
      const miNum2 = parseInt(num2);

      let result: number = 0;

      switch (operacion) {
        case "suma":
          result = miNum1 + miNum2;
          break;

        case "resta":
          result = miNum1 - miNum2;
          break;

        case "multiplicacion":
          result = miNum1 * miNum2;
          break;

        case "division":
            if (miNum2 === 0) {
              return new Response("No se puede dividir por 0", { status: 400 });
            } 
            else {
              result = miNum1 / miNum2;
            }
          break;

        default:
          return new Response("Operacion no valida", { status: 400 });
      }

      return new Response(`El resultado de la operacion es: ${result}`);

      //Para comprobar la operacion
      //calcular?num1=10&num2=5&operacion=suma
      //calcular?num1=3&num2=7&operacion=multiplicacion
    
    } else if (path.startsWith("/reverso")) {

      let frase = path.split("/").pop();
      const detalles = url.searchParams.get("detalles");

      if (!frase) return new Response("Falta la frase", { status: 400 });

      //Para reemplazar los por espacios de la frase que le pasemos
      frase = frase.replaceAll("%20"," ");

      const delReves = frase.split("").reverse().join("");

      //Para imprimir la longitud de la frase y la frase al reves en formato JSON
      if (detalles === "true") {
        return new Response(JSON.stringify({ delReves, longitud: frase.length }));
      }

      return new Response(`La frase del reves es: ${delReves}`);

      //Para comprobar la frase
      //http://localhost:3000/reverso/hola?detalles=true
    
    }
  }

  return new Response("endpoint not found", { status: 404 });
};

Deno.serve({ port: 3000 }, handler);
