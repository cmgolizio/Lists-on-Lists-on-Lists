import React, { useState, useEffect } from 'react';
import {
  Center,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  Alert,
  AlertIcon,
  useDisclosure,
} from '@chakra-ui/react';
import {
  doc,
  getDoc
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../src/hooks/useAuth';
import { db } from '../src/firebase/firebase';
// import ColorPicker from '../src/components/ui/ColorPicker';
import Login from './auth/Login';
import DeleteAccountConfirm from '../src/components/user/DeleteAccountConfirm';

const Dashboard = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentUser, logout, name, setName, deleteAccount } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await logout();
      router.push('/auth/Login');
    } catch (error) {
      setError('Failed to log out.')
    }
  };

  // const handleDeleteAccount = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   try {
  //     await deleteAccount(currentUser);
  //     router.push('/auth/Signup');
  //   } catch (error) {
  //     setError('Account could not be deleted.')
  //   }
  // };

  const goToLists = (e) => {
    e.preventDefault();
    console.log('Dashboard - goToLists - ROUTER: ', router);
    router.push('/list/Lists', '/mylists');
  };

  // useEffect(() => {
  //   router.prefetch('/list/Lists', '/mylists');
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const getUserData = async () => {
    setLoading(true)
    const userRef = doc(db, 'users', `${currentUser.uid}`);
    const userDataSnap = await getDoc(userRef);
    if (userDataSnap.exists()) {
      // console.log("Document data:", userDataSnap.data());
      const nameArray = userDataSnap.data().name;
      setName({
        first: nameArray[1],
        last: nameArray[0],
      });
    } else {
       // doc.data() will be undefined in this case
      setError('Could not find any user');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!currentUser) return;
    getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentUser) return <Login />
  return (
    <VStack>
      <Center pos='absolute' top={20} paddingBottom='15rem'>
        <VStack>
          {error && <Alert status='error'><AlertIcon/>{error}</Alert>}
          <Card w={['20rem', null, null, '50rem']}>
            <CardHeader>
              <Heading size='xl'>{loading ? 'Loading your info...' : `Hi, ${name.first}!`}</Heading>
              <Button top={3} onClick={(e) => goToLists(e)}>My Lists</Button>
            </CardHeader>
            <CardBody>
              <HStack justify='space-between' px='3rem'>
                <Text>Email: </Text>
                <Text>{currentUser.email}</Text>
              </HStack>
              {/* <HStack justify='space-between' px='3rem'>
                <Text>Accent Color: </Text>
                <ColorPicker />
              </HStack> */}
            </CardBody>
            <CardFooter flexDir='column'>
              <Link href='/user/UpdateProfile' fontSize='sm'>
                Update Profile
              </Link>
            </CardFooter>
          </Card>
          <Button fontSize='sm' my='20rem' variant='link' onClick={(e) => handleLogout(e)}>Logout</Button>
          {/* <Button fontSize='sm' pos='absolute' top='75rem' variant='link' onClick={onOpen} color='red.500'>Delete Account</Button> */}
          <Button pt={5} fontSize='sm' variant='link' onClick={onOpen} color='red.500'>Delete Account</Button>
        </VStack>
      </Center>
      {
        isOpen && <DeleteAccountConfirm isOpenProp={isOpen} onCloseProp={onClose} setError={setError} />
      }
    </VStack>
  );
};

export default Dashboard;