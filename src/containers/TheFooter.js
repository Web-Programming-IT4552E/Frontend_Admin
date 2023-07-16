import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="" target="_blank" rel="noopener noreferrer">
          Uray
        </a>
        <span className="ml-1">&copy; 2022 phase 2</span>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
