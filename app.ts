import { Agenda } from ".";

const agenda = new Agenda()

agenda.start()

console.log('start')

agenda.create(new Date(new Date().getTime() + 30 * 1000), () => {
  console.log('hi 1')
})
agenda.create(new Date(new Date().getTime() + 60 * 1000), () => {
  console.log('hi 2')
})
agenda.create(new Date(new Date().getTime() + 2 * 60 * 1000), () => {
  console.log('hi 3')
 })