import { Oval } from "react-loader-spinner";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const CustomSpinner = (props) => {
    const { height, width } = props;
    return (
        <span>
            <Oval
                height={height}
                width={width}
                color="#000"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="grey"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </span>
    )
}

export default CustomSpinner;