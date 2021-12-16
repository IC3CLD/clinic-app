import React, { useEffect } from "react";
import ViewPagesWrapper from "../components/ViewPagesWrapper/ViewPagesWrapper";
import NavWrapper from "./Components/NavWrapper/NavWrapper";
import Form from "./Components/Form/Form";

import { useSelector } from "react-redux";
import { userRoleNameSelector } from "redux/selectors";
import { useHistory } from "react-router-dom";
import PATHS from "routes/paths";
import TitleH4 from "components/TitleH4";

const PatientMakeAppointment = () => {
  const history = useHistory();
  const userRole = useSelector(userRoleNameSelector);

  useEffect(() => {
    if (!userRole) {
      history.replace(PATHS.signIn);
    }
  }, [userRole, history]);

  return (
    <ViewPagesWrapper>
      <NavWrapper />
      <section>
        <TitleH4>Make an appointment</TitleH4>
        <Form />
      </section>
    </ViewPagesWrapper>
  );
};

export default PatientMakeAppointment;
