import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";
import { updateEventoAsync } from "../seletores";

const useAtualizarEvento = () => {
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
  return async (evento: IEvento) => {
    const sucesso = await updateEventoAsync(evento);

    if (sucesso) {
      return setListaDeEventos((listaAntiga) => {
        const indice = listaAntiga.findIndex((event) => event.id === evento.id);
        return [
          ...listaAntiga.slice(0, indice),
          evento,
          ...listaAntiga.slice(indice + 1),
        ];
      });
    }
  };
};

export default useAtualizarEvento;
