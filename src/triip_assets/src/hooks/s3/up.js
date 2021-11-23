import React, { useCallback, useEffect, useState } from "react";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import S3 from "aws-sdk/clients/s3";

const useUploadFile = () => {
  const [fileState, setFileState] = useState({});
  const [status, setStatus] = useState(false);
  const [result, setResult] = useState();
  const [progress, setProgress] = useState(0);
  const creds = {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
  };
  const s3 = new S3({ region: process.env.S3_REGION, credentials: creds });
  useEffect(() => {
    (async () => {
      try {
        if (!!fileState?.file) {
          const target = {
            Bucket: process.env.S3_BUCKET,
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
              console.log("Failed to retrieve an object", error);
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
