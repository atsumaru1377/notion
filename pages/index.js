import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [inputPassword, setInputPassword] = useState('');
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  useEffect(() => {
    setIsPasswordMatched(inputPassword === process.env.NEXT_PUBLIC_PASSWORD);
  }, [inputPassword]);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 px-4">
      <Typography variant="h4" align="center" gutterBottom>
        Add Data to My Notion Library
      </Typography>
      <div className='sm:w-1/2 flex flex-col gap-4'>
        <TextField
          label="Password"
          type="password"
          value={inputPassword}
          className='w-full'
          onChange={(e) => setInputPassword(e.target.value)}
        />
        {isPasswordMatched && (
          <Box className="flex flex-row items-center justify-between w-full">
            <Link href="/movies" passHref>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="w-full text-black hover:text-white"
                >
                Movies
              </Button>
            </Link>
            <Link href="/dramas" passHref>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className="w-full text-black hover:text-white"
              >
                Dramas
              </Button>
            </Link>
            <Link href="/books" passHref>
              <Button
                variant="contained"
                color="warning"
                size="large"
                className="w-full text-black hover:text-white"
                >
                Books
              </Button>
            </Link>
            <Link href="/papers" passHref>
              <Button
                variant="contained"
                color="success"
                size="large"
                className="w-full text-black hover:text-white"
                >
                Papers
              </Button>
            </Link>
          </Box>
        )}
      </div>
    </div>
  );
}