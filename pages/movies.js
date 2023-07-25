import { useState } from 'react';
import { Container, TextField, Button, Grid, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { fetchMovieTitle, fetchMovieCreditsData, fetchMovieData, fetchMovieDetailData, find_movie, get_movie_detail} from '../utils/TMDV';
import { writeMovieDatabase } from '../utils/notion';

export default function Movies() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    // replace with actual API call
    const data = await fetchMovieData(search);
    setResults(data.results);
  };

  const handleOpen = async (id) => {
    // replace with actual API call
    const data = await fetchMovieDetailData(id);
    setSelectedMovie(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToDatabase = async () => {
    // replace with actual API call
    writeMovieDatabase(selectedMovie.id);
    handleClose();
  };

  return (
    <Container maxWidth="md" className="mt-8">
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        className="mb-4"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        className="mb-4"
      >
        Search
      </Button>
      <Grid container spacing={3}>
        {results.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card onClick={() => handleOpen(movie.id)} className="cursor-pointer">
              <div className="relative h-48">
                <Image
                  src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  layout='fill'
                  objectFit='cover'
                  alt={movie.title}
                />
              </div>
              <CardContent>
                <Typography variant="h6" noWrap className="text-black">
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedMovie && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="text-black">
            {selectedMovie.id}
             {selectedMovie.title}
          </DialogTitle>
          <DialogContent className="text-black">
            <Typography>
              {selectedMovie.overview}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddToDatabase} className="text-black">
              Add to Database
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Link href="/" passHref>
        <Button
          variant="contained"
          color="info"
          size="large"
          className="mt-4"
        >
          Go back
        </Button>
      </Link>
    </Container>
  );
}
