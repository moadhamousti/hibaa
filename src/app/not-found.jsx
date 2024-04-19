import Image from "next/image"
import Logo from "../../public/logo.svg"
import PageLayout from "./(blog)/layout"
import Link from "next/link"

export default function Notfound(){
    return(
        <>
        <PageLayout>
        <div className="text-center h-screen flex flex-col items-center justify-center gap-10">
            <div>
                <Image alt="" src={Logo} height={220} width={220} />
            </div>
            <div className="text-center">
                <h2 className="text-[20px] mb-5 text-black">Il y avait un problème.</h2>
                <p className="text-[17px]">nous n&apos;avons pas trouvé la page que vous cherchiez.</p>
                <p className="text-[17px]">Retournez à la <Link className="text-[--darkishBlue] underline" href="/">page d&apos;accueil</Link> </p>
            </div>
        </div>


        </PageLayout>
        </>
    )
}