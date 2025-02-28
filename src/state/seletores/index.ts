import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";

export const eventosFiltradosState = selector({
  key: "eventosFiltradosState",
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const todosOsEventos = get(listaDeEventosState);

    const eventos = todosOsEventos.filter((evento) => {
      return filtro.data && filtro.status
        ? filtro.data.toISOString().slice(0, 10) ===
            evento.inicio.toISOString().slice(0, 10) &&
            filtro.status === evento.completo
        : filtro.data
        ? filtro.data.toISOString().slice(0, 10) ===
          evento.inicio.toISOString().slice(0, 10)
        : filtro.status
        ? filtro.status === evento.completo
        : true;
    });
    return eventos;
  },
});
