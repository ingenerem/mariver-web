import Link from "next/link";

export default function MariverLogo(){

    return(

        <div className="flex items-end gap-1">
                <Link href="/" className="flex w-fit items-center gap-2">
                        <div className="h-4 w-2 rounded-full bg-blue-500" />
                        <div className="h-6 w-2 rounded-full bg-blue-500" />
                        <div className="h-8 w-2 rounded-full bg-blue-600" />

                        <h1 className="text-3xl font-semibold tracking-tight text-blue-700">
                            Mariver
                        </h1>
                    </Link>

            </div>
    )
}