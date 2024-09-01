import { Input } from '@/components/ui/input'
import { PLATFORM_NAME } from '@/constants/common'

export default async function Page() {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-20 h-full items-center">
        <Form />
        <div className="flex flex-col gap-3 max-w-[400px]">
          <h1 className="text-lg font-extrabold leading-tight tracking-tighter md:text-2xl">
            Welcome to {PLATFORM_NAME}.
          </h1>
          <p className="max-w-[700px] text-md text-secondary">
            {PLATFORM_NAME} is a radically new type of CRM. Built on an entirely new type of data architecture, you’ll have profiles and records of every interaction within your network in minutes, always updated in real-time.
            <br /><br />
            You’ll be able to customize and create your CRM exactly as you want it.
            <br /><br />
            Let’s begin.
          </p>
        </div>
      </div>
    </Container>
  )
}

interface ContainerProps {
  children: React.ReactNode
}

function Container({ children }: ContainerProps) {
  return (
    <section className="container h-full">
      <div className="border border-border rounded-xl h-full p-10 max-w-[1200px] mx-auto">
        {children}
      </div>
    </section>
  )
}

function Form() {
  return (
    <div>
      <Input type="text" placeholder="First name" />
    </div>
  )
}