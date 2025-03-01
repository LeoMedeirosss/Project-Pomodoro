import { Play } from "phosphor-react";

import { CountdownContainer, FormContainer, HomeConteiner, Separator, StartCountdownButton } from "./styles";

export function Home() {
    return(
        <HomeConteiner>
            <form action="">
                <FormContainer>
                    <label htmlFor="taks">Vou trabalhar em</label>
                    <input id="taks" />

                    <label htmlFor="">Durante</label>
                    <input type="number" id="minutosAmount"/>

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