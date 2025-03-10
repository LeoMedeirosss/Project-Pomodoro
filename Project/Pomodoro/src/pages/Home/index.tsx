import { HandPalm, Play } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { differenceInSeconds } from "date-fns"
import * as zod from "zod"

import { CountdownContainer, FormContainer, 
         HomeConteiner, MinutesAmountInput, 
         Separator, StartCountdownButton, 
         StopCountdownButton,
         TaskInput 
} from "./styles";

const newCycleFormValidationScheme = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(90, "O ciclo precisa ser de no máximo 90 minutos"),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationScheme>

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date; //opcional
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationScheme),
        defaultValues: {
            task: "",
            minutesAmount: 5,
        },
    })

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    useEffect(() => {
        let interval: number

        if(activeCycle) {
            interval = setInterval(() => {
                setAmountSecondsPassed(
                    differenceInSeconds(new Date(), activeCycle.startDate)
                )
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }

    }, [activeCycle])

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),

        }

        setCycles( (state) => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        reset()
    }

    function handleInterruptCycle() {

        setCycles(cycles.map((cycle) => {
            if(cycle.id === activeCycleId) {
                return{...cycle, interruptedDate: new Date}
            } else {
                return cycle
            }
            }),
        )
        setActiveCycleId(null)
    }

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    //numero de minutos e de segundos exibidos em tela
    const minutesAmount = Math.floor(currentSeconds / 60)

    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, "0")

    const seconds = String(secondsAmount).padStart(2, "0")

    useEffect(() => {
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds,activeCycle])

    const task = watch("task")

    return(
        <HomeConteiner>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="taks">Vou trabalhar em</label>
                    <TaskInput 
                        id="taks" 
                        placeholder="Nome para o seu projeto"
                        list="task-suggestions"
                        disabled={!!activeCycle}
                        {...register("task")} //register return a lot of methods, like onChange and onBlur.
                    />

                    <datalist id="task-suggestions">
                        <option value="Project 1"/>
                        <option value="Project 2"/>
                        <option value="Project 3"/>
                        <option value="Project 4"/>
                        <option value="Timeout"/>
                    </datalist>

                    <label htmlFor="">Durante</label>
                    <MinutesAmountInput 
                        placeholder="00" 
                        type="number" 
                        id="minutosAmount"
                        step={5}
                        min={5}
                        max={90}
                        {...register("minutesAmount", { valueAsNumber:true })}
                    />

                    <span>Minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                    <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ): (
                    <StartCountdownButton disabled={!task} type="submit">
                    <Play size={24} />
                        Começar
                    </StartCountdownButton>
                ) }
            </form>
        </HomeConteiner>
    )
}
