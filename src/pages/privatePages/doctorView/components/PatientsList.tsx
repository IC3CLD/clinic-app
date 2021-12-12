import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import styled from "styled-components";
import * as Styled from "../DoctorViewStyles";

import PatientsListItem from "./PatientsListItem/PatientsListItem";
import EditAppointmentModal from "./EditAppointmentModal";
import { IDoctorAppointment } from "models/IDoctorAppointments";

const List = styled.ul`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px 20px;
  overflow: auto;

  @media ${({ theme }) => theme.media.tablet} {
    margin-top: 42px;
    padding-bottom: 24px;
    min-height: 400px;
    max-height: calc(100% - 200px);
    flex-direction: row;
    flex-wrap: wrap;

    /* scrollbar */

    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) =>
    theme.colors.viewPagesContainerBackgroundColor};
      opacity: 0.32;
      border-radius: ${({ theme }) => theme.borderRadius.borderRadius};
    }
    &::-webkit-scrollbar-thumb {
      width: 12px;
      background: ${({ theme }) => theme.colors.asideInputBorderColor};
      opacity: 0.56;
      border-radius: ${({ theme }) => theme.borderRadius.borderRadius};
    }
  } ;
`;

type appointmentsArray = {
  appointmentsArray: IDoctorAppointment
}


const PatientsList = ({ appointmentsArray }: appointmentsArray) => {
  const [modalPropItems, setModalPropItems] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {appointmentsArray.length ? (
        <List>
          {appointmentsArray.map(({ patient, reason, status, visit_date, id }: any) => {
            const date = moment(visit_date).format("ddd MMM DD YYYY, h a");
            return (
              <PatientsListItem
                key={uuidv4()}
                avatar={patient.photo}
                name={patient.first_name + " " + patient.last_name}
                appointment={status}
                time={date}
                description={reason}
                id={id}
                visitDate={visit_date}
                setModalProps={setModalPropItems}
                openModalToggle={toggleModal}
              />
            );
          })}
        </List>
      ) : (
        <Styled.EmptyListBlock>
          <Styled.EmptyListText data-testid="emptyList">
            You have no patients yet. To create a patient profile, please
            contact your administrator.
          </Styled.EmptyListText>
        </Styled.EmptyListBlock>
      )}

      <EditAppointmentModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        modalPropItems={modalPropItems}
        setDropMenuValue={setModalPropItems}
      />
    </>
  );
};

export default PatientsList;