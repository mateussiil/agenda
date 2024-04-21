export class Job {
  nextRunAt: Date
  fn: Function
  id: number
  process: 'waiting' | 'executed' | 'running' = 'waiting'

  constructor(nextRunAt: Date, fn: Function) {
    this.nextRunAt = nextRunAt
    this.fn = fn
    this.id = Math.round(Math.random() * 1000)
  }

  execute() {
    this.fn()
    this.process = 'executed'
  }
}