import React, { useEffect, useState } from "react";
import { Flex, HStack, Heading, Button, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAuth } from "../../hooks/useAuth";
import NavbarButton from "./NavbarButton";

const Navbar = () => {
  const [navText, setNavText] = useState('');
  const [error, setError] = useState('');
  const [showNavBtns, setShowBtns] = useState({
    profile: false,
    closeList: false,
  });
  const {
    logout,
    currentUser,
    lists,
    activeList,
    userColor,
    setTasks,
    setActiveList,
    modeColor,
    notModeColor
  } = useAuth();
  const router = useRouter();

  // ** HANDLER FUNCTIONS ** //
  const handleLogout = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await logout();
      router.push('/auth/Login')
    } catch (error) {
      setError('Failed to log out.')
    }
  };

  const handleToDashboard = (e) => {
    e.preventDefault();
    setActiveList(null)

    router.push('/');
  };

  const handleCloseList = (e) => {
    e.preventDefault();

    setActiveList(null);
    setTasks(null);

    router.push('/list/Lists');
  };

  const handleSetShowBtns = async () => {
    if (!currentUser) {
      setShowBtns({
        profile: false,
        closeList: false
      });
    } else if (currentUser && activeList) {
      setShowBtns({
        profile: true,
        closeList: true
      });
    } else if (currentUser && !activeList) {
      setShowBtns({
        profile: true,
        closeList: false
      });
    }
  };

  useEffect(() => {
    handleSetShowBtns();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeList, currentUser]);

  return (
    <Flex
      pos='relative'
      top='0vh'
      h='3.5rem'
      w='100%'
      bg={notModeColor}
      align='center'
      justify='center'
    >
      <HStack justify='center'>
        <HStack
          pos='absolute'
          left={3}
        >
          {showNavBtns.profile && <NavbarButton label='Profile' handler={handleToDashboard} />}
          {showNavBtns.closeList && <NavbarButton label='All Lists' handler={handleCloseList} />}
        </HStack>
        <HStack
          pos='absolute'
          right={3}
        >
          <ThemeSwitcher bg={modeColor} _hover={{ bg: notModeColor, color: modeColor }} />
          {currentUser && <NavbarButton label='Logout' handler={handleLogout} />}
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;
