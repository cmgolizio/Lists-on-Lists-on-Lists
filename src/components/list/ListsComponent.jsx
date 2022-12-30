/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  VStack,
  Stack,
  Flex,
  Container,
  Grid,
  GridItem,
  Center,
  Box,
} from "@chakra-ui/react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import CustomPopover from "../ui/CustomPopover";
import AddListButton from "./AddListButton";
import AddList from "./AddList";
import List from "./List";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../firebase/firebase";
// import PageTransition from '../../styles/framer-motion/PageTransition';

const Lists = () => {
  const [targetedList, setTargetedList] = useState("");
  const { currentUser, lists, setLists } = useAuth();

  useEffect(() => {
    setLists(null);
    const listsCollRef = collection(db, `users/${currentUser?.uid}/lists`);
    const q = query(listsCollRef, orderBy("created"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLists(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Center pos='fixed' top={25} ml={["45%", null, null, "50%"]}>
        <CustomPopover />
      </Center>
      {/* <Flex
        scrollSnapType={["x mandatory", null, null, null]}
        // dir={["row", null, null, "row"]}
        dir='row'
        // wrap={["wrap", null,  null, "nowrap"]}
        wrap='nowrap'
        // overflowY={["hidden", "auto", "auto", "auto"]}
        // overflowX={["auto", "auto", "auto", "hidden"]}
        // overflowY='hidden'
        // overflowX='auto'
        h={["100%", null, null, "calc(100vh - 2rem)"]}
        w='max-content'
        m='4px 4px'
        p='4px'
        whiteSpace='nowrap'
      > */}

      {!lists
        ? null
        : lists.map((list, i) => {
            return (
              <Container
                key={list.id}
                centerContent
                flex={[null, null, null, "0 0 auto"]}
                minW={["90vw", null, null, "calc(33% - 20px)"]}
                h={["90%", null, null, null]}
                // scrollSnapAlign={["center", null, null, null]}
                scrollSnapAlign='start'
                mr={i === lists.length - 1 ? 6 : 0}
                ml={i === 0 ? 6 : 10}
                mt='1.5rem'
              >
                <List
                  list={list}
                  targetedList={targetedList}
                  setTargetedList={setTargetedList}
                />
              </Container>
            );
          })}
    </>
  );
};

export default Lists;
