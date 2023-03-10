import { useContext } from "react";
import Swal from "sweetalert2";

import { CounterContext } from "@/context/counter";

export const Alert = () => {
  const { onFinish, mode } = useContext(CounterContext);

  let alertText =
    mode === "Pomodoro"
      ? "Buen trabajo. Es hora de tomar un breve descanso."
      : mode === "Short Break"
      ? "Buen descanso, ¡volvamos a trabajar!"
      : "Espero que hayas descansado, ¡volvamos a trabajar!";

  let alertTitle =
    mode === "Pomodoro"
      ? "Hora de descansar"
      : mode === "Short Break"
      ? "Hora de trabajar"
      : "Hora de trabajar";

  return Swal.fire(alertTitle, alertText, "info").then(() => {
    onFinish();
  });
};
