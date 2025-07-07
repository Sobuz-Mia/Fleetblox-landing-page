import Navbar from "@/components/ui/shared/Navbar"
import { PrivecyPolicyDynamic } from "../lazy"
import Footer from "@/components/ui/shared/Footer"


function page() {
    return (
        <>
        <Navbar/>
        <PrivecyPolicyDynamic />
        <Footer/>
        </>
    )
}

export default page