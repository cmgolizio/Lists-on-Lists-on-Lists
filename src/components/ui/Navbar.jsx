import React, { useEffect, useState } from "react";
import { Flex, HStack, Heading, Button, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAuth } from "../../hooks/useAuth";
import NavbarBtnGroupLeft from "./NavbarBtnGroupLeft";
import NavbarButton from "./NavbarButton";

const Navbar = () => {
  const [navText, setNavText] = useState('');
  const [error, setError] = useState('');
  const [showNavBtns, setShowBtns] = useState({
    profile: false,
    closeList: false,
  });
  const { logout, currentUser, lists, activeList, userColor, setTasks, setActiveList } = useAuth();
  const router = useRouter();

  const navBg = useColorModeValue('dark', 'light');
  const themeSwitchBg = useColorModeValue('light', 'dark');

  // const handleNavText = React.useCallback(() => {
  //   if (!currentUser) {
  //     setNavText('');
  //     if (!activeList) {
  //       if (!lists || lists.length === 0) {
  //         setNavText('Lists (0)');
  //       } else {
  //         setNavText(`Lists (${lists.length})`);
  //       }
  //     } else {
  //       if (!activeList.tasks || activeList.tasks.length === 0) {
  //         setNavText('Tasks (0)');
  //       } else {
  //         setNavText(`Tasks (${activeList.tasks.length})`);
  //       }
  //     }
  //   }
  // }, [activeList, currentUser, lists]);

  // useEffect(() => {
  //   handleNavText();
  // }, [handleNavText])

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
      pos='absolute'
      top='0vh'
      h='3.5rem'
      w='100%'
      // bg={userColor}
      bg={navBg}
      align='center'
      justify='center'
    >
      <HStack justify='center'>
        <HStack
          pos='absolute'
          top={2}
          left={3}
          align='space-between'
        >
          {showNavBtns.profile && <NavbarButton label='Profile' handler={handleToDashboard} />}
          {showNavBtns.closeList && <NavbarButton label='All Lists' handler={handleCloseList} />}
        </HStack>
        <HStack
          pos='absolute'
          right={3}
          minW='max-content'
          justify='space-evenly'
        >
          <ThemeSwitcher bg={themeSwitchBg} />
          <NavbarButton label='Logout' handler={handleLogout} />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;
