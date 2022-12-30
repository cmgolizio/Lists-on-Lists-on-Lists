import React from "react";
import { IconButton, Icon, forwardRef } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useAuth } from "../../hooks/useAuth";

const AddListButton = forwardRef((props, ref) => {
  const { modeColor, notModeColor } = useAuth();
  const { onOpen } = props;
  return (
    <IconButton
      bg={modeColor}
      color={notModeColor}
      _hover={{
        bg: notModeColor,
        color: modeColor,
        border: "1px",
        borderColor: modeColor,
      }}
      borderRadius='full'
      icon={<Icon as={AddIcon} />}
      onClick={onOpen}
      ref={ref}
    />
  );
});

export default AddListButton;
