import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AWS from "aws-sdk";

const useGetFile = init => {
  const [result, setResult] = useState("");
  const [key, setKey] = useState(init ?? "");
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
