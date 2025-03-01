import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";
import { IEvento } from "../../interfaces/IEvento";

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

export const listEventosAsync = selector({
  key: "listEventosAsync",
  get: async () => {
    const respostaHttp = await fetch("http://localhost:8080/agendamentos");
    const eventosJson: IEvento[] = await respostaHttp.json();

    return eventosJson.map((evento) => ({
      ...evento,
      inicio: new Date(evento.inicio),
      fim: new Date(evento.fim),
    }));
  },
});

export const deleteEventoAsync = async (id: number) => {
  try {
    const resposta = await fetch(`http://localhost:8080/agendamentos/${id}`, {
      method: "DELETE",
    });

    if (!resposta.ok) {
      throw new Error("Erro ao deletar o evento");
    }

    return true;
  } catch (error) {
    alert(`Erro ao deletar o evento, ${error}`);
    return false;
  }
};

export const createEventoAsync = async (evento: Omit<IEvento, "id">) => {
  try {
    const resposta = await fetch("http://localhost:8080/agendamentos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evento),
    });

    if (!resposta.ok) {
      const mensagemErro = await resposta.text();
      throw new Error(mensagemErro);
    }
    return await resposta.json();
  } catch (error) {
    alert(error);
  }
};

export const updateEventoAsync = async (evento: IEvento) => {
  try {
    const resposta = await fetch(
      `http://localhost:8080/agendamentos/${evento.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evento),
      }
    );

    if (!resposta.ok) {
      const mensagemErro = await resposta.text();
      throw new Error(mensagemErro);
    }

    return true;
  } catch (error) {
    alert(error);
    return false;
  }
};
