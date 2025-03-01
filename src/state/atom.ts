import { atom } from "recoil";
import { IEvento } from "../interfaces/IEvento";
import { IFiltroDeEventos } from "../interfaces/IFiltroDeEventos";
import { listEventosAsync } from "./seletores";

export const listaDeEventosState = atom<IEvento[]>({
  key: "listaDeEventosState",
  default: listEventosAsync,
});

export const filtroDeEventos = atom<IFiltroDeEventos>({
  key: "filtroDeEventos",
  default: {},
});
