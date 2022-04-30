import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

const Notfound = () => {
  const { t } = useTranslation("common");

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h3 style={{ textAlign: "center" }}>{t("error.notfound")}</h3>
      </div>
    </Fragment>
  );
};

export default Notfound;
