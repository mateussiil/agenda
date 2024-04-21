import { Job } from "./job";

export class AgendaManager {
  jobs: Job[] = []
  clock = new Date()

  constructor() {
    this.jobs = []
  }

  create(time: Date, fn: Function) {
    const job = new Job(time, fn)

    this.jobs.push(job)
  }

  private checkJobs() {
    const now = new Date()
    this.clock = now


    for (let job of this.jobs) {
      if (this.clock > job.nextRunAt && job.process !== "executed") {

        console.log(this.clock)
        console.log(job)

        job.execute()
      }
    }
  }

  start() {
    setInterval(this.checkJobs.bind(this), 500)
  }

  advanceTime(milliseconds: number){
    this.clock.setTime(this.clock.getTime() + milliseconds)
  }
}