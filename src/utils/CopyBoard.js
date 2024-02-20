import ClipboardJS from "clipboard";

export class CopyBoard{

    constructor(element , fn) {
      this.clipboard = new ClipboardJS(element , {
          text : () => {
              return fn();
          }
      });
    }

    success = (fn) => {
        this.clipboard.on('success' ,(e)=>{
            console.log(e);
            fn();
        });
    }

    error = (fn) => {
        this.clipboard.on('error' ,(e)=>{
            console.log(e);
            fn();
        });
    }

}