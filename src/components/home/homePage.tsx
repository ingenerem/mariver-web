import Features from "@/components/marketing/Features";
import Footer from "@/components/home/footer";
import HeroPage from "@/components/home/heroPage";
import NavBAr from "@/components/layout/navBar";


export default function HomePage() {

    return (
        <>
            <NavBAr />
            <HeroPage />
            <div className="mx-auto max-w-7xl">
                <Features layout="horizontal" variant="card" />
            </div>
            <Footer />
        </>

    )

}
