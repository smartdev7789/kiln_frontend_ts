import { ResourcesData } from "../../api/DataTypes";

interface ResorucesRequiresProps {
    requires: {
        icons: number
        screenshot: number
        video: number
    }
    resources: ResourcesData[]
}

export const ResorucesRequires = ( {requires, resources}:ResorucesRequiresProps ) => {
    return(
        <>
            {/* Requires */}
        </>
    )
}