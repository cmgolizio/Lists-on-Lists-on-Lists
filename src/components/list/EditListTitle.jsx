import React, { useState } from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { GrCheckmark } from 'react-icons/gr';

const EditListTitle = ({target}) => {
  const [titleInput, setTitleInput] = useState('');
  const handleNewTitle = (e) => {
    e.preventDefault();
  }
  return (
    <InputGroup>
      <Input
        placeholder={target.title}
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
      />
      <InputRightElement>
        <IconButton
          icon={<GrCheckmark/>}
          onClick={(e) => handleNewTitle(e)}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default EditListTitle