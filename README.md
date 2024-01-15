# PDF Uploader
![roadmap](https://i.imgur.com/M31CVC6.png)

# About
This application is made to upload PDF files to the cloud through a front-end website. I was first interested in such applications of a project after realizing that my google drive storage was reaching its limit. The website send an API post request to an AWS Lambda function which generated a signed URL through an API trigger. This then allows uploads directly into an AWS S3 bucket which will store the PDFs.

There is no saving files in a temperory database allowing huge scalability and little bandwith use. Simple and elegant the Lambda function runs in little under 38 lines of code.  I might visit this porject back in the future as its applications to other projects for file uploads is easily modifiable. 

My Lambda code is written in the index.js script while my website is packaged under the website folder.




Your solo developer and student [Oscar Li](https://github.com/liOscar58).
