import React, { useState } from 'react'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Text, toast, Tooltip, useDisclosure, useToast, WrapItem } from '@chakra-ui/react'
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons"
import ProfileModel from '../miscellaneous/ProfileModel'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Navbar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState("")
  const toast = useToast()
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  function logOutHandeler() {
    localStorage.removeItem("user")
    navigate('/')
  }
  const user = JSON.parse(localStorage.getItem('user'))
  async function searchHandel() {
    if (!search) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `${user.token}`,
        },
      };
      console.log(user.token)
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data)
      setLoading(false);
      setSearchResult(data);


    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return;
    }
  }
  return (
    <>
      <Box d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px">
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen} >
            <SearchIcon />
            <Text d={{ base: "none", md: "flex" }} px={6}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">Friend Zone</Text>

        <Menu>
          <MenuButton as={Button} backgroundColor='white' p='25px' rightIcon={<ChevronDownIcon />}>
            <WrapItem>
              <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
            </WrapItem>
          </MenuButton>
          <MenuList>
            <ProfileModel>
              <MenuItem>Profile</MenuItem>
            </ProfileModel>

            <MenuItem onClick={logOutHandeler}>LogOut</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
          <DrawerBody>
            <Box d='flex' pb='2'>
              <Input placeholder='Search By email or name' mr={2} value={search} onChange={(e) => { setSearch(e.target.value) }} />
              <Button onClick={searchHandel}>Go</Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar