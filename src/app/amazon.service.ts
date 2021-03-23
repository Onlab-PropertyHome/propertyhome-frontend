import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {

  constructor() { }

  
  FOLDER = 'ad-pics/'; // For example, 'my_folder'.
  BUCKET = 'onlab-propertyhome-pictureservice'; // For example, 'my_bucket'.

  private getS3Bucket(): any {
    return new S3(
      {
        accessKeyId: 'AKIA5Z4TMCK7WBUNHM5T', // For example, 'AKIXXXXXXXXXXXGKUY'.
        secretAccessKey: 'koUuwqt3UyOLLjbO/fw3GdDED+/n1BgPZq50qaLa', // For example, 'm+XXXXXXXXXXXXXXXXXXXXXXDDIajovY+R0AGR'.
        region: 'eu-central-1' // For example, 'us-east-1'.
      }
    );
  }

  public uploadFile(file) : string {
    let url = "";
    const bucket = new S3(
      {
        accessKeyId: 'AKIA5Z4TMCK7WBUNHM5T',
        secretAccessKey: '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',
        region: 'eu-central-1'
      }
    );

    const params = {
      Bucket: this.BUCKET,
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read'
    };

    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        
        return false;
      }
      console.log('Successfully uploaded file.', data.Location);
      url = data.Location;
      return true;
    });
    return url;
  }

  public getFiles(): Observable<Array<FileUpload>> {
    const fileUploads = [];

    const params = {
      Bucket: this.BUCKET,
      Prefix: this.FOLDER
    };

    this.getS3Bucket().listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }
      console.log('Successfully get files.', data);

      const fileDetails = data.Contents;

      fileDetails.forEach((file) => {
        fileUploads.push(new FileUpload(
          file.Key,
          'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key
        ));
      });
    });

    return of(fileUploads);
  }

  public deleteFile(file: FileUpload) {
    const params = {
      Bucket: this.BUCKET,
      Key: file.name
    };

    this.getS3Bucket().deleteObject(params,  (err, data) => {
      if (err) {
        console.log('There was an error deleting your file: ', err.message);
        return;
      }
      console.log('Successfully deleted file.');
    });
  }

  
}

class FileUpload {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
  result: any[];
}

