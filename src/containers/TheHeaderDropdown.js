import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import CandleImg from "src/assets/candle.jpg";
import { useDispatch, useSelector } from "react-redux";
import { withNamespaces } from "react-i18next";
import { useHistory } from "react-router";
import { logout } from "src/actions/user";
import { message } from "antd";
import sockets from "src/socket";
// import { useSelector, useDispatch } from "react-redux";

const TheHeaderDropdown = (props) => {
  const { t } = props;
  const dispatch = useDispatch();
  const logOut = () => {
    try {
      dispatch(logout());
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={CandleImg} className="c-avatar-img" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem to="/profile">
          <CIcon name="cil-user" className="mfe-2" /> {t("Profile")}
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem to="/change-password">
          <CIcon name="cil-user" className="mfe-2" /> {t("Change Password")}
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={() => logOut()}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          {t("Logout")}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default withNamespaces()(TheHeaderDropdown);
