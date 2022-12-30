/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { VStack, Heading, Box } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

import { db } from "../../src/firebase/firebase";
import { useAuth } from "../../src/hooks/useAuth";
import Tasks from "../../src/components/task/Tasks";

const ActiveList = () => {
  const { currentUser, activeList, setActiveList, tasks } = useAuth();
  const router = useRouter();

  const getActiveList = async () => {
    const activeListRef = doc(
      db,
      `users/${currentUser.uid}/lists/${router.query.title}`
    );
    const activeListSnap = await getDoc(activeListRef);

    if (activeListSnap.exists()) {
      await setActiveList(activeListSnap.data());
    } else {
      await router.push("/list/Lists", "/mylists");
    }
  };

  useEffect(() => {
    router.prefetch("/list/Lists", "/mylists");
  }, []);

  useEffect(() => {
    getActiveList();
  }, []);

  return (
    <VStack w='100vw' minH='100vh' pt={[20, null, null, 20]}>
      <Box>
        <Heading size='3xl'>{!activeList ? null : activeList.title}</Heading>
      </Box>
      <Box paddingTop='5rem' visibility={!tasks ? "hidden" : "visible"}>
        {!activeList ? null : <Tasks />}
      </Box>
    </VStack>
  );
};

export default ActiveList;
