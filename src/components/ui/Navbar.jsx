import React, { useEffect, useState } from "react";
import { Flex, HStack, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAuth } from "../../hooks/useAuth";
import NavbarBtnGroupLeft from "./NavbarBtnGroupLeft";

const Navbar = () => {
  const [navText, setNavText] = useState('');
  const [error, setError] = useState('');
  const { logout, currentUser, lists, activeList, userColor } = useAuth();

  const router = useRouter();

  const handleNavText = React.useCallback(() => {
    if (!currentUser) {
      setNavText('');
      if (!activeList) {
        if (!lists || lists.length === 0) {
          setNavText('Lists (0)');
        } else {
          setNavText(`Lists (${lists.length})`);
        }
      } else {
        if (!activeList.tasks || activeList.tasks.length === 0) {
          setNavText('Tasks (0)');
        } else {
          setNavText(`Tasks (${activeList.tasks.length})`);
        }
      }
    }
  }, [activeList, currentUser, lists]);

  useEffect(() => {
    handleNavText();
  }, [handleNavText])

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

  return (
    <Flex
      pos='absolute'
      top='0vh'
      h='3.5rem'
      w='100%'
      bg={userColor}
      align='center'
      justify='center'
    >
      <HStack justify='center'>
        <NavbarBtnGroupLeft />
        <HStack pos='absolute' right='0vw' minW='max-content' justify='space-evenly' px='2rem'>
          <ThemeSwitcher />
          <Button onClick={e => handleLogout(e)}>
            Log out
          </Button>
        </HStack>
        <Heading size='xl' pos='absolute' left='0vw'>
        </Heading>
        <Heading size='lg'>{navText}</Heading>
      </HStack>
    </Flex>
  );
};

export default Navbar;
