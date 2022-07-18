import React, { ChangeEvent } from 'react'
import {
  HStack,
  Input,
  Button,
  Select,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody
} from '@chakra-ui/react'
import { TbNumbers } from 'react-icons/tb'

interface Props {
  handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void
  placeholder: string
  limit: number
  selectValues: Array<number>
}

const Toolbar = ({
  handleFilterChange,
  handleSelectChange,
  selectValues,
  placeholder,
  limit
}: Props) => {
  return (
    <HStack>
      <Input placeholder={placeholder} onChange={handleFilterChange} />
      <Popover>
        <PopoverTrigger>
          <Button><TbNumbers size={28} /></Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader>¿Cuántos resultados quieres ver?</PopoverHeader>
          <PopoverBody>
            <Select defaultValue={limit} onChange={handleSelectChange}>
              {selectValues.map(value => <option key={value} value={value}>{value}</option>)}
            </Select>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  )
}

export default Toolbar
