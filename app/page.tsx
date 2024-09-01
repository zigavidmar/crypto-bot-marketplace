import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Footer from "@/components/footer"

export default async function Page() {
  return (
    <main>
      <Navbar />
      <Cover />
      <Benefits />
      <QA />
      <Footer />
    </main>
  )
}

function Cover() {
  return (
    <section className="container py-[80px]">
      <div className="text-center flex flex-col gap-8 items-center">
        <p className="text-primary font-bold text-md">JOIN <span className="text-emerald-400">5M+</span> CREATORS & BUSINESSES</p>
        <h1>1 long video, 10 viral clips.<br />create 10x faster</h1>
        <p className="text-secondary text-xl leading-8">
          OpusClip is a generative AI video tool that repurposes long videos into<br /> shorts in one click. Powered by OpenAI
        </p>
        <Link href="/welcome" className={cn(buttonVariants({ size: "lg" }), "w-fit")}>
          Get Started
        </Link>
        <img src="/giphy.webp" alt="Giphy" className="w-full max-w-[800px] mx-auto" />
        <p className="text-primary text-md leading-8">
          5M+ creators and businesses create viral shorts with OpusClip.
        </p>
        <SocialProof />
      </div>
    </section>
  )
}

function SocialProof() {
  return (
    <div className="flex items-center gap-10">
      <SocialProofItem name="Gemini" image="homepage/socials/gemini.svg" url="https://www.tjasha.si" />
      <SocialProofItem name="Samsung" image="homepage/socials/samsung.svg" url="https://www.tjasha.si" />
      <SocialProofItem name="Pepsi" image="homepage/socials/pepsi.svg" url="https://www.tjasha.si" />
      <SocialProofItem name="Trust Pilot" image="homepage/socials/trustpilot.svg" url="https://www.tjasha.si" />
      <SocialProofItem name="Red Bull" image="homepage/socials/red-bull.svg" url="https://www.tjasha.si" />
    </div>
  )
}

interface SocialProofItemProps {
  name: string;
  image: string;
  url: string;
}

function SocialProofItem({ name, image, url, ...props }: SocialProofItemProps & React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Link href={url} target="_blank">
      <img src={image} alt={name} className={cn("h-20 rounded-full", props.className)} />
    </Link>
  )
}

function Benefits() {
  return (
    <section className="bg-[#0f0f0f] py-[120px]">
      <div className="container">
        <h2 className="text-center">Create social-ready clips instantly</h2>
        <div className="pt-14 grid grid-cols-3 gap-6">
          <BenefitsCard
            title="AI Curation"
            description="Our AI identifies the most compelling hooks, extracts highlights from different parts of your video, and rearranges them into cohesive viral short videos."
          />
          <BenefitsCard
            title="Auto Reframe"
            description="Our AI adjusts clips for various aspect ratios, detecting speakers, moving objects for optimal viral presentation"
          />
          <BenefitsCard
            title="Animated Captions"
            description="Automatically add animated captions with 97%+ accuracy and various templates to choose from."
          />
        </div>
      </div>
    </section>
  )
}

interface BenefitsCardProps {
  title: string;
  description: string;
}

function BenefitsCard({ title, description }: BenefitsCardProps) {
  return (
    <div className="border bg-[#111213] py-7 px-5 flex flex-col justify-between gap-5 rounded-3xl">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-secondary text-lg">{description}</p>
      </div>
      <img src="/giphy.webp" alt="Giphy" className="w-full max-w-[800px] mx-auto rounded-md" />
    </div>
  )
}

const qaItems = [
  {
    title: "How does the Opus Clip work?",
    description: "Yes. It adheres to the WAI-ARIA design pattern."
  },
  {
    title: "Why do i need to make short clips?",
    description: "Yes. It adheres to the WAI-ARIA design pattern."
  },
  {
    title: "How do i get started?",
    description: "Yes. It adheres to the WAI-ARIA design pattern."
  },
  {
    title: "What types of videos can i upload?",
    description: "Yes. It adheres to the WAI-ARIA design pattern."
  },
  {
    title: "Which languages are supported?",
    description: "Yes. It adheres to the WAI-ARIA design pattern."
  },
  {
    title: "Can i add captions?",
    description: "Yes. It adheres to the WAI-ARIA design pattern."
  },
  {
    title: "Is Opus Clip free to use?",
    description: "Yes. It adheres to the WAI-ARIA design pattern."
  }
]

function QA() {
  return (
    <section className="py-[80px]">
      <div className="container">
        <div className="grid grid-cols-[1fr_2fr] gap-20">
          <div className="flex flex-col gap-7 items-start">
            <h2>Got questions?</h2>
            <Link href="mailto:" className={buttonVariants({ size: "lg" })}>
              Got more questions?
            </Link>
          </div>
          <div>
            <Accordion type="single" collapsible className="flex flex-col gap-5">
              {qaItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} className="border rounded-2xl p-6 py-2">
                  <AccordionTrigger className="text-2xl font-bold">{item.title}</AccordionTrigger>
                  <AccordionContent>{item.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}