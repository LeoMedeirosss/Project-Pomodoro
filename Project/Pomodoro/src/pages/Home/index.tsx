import { Play } from "phosphor-react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

import { CountdownContainer, FormContainer, 
         HomeConteiner, MinutesAmountInput, 
         Separator, StartCountdownButton, 
         TaskInput 
} from "./styles";

const newCycleFormValidationScheme = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number().min(5).max(90, 
    "O ciclo precisa ser de no máximo 90 minutos"),
})

export function Home() {

    const { register, handleSubmit, watch } = useForm({
        resolver: zodResolver(newCycleFormValidationScheme),
    })

    function handleCreateNewCycle(data: unknown) {
        console.log(data)
    }

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
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={!task} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeConteiner>
    )
}