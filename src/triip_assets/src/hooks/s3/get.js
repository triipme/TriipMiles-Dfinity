import React, { useCallback, useEffect, useState } from "react";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import S3 from "aws-sdk/clients/s3";

const useGetFile = init => {
  const [result, setResult] = useState("");
  const [key, setKey] = useState(init ?? "");
  const creds = {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
  };
  const s3 = new S3({ region: process.env.S3_REGION, credentials: creds });
  useEffect(() => {
    if (!!key) {
      console.log("key", key);
      const target = {
        Bucket: process.env.S3_BUCKET,
        Key: key
      };
      s3.getObject(target, (err, data) => {
        console.log("err", err, data);
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
  }, [key]);
  return [result, setKey];
};

export default useGetFile;
