import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
});

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function putObjectURL(filename, contentType){
    const command = new PutObjectCommand({
        Bucket: "askhan-private",
        Key: `upload/user-uploads/${filename}`,
        ContentType: contentType,
    });
    const url = await getSignedUrl(s3Client, command)
    return url;
}

async function getObjectURL(key){
    const command = new GetObjectCommand({
        Bucket: "askhan-private",
        Key: key
    });
    const url = await getSignedUrl(s3Client, command)
    return url;
}


async function listObject(){
    const command = new ListObjectsV2Command({
        Bucket: "askhan-private",
        Key: "/"
    })
    const response = await s3Client.send(command);
    console.log(response)
}


async function deleteObject(){
    const command = new DeleteObjectCommand({
        Bucket: "askhan-private",
        Key: "upload/user-uploads/image-1717960719729.mp4"
    })
    const response = await s3Client.send(command);
    console.log(response)

}

async function init(){


    // await deleteObject();
    
    await listObject()

    // console.log("Url images showed", await getObjectURL("pic.png"))
    // console.log("Url images showed", await getObjectURL("upload/user-uploads/image-1717959848168.jpg"))

    // console.log("Url uploading", await putObjectURL(`video-${Date.now()}.mp4`, "video/mp4"))
}

init();
