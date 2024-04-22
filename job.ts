export class Job {
  readonly nextRunAt: Date
  fn: Function
  readonly id: number
  process: 'waiting' | 'executed' | 'running' | 'canceled' = 'waiting'

  constructor(nextRunAt: Date, fn: Function) {
    this.nextRunAt = nextRunAt
    this.fn = fn
    this.id = Math.round(Math.random() * 1000)
  }

  async execute() {
    this.process = 'running'
    await this.fn()
    this.process = 'executed'
  }

  cancel() {
    this.process = 'canceled'
  }
}