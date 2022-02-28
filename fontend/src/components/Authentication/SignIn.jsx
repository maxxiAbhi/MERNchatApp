import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate();

   async function submitHandler(e) {
        setLoading(true)
        e.preventDefault();
        console.log({email,password})
        if (!email || !password) {
            toast({
                title: 'Please Fill All The Filds ',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
            return;
        }


        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const validStatus = {
                validateStatus: function (status) {
                    return status >= 200 && status < 520; // Resolve only if the status code is less than 520
                }
            }
            const data = await axios.post("/api/signin", { email, password }, validStatus, config)
            console.log(data)
            if (data.status === 200) {
                setLoading(false)
               console.log(data.data.user)
                localStorage.setItem("user",JSON.stringify(data.data.user))
                navigate('/chats')
            } else {
                toast({
                    title: data.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })
                setLoading(false)
            }
        } catch (error) {
            toast({
                title: `Something Went Wrong`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
        }
    }
    return (
        <VStack spacing={'5px'}>
            <FormControl isRequired>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input type={'email'} placeholder='Email' onChange={(e) => setEmail(e.target.value)} name='email' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup size='md'>
                    <Input type={show ? 'text' : 'password'} placeholder='Password' onChange={(e) => setPassword(e.target.value)} name='password' />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button colorScheme={'green'} width='100%' style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>Sign Up</Button>
        </VStack>
    )
}

export default SignIn