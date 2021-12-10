import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTime } from "redux/createAppointmentSlice";
import {
  availableTimeSelector,
  selectedDateSelector,
  selectedTimeSelector,
} from "redux/selectors";
import { v4 as uuid4 } from "uuid";
import * as Styled from "./RadioBtnsStyles";

const time = [
  "T05:00:00.000Z",
  "T06:00:00.000Z",
  "T07:00:00.000Z",
  "T08:00:00.000Z",
  "T09:00:00.000Z",
  "T10:00:00.000Z",
  "T11:00:00.000Z",
  "T12:00:00.000Z",
  "T13:00:00.000Z",
  "T14:00:00.000Z",
  "T15:00:00.000Z",
  "T16:00:00.000Z",
  "T17:00:00.000Z",
];

const RadioBtns = () => {
  const selectedTime = useSelector(selectedTimeSelector);
  const availableTime = useSelector(availableTimeSelector);
  const pickedDate = useSelector(selectedDateSelector);
  const isSelectedRadio = (value) => selectedTime === value;
  const dispatch = useDispatch();

  const handleRadioClick = (e) => {
    dispatch(setSelectedTime(e.currentTarget.value));
  };

  const timeEditor = (date, modificator) => {
    return date.substr(0, 10) + modificator;
  };

  const getDisabled = (time) => {
    if (pickedDate) {
      return !availableTime.includes(pickedDate.substring(0, 10) + time);
    }
    return true;
  };

  const getInputName = (inputTime) => {
    return pickedDate ? timeEditor(pickedDate, inputTime) : inputTime;
  };

  return (
    <Styled.Wrapper role="radiogroup">
      {time.map((singleInput) => {
        const dis = getDisabled(singleInput);
        return (
          <div key={uuid4()}>
            <Styled.Input
              type="radio"
              name={getInputName(singleInput)}
              id={getInputName(singleInput)}
              value={getInputName(singleInput)}
              checked={isSelectedRadio(getInputName(singleInput))}
              onChange={handleRadioClick}
              key={uuid4()}
              disabled={dis}
              role="radio"
            />
            <Styled.Label
              htmlFor={getInputName(singleInput)}
              key={uuid4()}
              notReady={dis}
              current={
                selectedTime === getInputName(singleInput) ? true : false
              }
              data-testid={dis ? "radioIsDisabled" : "radioIsNotDisabled"}
            >
              {moment(`2021-11-22${singleInput}`).format("hh:mm a")}
            </Styled.Label>
          </div>
        );
      })}
    </Styled.Wrapper>
  );
};

export default RadioBtns;
