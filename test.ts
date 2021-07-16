class RequestManager {
  private runningTasks: number = 0;
  private tasks = [];
  private results = [];
  constructor(private limit: number) {}

  private createTask(caller, arg, resolve, reject) {
    return () => {
      this.runningTasks++;
      caller(...arg)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.runningTasks--;
          if (this.tasks.length) {
            let task = this.tasks.shift();
            task();
          }
        });
    };
  }

  public addRequest(req: () => Promise<unknown>): void {
    new Promise((resolve, reject) => {
      let task = this.createTask(req, arg, resolve, reject);
      if (this.runningTasks >= this.limit) {
        this.tasks.push(task);
      } else {
        task();
      }

      // function sendRequest(){
      //     while(this.runningTasks < this.limit){
      //         this.runningTasks++;

      //         req.then(result=>{
      //             this.results.push(result);
      //         }).finally(()=>{
      //             this.runningTasks--;
      //             sendRequest();
      //         })
      //         if(this.results.length === ){
      //             resolve(this.results);
      //         }
      //     }
      // }
    });
  }
}

const req = new RequestManager(3);

const task1 = () => Promise.resolve(1);
const task2 = () => Promise.resolve(1);
const task3 = () => Promise.resolve(1);

req.addRequest(task1);
