import { useState } from 'react';
import { Container, TextField, Button, Grid, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { fetchDramaTitle, fetchDramaCreditsData, fetchDramaData, fetchDramaDetailData} from '../utils/TMDV';
import { writeDramaDatabase } from '../utils/notion';

export default function Dramas() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedDrama, setSelectedDrama] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    // replace with actual API call
    const data = await fetchDramaData(search);
    setResults(data.results);
  };

  const handleOpen = async (id) => {
    // replace with actual API call
    const data = await fetchDramaDetailData(id);
    setSelectedDrama(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToDatabase = async () => {
    // replace with actual API call
    writeDramaDatabase(selectedDrama.id);
    handleClose();
  };

  return (
    <div className="p-4 flex flex-col h-full gap-y-4">
      <div className="flex gap-x-4 mb-4">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          className=""
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          className="text-black hover:text-white"
        >
          Search
        </Button>
      </div>
      <Grid container spacing={3}>
        {results.map((drama) => (
          <Grid item xs={12} sm={6} md={4} key={drama.id}>
            <Card onClick={() => handleOpen(drama.id)} className="cursor-pointer">
              <div className="relative h-48">
                <Image
                  src={`http://image.tmdb.org/t/p/w500${drama.poster_path}`}
                  layout='fill'
                  objectFit='cover'
                  alt={drama.original_name}
                />
              </div>
              <CardContent>
                <Typography variant="h6" noWrap className="text-black">
                  {drama.original_name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedDrama && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="text-black">
            {selectedDrama.id}
             {selectedDrama.original_name}
          </DialogTitle>
          <DialogContent className="text-black">
            <Typography>
              {selectedDrama.overview}
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
          className="hover:text-white text-black"
        >
          Go back
        </Button>
      </Link>
    </div>
  );
}
