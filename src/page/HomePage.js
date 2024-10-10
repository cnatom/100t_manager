import {HOST} from "../config";

function HomePage(){
    return (
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        <div style={{width: '100%', height: '100%'}} >
            <iframe style={{width: '100%', height: '100%',border:'0px'}} src={`http://${HOST}:3000/`}></iframe>
        </div>
    )
}

export default HomePage;