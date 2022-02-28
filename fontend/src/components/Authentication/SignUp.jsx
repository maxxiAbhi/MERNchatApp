import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
function SignUp() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    // const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const handleClick = () => setShow(!show)


    function postDetails(pic) {
        setLoading(true)
        if (pic === undefined) {
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }
        if (pic.type === 'image/jpeg' || pic.type === 'image/jpg' || pic.type === 'image/png') {
            const data = new FormData()
            data.append("file", pic);
            data.append("upload_preset", "MERN-chat-app")
            data.append("cloud_name", "dpqwybjkn")
            fetch("https://api.cloudinary.com/v1_1/dpqwybjkn/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString())
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                })
        } else {
            toast({
                title: 'Please Select an Image JPEG OR PNG Type ',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
            return;
        }
    }

    async function submitHandler(e) {
        setLoading(true)
        e.preventDefault()
        if (!name || !email || !password || !pic) {
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
                    console.log('working')
                    return status >= 200 && status < 520; // Resolve only if the status code is less than 520
                }
            }
            const data = await axios.post("/api/signup", { name, email, password, pic },validStatus, config)
            console.log(data)
            if (data.status === 200) {
                toast({
                    title: data.data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })
                setLoading(false)
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
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input type={'text'} placeholder='Name' onChange={(e) => setName(e.target.value)} name='name' />
            </FormControl>
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
            <FormControl >
                <FormLabel htmlFor='photo'>Upload Photo</FormLabel>
                <Input type={'file'} p='1.5' accept='image/*' placeholder='Upload Photo' onChange={(e) => postDetails(e.target.files[0])} name='photo' />
            </FormControl>
            <Button colorScheme={'green'} width='100%' style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>Sign Up</Button>
        </VStack>
    )
}

export default SignUp