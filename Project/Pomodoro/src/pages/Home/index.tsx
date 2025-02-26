export function Home() {
    return(
        <div>
            <form action="">
                <label htmlFor="taks">Vou trabalhar em</label>
                <input id="taks" />

                <label htmlFor="">Durante</label>
                <input type="number" id="minutosAmount"/>

                <span>Minutos.</span>
            </form>
            <div>
                <span>0</span>
                <span>0</span>
                <span>:</span>
            </div>
        </div>
    )
}