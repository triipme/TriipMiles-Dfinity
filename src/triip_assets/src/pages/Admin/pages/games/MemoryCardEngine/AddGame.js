import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import { PlusIcon } from "@/components/Icon";
import { read, readFile, utils } from "xlsx";

const AddGame = () => {
  const ref = useRef(null);
  const [html, setHtml] = useState();
  const handleButton = () => {
    ref.current.click();
  };
  const handleChange = event => {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);
      reader.addEventListener("load", e => {
        const wb = read(e.target.result, { type: "buffer" }); // workaround
        const wsname = wb.SheetNames[0];
        console.log("====================================");
        console.log(wsname);
        console.log("====================================");
        const ws = wb.Sheets[wsname]; // get first worksheet
        const aoa = utils.sheet_to_json(ws); // get data as array of arrays
        resolve(aoa);
      });
      reader.addEventListener("error", e => {
        reject(e);
      });
    });
    promise
      .then(aoa => {
        console.log(aoa);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <input ref={ref} type="file" name="" id="upload-file-csv" hidden onChange={handleChange} />
      <Button
        variant="contained"
        onClick={handleButton}
        startIcon={<PlusIcon width={24} height={24} />}>
        Delete
      </Button>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
};

export default AddGame;
