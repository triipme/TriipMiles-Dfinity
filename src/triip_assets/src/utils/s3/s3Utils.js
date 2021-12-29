import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { s3Client } from "../../libs/s3Client";

export const upload = async (Bucket, Key, Image) => {
    const Fields = {
        'Content-Disposition': 'inline',
        'Content-Type': 'image/jpeg'
    }
    const Conditions = [
        {
            'Content-Disposition': 'inline'
        },
        {
            'Content-Type': 'image/jpeg'
        }
    ]
    const { url, fields } = await createPresignedPost(s3Client, {
        Bucket,
        Key,
        Expires: 300,
        Conditions,
        Fields
    });
    const form = new FormData();
    for(var [key, value] of Object.entries(fields)) {
        form.append(key, value);
    }
    form.append('file', Image);
    return {
        url,
        form
    }
}