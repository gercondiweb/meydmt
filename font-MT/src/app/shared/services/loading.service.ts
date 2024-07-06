import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  size = signal<string>('80px');
  isShow = signal<boolean>(false);


  show( size? : string ){
     if(size) this.size.update( valueOld =>  size );
     this.isShow.update( valueOld => true);
  }

  hidden(){
    this.isShow.update( valueOld => false);
  }

}
