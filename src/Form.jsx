// Form.js
import { useState } from 'react';


const Form = (props) => {

    // A STATE to hold the USER'S Selection
    const [userChoice, setUserChoice] = useState("")

    // A CONTROLLED INPUT FUNCTION to hear the change and store it in teh userChoice STATE

    const handleChange = function(event) {
        setUserChoice(event.target.value)
    }


    
    return (

        <>
        <form onSubmit={ (e) => { props.photoSubmit(e, userChoice)} } >
            <label htmlFor="photoOrientation">Select Orientation</label>
            <select name="photoOrientation" id="photoOrientation" onChange={handleChange} value={userChoice}>
                <option value="" disabled >Pick One:</option>
                <option value="square-ish">Square</option>
                <option value="portraitlike">Portrait</option>
                <option value="landscapey">Landscape</option>
            </select>
            <button type="submit">Submit!!</button>
        </form>
        
        </>
    
        
    );

}

export default Form;

