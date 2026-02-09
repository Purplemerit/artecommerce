const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
require("dotenv").config({ path: ".env.local" });

const bucketName = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
    console.error("❌ Missing AWS configuration in .env.local");
    process.exit(1);
}

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

const uploadDir = path.join(process.cwd(), "public/images");

async function uploadFile(fileName) {
    const filePath = path.join(uploadDir, fileName);
    const fileContent = fs.readFileSync(filePath);
    const contentType = mime.lookup(filePath) || "application/octet-stream";

    const key = `images/${fileName}`; // S3 Key (path in bucket)

    try {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: fileContent,
            ContentType: contentType,
            // ACL: "public-read", // Uncomment if you need public read access directly, but usually not needed if policy is set or using CloudFront
        });

        await s3Client.send(command);
        console.log(`✅ Uploaded: ${fileName} -> s3://${bucketName}/${key}`);
    } catch (err) {
        console.error(`❌ Failed to upload ${fileName}:`, err.message);
    }
}

async function main() {
    console.log(`🚀 Starting upload to S3 Bucket: ${bucketName} (${region})`);
    console.log(`📂 Source: ${uploadDir}`);

    if (!fs.existsSync(uploadDir)) {
        console.error("❌ Source directory not found!");
        return;
    }

    const files = fs.readdirSync(uploadDir);

    for (const file of files) {
        const stats = fs.statSync(path.join(uploadDir, file));
        if (stats.isFile()) {
            await uploadFile(file);
        }
    }

    console.log("\n✨ All files processed!");
}

main();
