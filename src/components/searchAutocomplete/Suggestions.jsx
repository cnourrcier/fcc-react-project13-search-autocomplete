
const Suggestions = ({ data, handleClick }) => {
    return (
        <ul>
            {
                data?.length
                    ? data.map((item, index) => <li onClick={handleClick} key={index}>{item}</li>)
                    : null
            }
        </ul>
    )
}

export default Suggestions;