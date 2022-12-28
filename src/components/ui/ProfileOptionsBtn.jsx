import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

const ProfileOptionsBtn = (props) => {
  const { dashboard, user, logout } = props;
  const { modeColor, notModeColor } = useAuth();

  const checkUserForLogout = (e, validUser) => {
    e.preventDefault();

    return validUser && logout(e);
  };
  return (
    <Menu isLazy>
      <MenuButton>Profile</MenuButton>
      <MenuList bg={notModeColor} color={modeColor}>
        <MenuGroup title='My Account'>
          <MenuItem
            onClick={(e) => dashboard(e)}
            bg={notModeColor}
            color={modeColor}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            onClick={(e) => checkUserForLogout(e, user)}
            bg={notModeColor}
            color={modeColor}
          >
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default ProfileOptionsBtn;
