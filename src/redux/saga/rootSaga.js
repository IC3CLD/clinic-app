import { all } from "redux-saga/effects";
import CreateAppointmentsSagaWatcher from "./createAppointmentSaga";
import DoctorsAppointmentsSagaWatcher from "./doctorAppointmentsSaga";
import loginSagaWatcher from "./loginSaga";
import PatientsAppointmentsSagaWatcher from "./patientAppointmentsSaga";
import UserSagaWatcher from "./userSaga";

export function* rootSaga() {
  yield all([
    loginSagaWatcher(),
    UserSagaWatcher(),
    PatientsAppointmentsSagaWatcher(),
    DoctorsAppointmentsSagaWatcher(),
    CreateAppointmentsSagaWatcher(),
  ]);
}
