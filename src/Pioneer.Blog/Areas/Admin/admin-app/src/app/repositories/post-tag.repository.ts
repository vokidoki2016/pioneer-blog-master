﻿import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Tag } from '../models/tag';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostTagRepository {
  private url = '/api/post-tags';

  constructor(private http: Http) { }

  add(tagId: number, postId: number): Promise<Tag> {
    return this.http.post(this.url, { tagId: tagId, postId: postId })
      .toPromise()
      .then((res: Response) => {
        return res.json() as Tag;
      })
      .catch(this.handleError);
  }

  removeByCompound(tagId: number, postId: number): Promise<Response> {
    return this.http.post(this.url + '/remove/compound', { tagId: tagId, postId: postId })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
