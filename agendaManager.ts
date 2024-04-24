import { Job } from "./job";

export class AgendaManager {
  scheduleJobs: Job[] = []
  clock = new Date()
  changedClock = false

  constructor() {
    this.scheduleJobs = []
  }

  create(time: Date, fn: Function) {
    const job = new Job(time, fn)

    this.scheduleJobs.push(job)

    this.scheduleJobs = this.scheduleJobs.sort((a, b) => a.nextRunAt.getTime() - b.nextRunAt.getTime())

    return job
  }

  private checkJobs() {
    const now = new Date()

    if (!this.changedClock) this.clock = now

    for (let job of this.scheduleJobs) {
      if (this.clock > job.nextRunAt && job.process === "waiting") {
        job.execute()
      }
    }
  }

  start() {
    setInterval(this.checkJobs.bind(this), 500)
  }

  /**
   * This should be used only in test
   * @param {number}  milliseconds
   */
  advanceTime(milliseconds: number){
    this.changedClock = true
    this.clock.setTime(this.clock.getTime() + milliseconds)
  }
}