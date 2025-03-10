import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";


const newCycleFormValidationScheme = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(90, "O ciclo precisa ser de no máximo 90 minutos"),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationScheme>

export function NewCycleForm() {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationScheme),
        defaultValues: {
            task: "",
            minutesAmount: 5,
        },
    })

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