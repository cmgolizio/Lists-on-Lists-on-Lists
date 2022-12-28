import React from "react";

import ListsScrollBox from "../../src/components/list/ListsScrollBox";
import ListsComponent from "../../src/components/list/ListsComponent";

const Lists = () => {
  return (
    <ListsScrollBox>
      <ListsComponent />
    </ListsScrollBox>
  );
};

export default Lists;
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect } from "react";
// import {
//   VStack,
//   Stack,
//   Flex,
//   Container,
//   Grid,
//   GridItem,
//   Center,
//   Box,
// } from "@chakra-ui/react";
// import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

// import CustomPopover from "../../src/components/ui/CustomPopover";
// import AddListButton from "../../src/components/list/AddListButton";
// import AddList from "../../src/components/list/AddList";
// import List from "../../src/components/list/List";
// import { useAuth } from "../../src/hooks/useAuth";
// import { db } from "../../src/firebase/firebase";
// // import PageTransition from '../../styles/framer-motion/PageTransition';

// const Lists = () => {
//   const [targetedList, setTargetedList] = useState("");
//   const { currentUser, lists, setLists } = useAuth();

//   useEffect(() => {
//     setLists(null);
//     const listsCollRef = collection(db, `users/${currentUser?.uid}/lists`);
//     const q = query(listsCollRef, orderBy("created"));

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       setLists(
//         querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
//       );
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <Box h='100vh' pt={[100, null, null, 10]}>
//       <Center pos='fixed' top={25} left='50%'>
//         <CustomPopover />
//       </Center>
//       <Flex
//         scrollSnapType={["x mandatory", null, null, null]}
//         // dir={["row", null, null, "row"]}
//         dir='row'
//         // wrap={["wrap", null,  null, "nowrap"]}
//         wrap='nowrap'
//         // overflowY={["hidden", "auto", "auto", "auto"]}
//         // overflowX={["auto", "auto", "auto", "hidden"]}
//         overflowY='hidden'
//         overflowX='auto'
//         h={["100%", null, null, "calc(100vh - 2rem)"]}
//         w='max-content'
//         m='4px 4px'
//         p='4px'
//         whiteSpace='nowrap'
//       >
//         {!lists
//           ? null
//           : lists.map((list, i) => {
//               return (
//                 <Container
//                   key={list.id}
//                   centerContent
//                   // flex={[null, null, null, "0 0 auto"]}
//                   w={["100vw", null, null, "calc(33% - 20px)"]}
//                   h={["90%", null, null, null]}
//                   // scrollSnapAlign={["center", null, null, null]}
//                   scrollSnapAlign='start'
//                   mr={i === lists.length - 1 ? "10rem" : null}
//                 >
//                   <List
//                     list={list}
//                     targetedList={targetedList}
//                     setTargetedList={setTargetedList}
//                   />
//                 </Container>
//               );
//             })}
//       </Flex>
//     </Box>
//   );
// };

// export default Lists;
