


export default function SelectInput({label ,items, ...props})
{
    return (
        <>

            <select
             {...props}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
            >
                <option value={''}>{label ? label :"Select none"}</option>
                {items?.map((item, index) => (
                    <option key={index} value={item.name}>{item.name}</option>
                ))}
            </select>

        </>
    );
}
