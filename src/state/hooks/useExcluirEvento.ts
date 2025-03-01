import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";
import { deleteEventoAsync } from "../seletores";

const useExcluirEvento = () => {
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

  return async (evento: IEvento) => {
    const sucesso = await deleteEventoAsync(evento.id);

    if (sucesso) {
      setListaDeEventos((listaAntiga) => [
        ...listaAntiga.filter((event) => event.id !== evento.id),
      ]);
    }
  };
};

export default useExcluirEvento;
