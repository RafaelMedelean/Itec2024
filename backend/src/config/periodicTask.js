import axios from 'axios';
import Aplication from '../models/aplication.js';

const statusToValue = (status) => {
  switch (status) {
    case 'Stable':
      return 2;
    case 'Unstable':
      return 1;
    case 'Down':
      return 0;
    default:
      return -1;  // În cazul în care se întâlnește un status necunoscut
  }
};

const checkApplications = async () => {
  console.log("Verificarea aplicațiilor...");

  try {
    const applications = await Aplication.find();

    for (const app of applications) {
      let stableEndpoints = 0;
      let downEndpoints = 0;

      for (const endpoint of app.endpoints) {
       // console.log("Verificare endpoint:", endpoint.endpoint);
       // console.log("aplicatie="+app.link);
        try {
          const response = await axios.get(app.link+endpoint.endpoint);
          endpoint.history.push({
            time: new Date().toLocaleTimeString(),
            code: response.status,
          });
         // console.log("coderesponsestart"+response.status);
        } catch (error) {
          endpoint.history.push({
            time: new Date().toLocaleTimeString(),
            code: error.response ? error.response.status : 500,
          });
        }
        // console.log("codeerror="+entry.code);

        // Limităm istoricul la ultimele 20 de înregistrări
        if (endpoint.history.length > 20) {
          endpoint.history = endpoint.history.slice(-20);
        }

        endpoint.stat = evaluateEndpointStatus(endpoint.history);
  // Evaluarea statusului endpoint-ului și actualizarea array-ului states
  const currentState = evaluateEndpointStatus(endpoint.history);
  endpoint.stat = currentState;
  endpoint.states.push(statusToValue(currentState)); // Adăugarea statusului curent la states

  // Limităm array-ul states la ultimele 20 de înregistrări
  if (endpoint.states.length > 20) {
    endpoint.states = endpoint.states.slice(-20);
  }

        // Contorizăm statusul endpoint-urilor pentru a determina statusul aplicației
        if (endpoint.stat === 'Stable') {
          stableEndpoints++;
        } else {
          downEndpoints++;
        }
      }

      // Setăm statusul aplicației în funcție de majoritatea statusurilor endpoint-urilor
      app.status = stableEndpoints > downEndpoints ? 'Stable' : 'Down';

      await app.save();  // Salvăm aplicația cu modificările făcute
    }
  } catch (error) {
    console.error("Eroare la verificarea aplicațiilor:", error);
  }
};

const evaluateEndpointStatus = (history) => {
    // console.log("codistoric="+entry.code);
  const isDown = history.every(entry => entry.code !== 200 && entry.code !== 302);
  const isStable = history.every(entry => entry.code === 200 || entry.code === 302);

  return isDown ? 'Down' : isStable ? 'Stable' : 'Unstable';
};

export const startPeriodicChecks = () => {
  const interval = 20000;  // Intervalul de timp în secunde
  setInterval(checkApplications, interval * 1000);
};
