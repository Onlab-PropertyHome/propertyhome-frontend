import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {

  constructor() { }

  public url: string = "";
  FOLDER = 'onlab-propertyhome/'; // For example, 'my_folder'.
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

  public async uploadFile(f: File, user_id: number, isAd: boolean) {
    let pipe = new DatePipe('en-US');
    const now = Date.now();
    const formattedDate = pipe.transform(now, 'yyyy-MM-dd-HH-mm-ss');

    let f_extension = f.name.split('.')[1];
    let f_name: string = "";
    if (isAd) {
      f_name = `${user_id}/ads/${formattedDate}.${f_extension}`;
    } else {
      f_name = `${user_id}/userpicture.${f_extension}`;
    }
    
    let blob = f.slice(0, f.size, f.type);
    let file = new File([blob], f_name, { type: f.type });

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

    let mUpload = await bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
      }
      console.log('Successfully uploaded file.', data);
    }).promise();

    return mUpload.Location;
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

