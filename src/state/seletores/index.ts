import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";

export const eventosFiltradosState = selector({
  key: "eventosFiltradosState",
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const todosOsEventos = get(listaDeEventosState);

    const eventos = todosOsEventos.filter((evento) => {
      const filtroData = filtro.data
        ? filtro.data.toISOString().slice(0, 10) ===
          evento.inicio.toISOString().slice(0, 10)
        : true;

      const filtroStatus =
        filtro.status === "0"
          ? true
          : filtro.status === "1"
          ? evento.completo === true
          : filtro.status === "2"
          ? evento.completo === false
          : true;

      return filtroData && filtroStatus;
    });
    return eventos;
  },
});
