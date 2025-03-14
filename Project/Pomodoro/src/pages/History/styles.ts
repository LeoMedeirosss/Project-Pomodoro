import styled from "styled-components"

export const HistoryContainer = styled.main`
    flex:1;
    padding-top:0.5rem;
    padding-bottom:0.5rem;
    padding-right:3rem;
    display:flex;
    flex-display:column;
    

    h1 {
        font-size:1.5rem;
        color: ${(props) => props.theme["gray-100"]};
    }
`

export const HistoryList = styled.div`
    flex:1;
    overflow: auto;
    margin-top: 2rem;

    table {
        border-collapse:collapse;
        width:100%;
        min-width: 600px;

        th {
            background-color: ${(props) => props.theme["gray-600"]};
            padding:1rem;
            text-aling:left;
            color: ${(props) => props.theme["gray-100"]};
            font-size: 0.875rem;
            line-height:1.6;

            &:first-child {
                border-top-left-radius:8px;
                padding-left:1.5rem;
            }
            
            &:last-child {
                border-top-right-radius:8px;
                padding-right:1.5rem;
            }
        }
                

        td {
            background-color: ${(props) => props.theme["gray-700"]};
            border-top: 3px solid ${(props) => props.theme["gray-800"]};
            border-left:none;
            border-right:none;
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                width:50%;
                padding-left:1.5rem;
            }
            
            &:last-child {
                padding-right:1.5rem;
            }
        }
    }
`

const STATUS_COLORS = {
    yellow: "yellow-500",
    green: "green-500",
    red: "red-500",
    gray: "gray-500"
} as const

interface StatusProps {
    $statusColor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
    display:flex;
    align-items: center;
    gap:0.5rem;

    &::before {
        content: "";
        width: 0.5rem;
        height:0.5rem;
        border-radius: 50%;
        background: ${(props) => {return props.theme[STATUS_COLORS[props.$statusColor]]}};
    }
`