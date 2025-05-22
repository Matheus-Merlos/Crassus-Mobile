import * as types from "./actionTypes";
import * as actions from "./actions";
import { takeLatest, all, call, put } from "redux-saga/effects";
import axios from "../utils/axios";

function* loginRequest({ payload }) {
  try {
    //Faz uma requisição POST no endpoint /user/login
    const response = yield call(axios.post, "/user/login", payload);
    //Se o status for diferente de 200, lança um erro (para ser pegado no catch de baixo)
    if (response.status !== 200) {
      throw new Error();
    }
    //Caso contrário, lança uma ação de sucesso, e como payload manda a resposta da requisição
    yield put(actions.loginSuccess({ ...response.data }));

    //Coloca o Header "authorization" como padrão no axios para futuras requisições
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
  } catch (error) {
    //Mandamos o erro todo como payload, porque aí o reducer consegue ver o que fazer com o erro
    yield put(actions.loginFailure(error));
  }
}

const sagas = all([takeLatest(types.LOGIN_ACTION, loginRequest)]);

export default function* loginSaga() {
  return yield all([sagas]);
}
