import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const VisionPage = () => {
    return (
        <div>
            <Accordion type="single">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl sm:text-3xl font-bold">Visi</AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-lg">
                        Menjadi sekolah yang unggul dalam membentuk generasi yang berkarakter, berprestasi, dan berwawasan lingkungan melalui pendidikan yang <span className="bg-green-200 underline"> inklusif</span> dan <span className="bg-green-200 underline">bermutu.</span>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl sm:text-3xl font-bold">Misi</AccordionTrigger>
                    <ol>
                        <li> <AccordionContent className="text-sm sm:text-lg">
                            <span className="font-bold bg-green-200 dark:bg-white dark:text-black px-1">Membangun Karakter Siswa:</span> Menanamkan nilai-nilai moral, etika, dan budaya bangsa dalam setiap aspek pembelajaran untuk membentuk siswa yang berkarakter kuat, jujur, disiplin, dan bertanggung jawab.
                        </AccordionContent>
                        </li>
                        <li> <AccordionContent className="text-sm sm:text-lg">
                            <span className="font-bold bg-green-200 dark:bg-white dark:text-black px-1"> Meningkatkan Prestasi Akademik:</span> Melaksanakan proses pembelajaran yang berkualitas, kreatif, dan inovatif untuk mendukung pencapaian prestasi akademik siswa sesuai dengan potensi dan kemampuannya.
                        </AccordionContent>
                        </li><li> <AccordionContent className="text-sm sm:text-lg">
                        <span className="font-bold bg-green-200 dark:bg-white dark:text-black px-1"> Pengembangan Potensi Non-Akademik: </span> Mendorong siswa untuk aktif dalam kegiatan ekstrakurikuler yang mendukung bakat dan minat mereka di bidang seni, olahraga, dan keterampilan lainnya.
                        </AccordionContent>
                        </li>
                        <li> <AccordionContent className="text-sm sm:text-lg">
                        <span className="font-bold bg-green-200 dark:bg-white dark:text-black px-1"> Mewujudkan Lingkungan Belajar yang Nyaman dan Aman:</span> Menyediakan lingkungan belajar yang kondusif, ramah anak, dan bebas dari bullying serta menjaga kebersihan dan kelestarian lingkungan sekolah.
                        </AccordionContent>
                        </li>
                        <li> <AccordionContent className="text-sm sm:text-lg">
                        <span className="font-bold bg-green-200 dark:bg-white dark:text-black px-1"> Mendorong Partisipasi Orang Tua dan Masyarakat:</span> Melibatkan peran aktif orang tua dan masyarakat dalam mendukung program pendidikan sekolah demi terciptanya sinergi yang positif dalam mendidik anak-anak.
                        </AccordionContent>
                        </li>
                        <li> <AccordionContent className="text-sm sm:text-lg">
                        <span className="font-bold bg-green-200 dark:bg-white dark:text-black px-1"> Mengembangkan Kesadaran Lingkungan: </span> Mengintegrasikan pendidikan lingkungan dalam kurikulum dan kegiatan sekolah untuk meningkatkan kepedulian siswa terhadap pelestarian alam dan lingkungan hidup.
                        </AccordionContent>
                        </li>
                    </ol>

                </AccordionItem>
            </Accordion>


        </div>
    )
}

export default VisionPage;