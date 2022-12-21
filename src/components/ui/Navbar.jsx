import React, { useEffect, useState } from "react";
import { Flex, HStack, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAuth } from "../../hooks/useAuth";
import NavbarButton from "./NavbarButton";
import UndoButton from "./UndoButton";

const Navbar = () => {
  const [navText, setNavText] = useState('');
  const [error, setError] = useState('');
  const {
    logout,
    currentUser,
    lists,
    activeList,
    userColor,
    tasks,
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

  const handleToDashboard = async (e) => {
    e.preventDefault();
    await setActiveList(null)

    router.push('/', '/profile');
  };

  const handleCloseList = (e) => {
    e.preventDefault();

    setActiveList(null);
    setTasks(null);

    router.push('/list/Lists', '/mylists');
  };

  // const handleNavText = async () => {
  //   if (!currentUser) {
  //     setNavText('');
  //     return;
  //   }

  //   if (router.pathname === '/list/Lists') {
  //     // setNavText(`Lists: (${lists.length})`);
  //     await setNavText(`You have ${lists.length} lists`);
  //   } else if (router.pathname === '/list/ActiveList') {
  //     // setNavText(`Tasks: (${tasks.length})`);
  //     await setNavText(`Your list "${activeList.title}" has ${tasks.length} uncompleted tasks`);
  //   }
  // };

  return (
    <Flex
      pos='relative'
      top='0vh'
      h='3.5rem'
      w='100%'
      bg={modeColor}
      align='center'
      justify='center'
    >
      <HStack justify='center'>
        <HStack
          pos='absolute'
          left={3}
        >
          <NavbarButton label='Profile' handler={handleToDashboard} />
          <NavbarButton label='Lists' handler={handleCloseList} />
        </HStack>
        {/* <Box
          pos='absolute'
          left='50%'
          transform='translate(-50%, 0)'
        >
          <Text
            color={modeColor}
            fontSize='3xl'
          >
            {navText}
          </Text>
        </Box> */}
        <HStack
          pos='absolute'
          right={3}
        >
          <UndoButton />
          <ThemeSwitcher
            bg={modeColor}
            _hover={{
              bg: notModeColor,
              color: modeColor,
              border: '1px',
              borderColor: modeColor,
            }} />
          {currentUser && <NavbarButton label='Logout' handler={handleLogout} />}
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;
