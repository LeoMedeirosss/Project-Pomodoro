import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../..";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {

    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return(
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
    )
}