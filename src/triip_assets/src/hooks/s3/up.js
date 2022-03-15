import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AWS from "aws-sdk";

const useUploadFile = () => {
  const [fileState, setFileState] = useState({});
  const [result, setResult] = useState();
  const [progress, setProgress] = useState(0);
  const { storage } = useSelector(state => state.user);
  const creds = {
    accessKeyId: storage[1],
    secretAccessKey: storage[2]
  };
  AWS.config.update(creds);
  const s3 = new AWS.S3({
    params: { Bucket: storage[0] },
    region: storage[3]
  });
  useEffect(() => {
    (async () => {
      try {
        if (!!fileState?.file) {
          const params = {
            ACL: "public-read",
            Body: fileState?.file,
            Bucket: storage[0],
            Key: fileState?.name
          };
          const target = {
            Bucket: storage[0],
            Key: fileState?.name
          };
          await s3
            .putObject(params)
            .on("httpUploadProgress", evt => {
              setProgress(Math.round((evt.loaded / evt.total) * 100));
            })
            .send(err => {
              if (err) console.log(err);
            });
          await s3.getObject(target, (err, data) => {
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
