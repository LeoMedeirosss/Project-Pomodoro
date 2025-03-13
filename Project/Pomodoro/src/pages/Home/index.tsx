/* eslint-disable react-refresh/only-export-components */
import { HandPalm, Play } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { differenceInSeconds } from "date-fns"
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
    markCurrentCycleAsFinished: () => void;

}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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
                    value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}
                >
                    <NewCycleForm/>
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
