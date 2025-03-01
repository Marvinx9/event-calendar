import { useSetRecoilState } from "recoil";
import { listaDeEventosState } from "../atom";
import { IEvento } from "../../interfaces/IEvento";
import { createEventoAsync } from "../seletores";

const useAdicionarEvento = () => {
  const setListDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
  return async (evento: Omit<IEvento, "id">) => {
    const hoje = new Date();

    if (evento.inicio < hoje) {
      throw new Error(
        "Eventos não podem ser cadastrados com data menor do que a atual."
      );
    }

    const id = await createEventoAsync(evento);

    if (id) {
      return setListDeEventos((listaAntiga) => [
        ...listaAntiga,
        { ...evento, id },
      ]);
    }
  };
};

export default useAdicionarEvento;
