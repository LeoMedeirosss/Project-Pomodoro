import { HandPalm, Play } from "phosphor-react";
import { createContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

import { HomeConteiner, 
         StartCountdownButton, 
         StopCountdownButton,
    } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date; //opcional
    finishedDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;

    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds : number) => void
}

type NewCycleFormData = zod.infer<typeof newCycleFormValidationScheme>


export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationScheme = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(90, "O ciclo precisa ser de no máximo 90 minutos"),
})

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationScheme),
        defaultValues: {
            task: "",
            minutesAmount: 5,
        },
    })

    const { handleSubmit, watch, reset } = newCycleForm
    

    function markCurrentCycleAsFinished() {
        setCycles(state => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return{...cycle, finishedDate: new Date}
                } else {
                    return cycle
                }
            }),
        )
    }

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

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function handleInterruptCycle() {

        setCycles(state =>
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return{...cycle, interruptedDate: new Date}
                } else {
                    return cycle
                }
            }),
        )
        setActiveCycleId(null)
    }

    const task = watch("task")

    return(
        <HomeConteiner>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">      

                <CyclesContext.Provider 
                    value={{
                        activeCycle, 
                        activeCycleId, 
                        markCurrentCycleAsFinished, 
                        amountSecondsPassed, 
                        setSecondsPassed
                    }}
                >
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    <Countdown/>
                </CyclesContext.Provider>

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
