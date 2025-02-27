import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";

const useExcluirEvento = () => {
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

  return (evento: IEvento) => {
    setListaDeEventos((listaAntiga) => [
      ...listaAntiga.filter((event) => event.id !== evento.id),
    ]);
  };
};

export default useExcluirEvento;
