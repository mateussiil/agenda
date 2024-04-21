// Importar a classe Agenda
import { Agenda } from '../index';

global.console.log = jest.fn();

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('', () => {
  it('Verificar execução de tarefa agendada', async () => {
    // Criar uma nova agenda
    const agenda = new Agenda();

    agenda.start();

    agenda.create(new Date(), () => {
      console.log('Tarefa agendada executada!');
    });

    await delay(500)

    expect(console.log).toHaveBeenCalledWith('Tarefa agendada executada!');
  });

  it('Verificar adição de tarefa', () => {
    const agenda = new Agenda();

    // Adicionar uma tarefa
    agenda.create(new Date(), () => { });

    expect(agenda.jobs.length).toBe(1);
  });

  it('Verificar avanço do tempo', () => {
    const agenda = new Agenda();

    const tempoInicial = agenda.clock.getTime();
    agenda.advanceTime(1000 * 60 * 60 * 24);

    const tempoFinal = agenda.clock.getTime();
    expect(tempoFinal - tempoInicial).toBe(1000 * 60 * 60 * 24);
  });

  it('Verificar avanço do tempo e execução de tarefa', async () => {
    const agenda = new Agenda();

    agenda.start();

    agenda.create(new Date(), () => {
      console.log('Tarefa agendada executada 2!');
    });

    const oneDay = 1000 * 60 * 60 * 24;

    agenda.advanceTime(oneDay);

    await delay(500)
    
    expect(console.log).toHaveBeenCalledWith('Tarefa agendada executada 2!');
  });
});
