export const ErrorMessage = ({message}: {message:string}): JSX.Element => {
    return (
        <>
        <p className="text-purple-300"> 
            {message}
        </p>
        </>
    )

}