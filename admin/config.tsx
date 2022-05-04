import Image from "next/image"
import { CustomNavigation } from "./components/CustomNav"

// admin/config.tsx
function CustomLogo () {
    return ( 
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <h1 style={{fontSize: 'large'}}>Engagement Lab <br />Content Management</h1>
        </div>
    )
}

export const components = {
    Logo: CustomLogo,
    Navigation: CustomNavigation,
}