import Link from "next/link"
import Logo from "../icons/Logo"

export default function OnboardingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full justify-center flex py-6">
      <Link href="/">
        <Logo />
      </Link>
    </header>
  )
}