import React from "react";


export default function ToDoList({list}){

    const clickButton = (number) => {
        console.log(`button clicked, and number ${number}`)
    }
    return(
        <>
            <p>The List will be here</p>
            <ol>
            {
                list.map((ele, i) => {

                    return(
                        <li key= {i + 1}>
                            <p>{ele}</p>
                            <button onClick={() => {return clickButton(i + 1)}}>Edit</button>
                        </li>
                    )
                })
            }
            </ol>

        </>
    )
}