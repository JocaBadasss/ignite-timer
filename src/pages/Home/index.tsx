import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';
import { useContext } from 'react';
import { NewCycleForm } from './components/NewCycleForm';
import { CountDown } from './components/CountDown';
import { CyclesContext } from '../../contexts/CyclesContext';

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Insira o nome da tarefa'),
  minutesAmount: zod.number().min(1).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>;

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset();
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form
        onSubmit={handleSubmit(handleCreateNewCycle)}
        action=''
      >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton
            onClick={() => interruptCurrentCycle()}
            type='button'
          >
            <HandPalm size={24} /> Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton
            disabled={isSubmitDisabled}
            type='submit'
          >
            <Play size={24} /> Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
