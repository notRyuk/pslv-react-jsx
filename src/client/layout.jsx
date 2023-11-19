import { ReactNode } from "react"
import Header from "./components/header"
import Footer from "./components/footer"
import { useLocation } from "react-router-dom"

export default function Layout({ children, data }) {
    if(!data) {
        data = {
            hasFooter: true,
            hasHeader: true
        }
    }
    else {
        if(data.hasFooter === null || data.hasFooter === undefined) {
            data.hasFooter = true
        }
        if(data.hasHeader === null || data.hasHeader === undefined) {
            data.hasHeader = true
        }
    }
    return (
        <>
            {data.hasHeader && <Header />}
            <main>
                {children}
            </main>
            {/* {data.hasFooter && <Footer />} */}
        </>
    )
}