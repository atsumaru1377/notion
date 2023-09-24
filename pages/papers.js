// pages/papers.js
import { useState } from "react";
import { Checkbox, TextField, Button } from "@mui/material";
import parseBibTeX from "@/utils/bibtex";
import { writePapersDatabase } from "@/utils/notion";

const defaultData = {
  Title: "",
  Authors: "",
  Year: "",
  doi: "",
  pdf: "",
  Field: "",
  Conference: "",
  Priority: "",
  ReadDate: "",
  Genres: "",
  BibTex: "",
}

const Papers = () => {
  const [BibTex, setBibTex] = useState(true);
  const onCheckboxBibTexChange = () => {
    setBibTex(!BibTex);
  };
  const [data, setData] = useState(defaultData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const addPaper = async () => {
    if (BibTex) {
      const parsedBibTex = parseBibTeX(data.BibTex);
      setData((prevData) => ({
        ...prevData,
        ...parsedBibTex,
      }));
    }
    const postData = {
      ...data,
      Field: data.Field.split(","),
      Conference: data.Conference.split(","),
      Genres: data.Genres.split(","),
    };

    try {
      const res = await writePapersDatabase(postData);
      if (res) {
        setData(defaultData);
      }
    } catch (error) {
      console.error('Error adding paper:', error);
    }
  }

  return (
    <div className="m-8 flex flex-col items-center">
      <div className="w-full sm:w-3/4 flex flex-row flex-wrap gap-2">
        <div>
          <Checkbox checked={BibTex} onChange={onCheckboxBibTexChange}/> Use BibTex
        </div>
        {BibTex ? (
          <TextField
            type="text"
            name="BibTex"
            onChange={handleChange}
            value={data.BibTex}
            label="BibTex"
            className="w-full"
            multiline rows={6}/>
        ) : (
          <div className="flex gap-2 flex-wrap">
            <TextField
              type="text"
              name="Title"
              label="Title"
              onChange={handleChange}
              value={data.Title}
              className="w-full"/>
            <TextField
              type="text"
              name="Authors"
              label="Authors"
              onChange={handleChange}
              value={data.Authors}
              className="w-full"/>
            <TextField
              type="number"
              name="Year"
              label="Year"
              onChange={handleChange}
              value={data.Year}
              className="w-1/3"/>
            <TextField
              type="text"
              name="doi"
              label="DOI"
              onChange={handleChange}
              value={data.doi}
              className="w-1/2"/>
          </div>
        )}
        <TextField
          type="text"
          name="pdf"
          label="PDF"
          onChange={handleChange}
          value={data.pdf}
          className="w-full"/>
        <TextField
          type="text"
          name="Field"
          label="Field"
          onChange={handleChange}
          value={data.Field}
          className="w-1/3"/>
        <TextField
          type="text"
          name="Conference"
          label="Conference"
          onChange={handleChange}
          value={data.Conference}
          className="w-1/3"/>
        <TextField
          type="text"
          name="Priority"
          label="Priority"
          onChange={handleChange}
          value={data.Priority}
          className="w-1/3"/>
        <TextField
          type="text"
          name="ReadDate"
          label="Read Date"
          onChange={handleChange}
          value={data.ReadDate}
          className="w-1/3"/>
        <TextField
          type="text"
          name="Genres"
          label="Genres"
          onChange={handleChange}
          value={data.Genres}
          className="w-full"/>
        <Button
          variant="contained"
          color="success" size="large"
          className="w-full text-black hover:text-white"
          onClick={addPaper}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default Papers;