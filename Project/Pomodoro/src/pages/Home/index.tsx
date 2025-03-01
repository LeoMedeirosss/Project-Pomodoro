import { Play } from "phosphor-react";

import { CountdownContainer, FormContainer, HomeConteiner, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
    return(
        <HomeConteiner>
            <form action="">
                <FormContainer>
                    <label htmlFor="taks">Vou trabalhar em</label>
                    <TaskInput 
                        id="taks" 
                        placeholder="Nome para o seu projeto"
                    />

                    <label htmlFor="">Durante</label>
                    <MinutesAmountInput 
                        placeholder="00" 
                        type="number" 
                        id="minutosAmount"
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

                <StartCountdownButton disabled type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeConteiner>
    )
}