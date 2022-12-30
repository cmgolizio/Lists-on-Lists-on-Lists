import React, { useState } from "react";
import { Stack, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAuth } from "../../hooks/useAuth";
import NavbarButton from "./NavbarButton";
import UndoButton from "./UndoButton";
import ProfileOptionsBtn from "./ProfileOptionsBtn";

const Navbar = () => {
  const [error, setError] = useState("");
  const {
    logout,
    currentUser,
    setTasks,
    setActiveList,
    modeColor,
    notModeColor,
  } = useAuth();
  const router = useRouter();

  // ** HANDLER FUNCTIONS ** //
  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logout();
      router.push("/auth/Login");
    } catch (error) {
      setError("Failed to log out.");
    }
  };

  const handleToDashboard = async (e) => {
    e.preventDefault();
    await setActiveList(null);

    router.push("/", "/profile");
  };

  const handleCloseList = (e) => {
    e.preventDefault();

    setActiveList(null);
    setTasks(null);

    router.push("/list/Lists", "/mylists");
  };

  return (
    <HStack
      pos='fixed'
      top='0vh'
      h='3.5rem'
      w='100%'
      // direction={["row", null, null, "row-reverse"]}
      bg='transparent'
      align='center'
      justify={["space-between", null, null, "flex-start"]}
      px='1rem'
    >
      <HStack>
        <ProfileOptionsBtn
          dashboard={handleToDashboard}
          user={currentUser}
          logout={handleLogout}
        />
        <NavbarButton label='Lists' handler={handleCloseList} />
      </HStack>
      <HStack>
        <UndoButton />
        <ThemeSwitcher
          bg={modeColor}
          _hover={{
            bg: notModeColor,
            color: modeColor,
            border: "1px",
            borderColor: modeColor,
          }}
        />
      </HStack>
    </HStack>
  );
};

export default Navbar;
