// Importar a classe Agenda
import { Agenda } from '../index';
import { delay } from '../utils/functions';

describe('', () => {
  it('Verificar execução de tarefa agendada', async () => {
    const agenda = new Agenda();

    const test = jest.fn();

    agenda.start();

    agenda.create(new Date(), () => {
      test('Tarefa agendada executada!')
    });

    await delay(500)

    expect(test).toHaveBeenCalledWith('Tarefa agendada executada!');
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

    const test = jest.fn();

    const oneDay = 1000 * 60 * 60 * 24;

    agenda.create(new Date(new Date().getTime() + oneDay), () => {
      test('Tarefa agendada executada!');
    });

    agenda.advanceTime(oneDay + 1000);

    await delay(500)
    
    expect(test).toHaveBeenCalledWith('Tarefa agendada executada!');
  });

  it('Verificar cancel', async () => {
    const agenda = new Agenda();

    agenda.start();

    const test = jest.fn();

    const job = agenda.create(new Date(), () => {
      test('Tarefa agendada executada!');
    });

    job.cancel()

    await delay(500)

    expect(test).not.toHaveBeenCalledWith('Tarefa agendada executada!');
  })

  it('Verificar running', async () => {
    const agenda = new Agenda();

    agenda.start();

    const test = jest.fn();

    const job = agenda.create(new Date(), async () => {
      test('Tarefa executando!');

      await delay(1500)
    });

    await delay(500)

    expect(job.process).toBe('running')
    expect(test).toHaveBeenCalledWith('Tarefa executando!');
  })
});
