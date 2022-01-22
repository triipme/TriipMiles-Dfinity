import React, { useCallback, useEffect, useState } from "react";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import S3 from "aws-sdk/clients/s3";
import { useSelector } from "react-redux";

const useUploadFile = () => {
  const [fileState, setFileState] = useState({});
  const [result, setResult] = useState();
  const [progress, setProgress] = useState(0);
  const { storage } = useSelector(state => state.user);
  const creds = {
    accessKeyId: storage[1],
    secretAccessKey: storage[2]
  };
  const s3 = new S3({ region: storage[3], credentials: creds });
  useEffect(() => {
    (async () => {
      try {
        if (!!fileState?.file) {
          console.log(fileState);
          const target = {
            Bucket: storage[0],
            Key: fileState?.name
          };
          const parallelUpload = new Upload({
            client: new S3Client({ region: process.env.S3_REGION, credentials: creds }),
            leavePartsOnError: false,
            params: { ...target, Body: fileState?.file }
          });
          parallelUpload.on("httpUploadProgress", evt => {
            setProgress(Math.round((evt.loaded / evt.total) * 100));
          });
          await parallelUpload.done();
          s3.getObject(target, (err, data) => {
            console.log("err", err);
            if (err != null) {
              console.log("Failed to retrieve an object", err);
            } else {
              console.log("data", data);
              setResult({
                _id: target.Key,
                image: URL.createObjectURL(new Blob([data.Body], { type: data.ContentType }))
              });
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [fileState]);
  const setFile = useCallback(state => setFileState(state), []);
  return [result, progress, setFile];
};

export default useUploadFile;
