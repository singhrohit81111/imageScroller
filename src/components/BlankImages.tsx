import loader from '../assets/loader.gif';


const BlankImages = () => <>
                    {Array(10).fill('DUMMY').map(() => <img src={loader} height={`167px`} width={`220px`} />)}
                </>
export default BlankImages;