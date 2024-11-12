export const ErrorMessage = ({message}: {message:string}): JSX.Element => {
    return (
        <>
        <p className="text-red-600"> 
            {message}
        </p>
        </>
    )

}