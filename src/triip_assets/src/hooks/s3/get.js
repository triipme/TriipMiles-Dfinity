import React, { useCallback, useEffect, useState } from "react";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import S3 from "aws-sdk/clients/s3";
import { useSelector } from "react-redux";

const useGetFile = init => {
  const [result, setResult] = useState("");
  const [key, setKey] = useState(init ?? "");
  const { storage } = useSelector(state => state.user);
  const creds = {
    accessKeyId: storage[1],
    secretAccessKey: storage[2]
  };
  const s3 = new S3({ region: storage[3], credentials: creds });
  useEffect(() => {
    if (!!key) {
      console.log("key", key);
      const target = {
        Bucket: storage[0],
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
