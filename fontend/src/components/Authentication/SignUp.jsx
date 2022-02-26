import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function SignUp() {
    const [user, setUser] = useState({ name: '', email: '', password: '', photo: '' });
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    let name, value;
    function handelInputs(e) {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
        console.log(user)
    }

    function submitHandler() {

    }
    return (
        <VStack spacing={'5px'}>
            <FormControl isRequired>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input type={'text'} placeholder='Name' onChange={handelInputs} name='name' value={user.name} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input type={'email'} placeholder='Email' onChange={handelInputs} name='email' value={user.email} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup size='md'>
                    <Input type={show ? 'text' : 'password'} placeholder='Password' onChange={handelInputs} name='password' value={user.password} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl >
                <FormLabel htmlFor='photo'>Upload Photo</FormLabel>
                <Input type={'file'} p='1.5' accept='image/*' placeholder='Upload Photo' onChange={handelInputs} name='photo' value={user.photo} />
            </FormControl>
            <Button colorScheme={'green'} width='100%' style={{ marginTop: 15 }} onClick={submitHandler}>Sign Up</Button>
        </VStack>
    )
}

export default SignUp