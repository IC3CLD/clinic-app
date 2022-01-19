import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useForm, SubmitHandler, FormProvider, useFormContext } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import PATHS from "routes/paths";
import VisitReasons from "../VisitReasons/VisitReasons";
import AppointmentFormDatePiker from "../DatePicker/AppointmentFormDatePiker";
import FreeTimeRadioButtonsWrapper from "../FreeTimeRadioButtons/FreeTimeRadioButtonsWrapper";
import AppointmentFormButton from "../AppointmentFormButton/AppointmentFormButton";
import { useQuery } from "react-query";
import { errorNotification, successNotification } from "notifications";
import { appointmentSchema } from "utils/YupValidationSchemas";
import TitleH4 from "components/TitleH4";
import { createAppointment } from "network/fetchOperations";
import { CreateAppointmentRequestBody } from "types/fetchTypes";
import * as Styled from "../../PatientMakeAppointmentStyles";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

type FormikValues = {
  specialization: { value: string; label: string };
  doctor: { value: string; label: string };
  reason: string;
  note: string;
  selectedDate: string;
  selectedTime: string;
};

type Inputs = {
  specialization: { value: string, label: string },
  doctor: { value: string, label: string },
  reason: string,
  note: string,
  selectedDate: string,
  selectedTime: string,
};

const FormikForm = () => {
  const [requestData, setRequestData] =
    useState<React.SetStateAction<CreateAppointmentRequestBody | null>>(null);

  const methods = useForm<Inputs>({
    defaultValues: {
      specialization: { value: "", label: "" },
      doctor: { value: "", label: "" },
      reason: "",
      note: "",
      selectedDate: "",
      selectedTime: "",
    },
    resolver: yupResolver(appointmentSchema)
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    const newData = {
      date: data.selectedTime,
      reason: data.reason,
      note: data.note,
      doctorID: data.doctor.value,
    };
    // setRequestData(newData);
    console.log(data);
  };

  const history = useHistory();

  //   todo: check fetch process problem with errored request
  const { isFetching } = useQuery(
    ["makeAppointment", requestData],
    () => createAppointment(requestData),
    {
      enabled: !!requestData,
      retry: 2,
      onSuccess: () => onRequestSuccess(),
      onError: () => errorNotification(),
    }
  );

  const onRequestSuccess = () => {
    successNotification("Appointment has been created!");
    history.push({
      pathname: PATHS.doctorView,
    });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Styled.List>
            <Styled.ListItem>
              <Styled.TextWrapper>
                <Styled.Span>1</Styled.Span>
                <TitleH4>
                  Select a doctor and define the reason of your visit
                </TitleH4>
              </Styled.TextWrapper>
              <VisitReasons />
            </Styled.ListItem>
            <Styled.ListItem>
              <Styled.TextWrapper>
                <Styled.Span>2</Styled.Span>
                <TitleH4>Choose a day for an appointment</TitleH4>
              </Styled.TextWrapper>
              <AppointmentFormDatePiker />
            </Styled.ListItem>
            <Styled.ListItem>
              <Styled.TextWrapper>
                <Styled.Span>3</Styled.Span>
                <TitleH4>Select an available time slot</TitleH4>
              </Styled.TextWrapper>
              <FreeTimeRadioButtonsWrapper />
            </Styled.ListItem>
          </Styled.List>
          <ButtonWrapper>
            <AppointmentFormButton isFetching={isFetching} />
          </ButtonWrapper>
        </form>
      </FormProvider>
    </div >
  );
};

export default React.memo(FormikForm);
