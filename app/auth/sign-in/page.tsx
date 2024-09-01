import SignInForm from './Form'

export default async function Page() {
  /* const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser() */

  return (
    <section className="container h-full">
      <div className="h-full flex flex-col justify-center mx-auto max-w-[350px] gap-7">
        <h1 className="text-2xl text-center">
          Sign In
        </h1>
        <SignInForm />
      </div>
    </section>
  )
}