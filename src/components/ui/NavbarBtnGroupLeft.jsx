import React, { useState, useEffect } from 'react';
import { HStack } from '@chakra-ui/react';

import GoToDashboard from '../user/GoToDashboard';
import CloseList from './CloseList';
import { useAuth } from '../../hooks/useAuth';

const NavbarBtnGroupLeft = () => {
  const [showNavBtns, setShowBtns] = useState({
    profile: false,
    closeList: false,
  });
  const { currentUser, activeList, setActiveList } = useAuth();


  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [activeList, currentUser])

  return (
    <HStack
      pos='absolute'
      top={2}
      left={3}
      align='space-between'
    >
      {showNavBtns.profile && <GoToDashboard setActiveList={setActiveList} />}
      {showNavBtns.closeList && <CloseList />}
    </HStack>
  );
};

export default NavbarBtnGroupLeft;