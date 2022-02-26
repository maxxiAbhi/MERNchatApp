import React from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import SignIn from '../components/Authentication/SignIn'
import SignUp from '../components/Authentication/SignUp'


function Home() {
  return (
    <Container maxW='xl' centerContent>
      <Box
        bg="white"
        w="100%"
        p="3"
        margin="40px 0 15px 0"
        textAlign={"center"}
        borderRadius={"lg"}
      >
        <Text fontSize='3xl' fontWeight='bold' fontFamily={'Work sans'}>Friend Zone</Text>
      </Box>
      <Box
        bg='white'
        width={'100%'}
        borderRadius={"lg"}
        p='4'
      >
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Tab width={'100%'}>Sign In</Tab>
            <Tab width={'100%'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignIn />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home