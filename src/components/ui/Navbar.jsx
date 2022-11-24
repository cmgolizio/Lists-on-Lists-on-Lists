import React, { useContext, useState } from "react";
import { Flex, HStack, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [error, setError] = useState('');
  const { logout, currentUser } = useAuth();

  const router = useRouter();

  // const displayText = (
  //   !currentUser ?
  //     null :
  //     activeList === null ?
  //       (
  //         <Link href='/list/Lists'>{`Lists: (${lists?.length})`}</Link>
  //       ) :
  //         activeList?.tasks?.length ?
  //           `Tasks: (${activeList?.tasks?.length})` :
  //           'Tasks: (0)'
  // );

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
      bg='#736bfb'
      align='center'
      justify='center'
    >
      <HStack justify='center'>
        <HStack pos='absolute' right='0vw' minW='max-content' justify='space-evenly' px='2rem'>
          <ThemeSwitcher />
          <Button onClick={e => handleLogout(e)}>
            Log out
          </Button>
        </HStack>
        <Heading size='xl' pos='absolute' left='0vw'>CMG</Heading>
        {/* <Heading size='lg'>{displayText}</Heading> */}
      </HStack>
    </Flex>
  );
};

export default Navbar;
