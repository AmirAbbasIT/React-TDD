import React from "react";
import { withTranslation } from "react-i18next";

const Translation = ({ t, i18n }) => {
  return (
    <div className="d-flex flex-row px-3">
      <p
        data-testid="english"
        onClick={() => i18n.changeLanguage("en")}
        className="pointer"
      >
        En: <img src="https://flagsapi.com/US/flat/32.png" alt="English"></img>
      </p>
      <p
        data-testid="urdu"
        onClick={() => i18n.changeLanguage("ur")}
        className="pointer"
      >
        UR: <img src="https://flagsapi.com/PK/flat/32.png" alt="Urdu"></img>
      </p>
    </div>
  );
};

export default withTranslation()(Translation);
